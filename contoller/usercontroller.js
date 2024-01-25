var user = require('../model/usermodel');
var task = require('../model/taskmodel');
const storage = require('node-persist');


exports.login = async (req, res) => {
    res.render('login');
}


exports.loginpost = async (req, res) => {
    var chk_data = await user.find({ "email": req.body.email });

    if (chk_data != 0) {
        if (chk_data[0].password == req.body.password) {
            await storage.init( /* options ... */);
            var d = await storage.setItem('_id', chk_data[0]._id);

            res.redirect('/user_dashboard')
        }
        else {
            res.redirect('/');
        }
    }
    else {
        res.redirect('/');
    }
}

exports.user_dashboard = async (req, res) => {
    try {
        await storage.init( /* options ... */);
        var id = await storage.getItem('_id')

        var data = await task.find({ u_id: id, status: "0" });
        res.render('user_dashboard', { results: data })
    } catch (error) {
        console.log(error);
    }
}

exports.user_running = async(req,res) =>{
    try {
        var id = req.params.id;

        const updatedTask = await task.findByIdAndUpdate(id, { status: "1" });

        // res.redirect('/user_dashboard');
        if(updatedTask != 0)
        {
            res.redirect('/user_dashboard');
        }
        else
        {
            res.send("task not running")
        }
    } catch (error) {
        console.log(error)
    }
}
exports.user_complete = async(req,res) =>{
    try {
        var id = req.params.id;

        const updatedTask = await task.findByIdAndUpdate(id, { status: "2" });

        // res.redirect('/user_dashboard');
        if(updatedTask != 0)
        {
            res.redirect('/user_dashboard');
        }
        else
        {
            res.send("task not completed")
        }
    } catch (error) {
        console.log(error)
    }
}
exports.user_decline = async(req,res) =>{
    try {
        var id = req.params.id;

        const updatedTask = await task.findByIdAndUpdate(id, { status: "3" });

        // res.redirect('/user_dashboard');
        if(updatedTask != 0)
        {
            res.redirect('/user_dashboard');
        }
        else
        {
            res.send("task not decline")
        }
    } catch (error) {
        console.log(error)
    }
}