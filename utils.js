function checkTaskExists(req, res, next) {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        return res.status(404).send({ error: "Task not found" });
    }

    req.taskIndex = index;
    req.task = tasks[index];
    next();
}

function validateTaskInput(req, res, next) {
    const { title, description, completed, priority } = req.body;

    if (
        // check priority low, medium, high
        typeof title !== "string" ||
        title.trim() === "" ||
        typeof description !== "string" ||
        description.trim() === "" ||
        typeof completed !== "boolean" ||
        (priority !== "low" && priority !== "medium" && priority !== "high")
    ) {
        return res.status(400).send({
            error: "Invalid task input. 'title', 'priority' and 'description' must be non-empty strings, and 'completed' must be a boolean.",
        });
    }

    next();
}

module.exports = {
    checkTaskExists,
    validateTaskInput,
};
