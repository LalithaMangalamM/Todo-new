const Todo = require('../models/Todo');

// get all task from specific todo  
exports.getTasksController = async (req, res) => {
    try {
        const { todoId } = req.params;
        console.log("API called:", todoId);

        const todo = await Todo.findById(todoId);

        if (!todo) {
            throw new Error("No such todo exists");
        }

        const tasks = todo.tasks;

        res.status(200).json({
            success: true,
            message: "Tasks successfully retrieved",
            tasks
        });
    } catch (err) {
        console.error("Error in getTasksController:", err);
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

// create tasks 
exports.addTaskController = async (req, res) => {
    try {
        const { todoId } = req.params;
        console.log("Inside function");

        // Find the todo by ID
        const checkTodoExists = await Todo.findById(todoId);

        // Check if the todo exists
        if (!checkTodoExists) {
            throw new Error("No such todo exists");
        }

        // Inserting task
        checkTodoExists.tasks.push({ main: req.body.main, taskupdatedAt: new Date() });

        // Save the updated todo
        await checkTodoExists.save();

        // Respond with the updated todo
        res.status(200).json({
            success: true,
            message: "Task successfully added",
            todo: checkTodoExists
        });
    } catch (err) {
        // Handle errors during the process
        console.error("Error in addTaskController:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


// check and uncheck task for showing complete or not 
exports.checkUnCheckTaskController = async (req, res)=>{
    try{
        
        const {todoId, taskId} = req.params;
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
         throw new Error("no such todo exists");
         
        const todo = await Todo.findById(todoId);
        const checkTaskExist = todo.tasks.filter(e=>e._id==taskId);
        // console.log(checkTaskExist)

        if(checkTaskExist.length==0)
         throw new Error("no such task exists");

        // creating new task with checked or unchecked targeted task 
        const updatedTasks = todo.tasks.map(e=>{
            if(e._id==taskId){
                if(e.checked){
                    e.checked = false;
                }
                else{
                    e.checked = true;
                }
                return e;
            }
            
            else
                return e;
            
        })

        // then updating todo with new tasks 
        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);


        res.status(200).json({
            success: true,
            message: "tasks successfully checked/unchecked",
            todo
        })

    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

// editing task 
exports.editTaskController = async (req, res)=>{
    try{

        const {todoId, taskId} = req.params;
        console.log(req.user)
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
         throw new Error("no such todo exists");
         
        const todo = await Todo.findById(todoId);
        const checkTaskExist = todo.tasks.filter(e=>e._id==taskId);
        // console.log(checkTaskExist)

        if(checkTaskExist.length==0)
         throw new Error("no such task exists");



        // creating new task with new targeted task 
        const updatedTasks = todo.tasks.map(e=>{
            if(e._id==taskId){
                e.main = req.body.main;
                e.taskupdatedAt = new Date()
                return e;
            }
            
            else
                return e;
            
        })

        // then updating todo with new tasks 
        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);


        res.status(200).json({
            success: true,
            message: "tasks successfully checked/unchecked",
            todo
        })
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }

}



exports.deleteTaskController = async (req, res)=>{
    try{
        const {todoId, taskId} = req.params;
        const checkTodoExists = await Todo.findById(todoId);
        if(!checkTodoExists)
         throw new Error("no such todo exists");
         
        const todo = await Todo.findById(todoId);
        const checkTaskExist = todo.tasks.filter(e=>e._id==taskId);
        // console.log(checkTaskExist)

        if(checkTaskExist.length==0)
         throw new Error("no such task exists");

        // creating new task with deleting targeted task 
        const updatedTasks = todo.tasks.filter(e=>e._id!=taskId)

        // then updating todo with new tasks 
        todo.tasks = updatedTasks;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo);


        res.status(200).json({
            success: true,
            message: "tasks successfully deleted",
            todo
        })
    }
    catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}