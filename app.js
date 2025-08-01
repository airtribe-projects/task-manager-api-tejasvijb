const express = require("express");
const app = express();
const { tasks } = require("./task.json");
const { checkTaskExists, validateTaskInput } = require("./utils");
module.exports = app;

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/tasks/:id")
    .get(checkTaskExists, (req, res) => {
        res.send(req.task);
    })
    .put(checkTaskExists, validateTaskInput, (req, res) => {
        const { title, description, completed, priority } = req.body;
        const updatedTask = {
            ...req.task,
            title,
            description,
            completed,
            priority,
        };

        tasks[req.taskIndex] = updatedTask;
        res.send(updatedTask);
    })
    .delete(checkTaskExists, (req, res) => {
        tasks.splice(req.taskIndex, 1);
        res.status(200).send();
    });

app.route("/tasks")
    .get((req, res) => {
        const { completed, sort } = req.query;

        let filteredTasks = tasks;

        // Filter by completion status if query param exists
        if (completed !== undefined) {
            const isCompleted = completed === "true"; // query params are strings
            filteredTasks = filteredTasks.filter(
                (task) => task.completed === isCompleted
            );
        }

        // Sort by createdDate if sort param is given (e.g., sort=asc or sort=desc)
        if (sort === "asc") {
            filteredTasks.sort(
                (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
            );
        } else if (sort === "desc") {
            filteredTasks.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
        }

        res.send(filteredTasks);
    })
    .post(validateTaskInput, (req, res) => {
        const { title, description, completed, priority } = req.body;
        const createdDate = new Date().toISOString();

        const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        const taskWithId = {
            id,
            title,
            description,
            completed,
            priority,
            createdDate,
        };
        tasks.push(taskWithId);
        res.status(201).send(taskWithId);
    });

app.get("/tasks/priority/:level", (req, res) => {
    const { level } = req.params;
    if (!["low", "medium", "high"].includes(level)) {
        return res.status(400).send({ error: "Invalid priority level" });
    }
    const filteredTasks = tasks.filter((task) => task.priority === level);
    res.send(filteredTasks);
});

if (require.main === module) {
    app.listen(port, (err) => {
        if (err) {
            return console.error("Something bad happened", err);
        }
        console.log(`Server is listening on ${port}`);
    });
}
