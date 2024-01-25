var admin = require('../model/adminmodel');
var user = require('../model/usermodel');
var task = require('../model/taskmodel');

exports.adminget = (req, res) => {
    res.render('admin');
}

exports.adminpost = async (req, res) => {
    var chk_data = await admin.find({ "email": req.body.email });

    if (chk_data != 0) {
        if (chk_data[0].password == req.body.password) {
            res.redirect('/admin/admin_dashboard')
        }
        else {
            res.redirect('/admin');
        }
    }
    else {
        res.redirect('/admin');
    }
}

exports.admindash = async (req, res) => {
    try {
        re1 = await user.find().count();
        re = await user.find();
        res.render('admin_dashboard', { re, re1 });
    } catch (error) {
        console.log(error);
    }

}

exports.add_userget = async (req, res) => {
    try {
        res.render('add_user');
    } catch (error) {
        console.log(error);
    }
}

exports.add_userpost = async (req, res) => {
    try {
        var data = await user.create(req.body);
        res.redirect('/admin/admin_dashboard');
    } catch (error) {
        console.log(error);
    }
}

// exports.updateuser = async(req,res) => {
//     try {
//         id = req.params.id;
//         var re = await user.find({id:"id"});
//         res.render('updateuser', {re} );
//         // res.render('updateuser');
//     } catch (error) {
//         console.log(error);
//     }
// }


exports.updateuser = async (req, res) => {
    try {
        var id = req.params.id
        var re = await user.find({ _id: id });
        res.render('updateuser', { results: re });
    } catch (error) {
        console.log(error);
    }
}

exports.updateuser_post = async (req, res) => {
    try {
        var id = req.params.id;

        var data = await user.findByIdAndUpdate(id, req.body);
        res.redirect('/admin/admin_dashboard');
        // if(data != 0)
        // {
        //     res.redirect('admin/admin_dashboard');
        // }
        // else{
        //     res.send("not update")
        // }

    } catch (error) {
        console.log(error);
    }
}


exports.deletuser = async (req, res) => {
    try {
        var id = req.params.id;

        await user.findByIdAndDelete(id);
        res.redirect('/admin/admin_dashboard');
        // res.redirect('admin/admin_dashboard');
    } catch (error) {
        console.log(error);
    }
}

exports.addtask = async (req, res) => {
    try {
        var re = await user.find();
        res.render('task', { results: re });
    } catch (error) {
        console.log(error);
    }
}

exports.addtask_post = async (req, res) => {
    try {
        var id = req.body.u_id;
        var task_name = req.body.task_name;

        await task.create({ u_id: id, status: "0", task_name: task_name });
        res.redirect('/admin/admin_dashboard');
    } catch (error) {
        console.log(error);
    }
}


exports.task_url = async (req, res) => {
    try {
        var id = req.params.id
        var re = await user.find({ _id: id });
        res.render('task', { results: re });
    } catch (error) {
        console.log(error);
    }
}


exports.task_url_post = async (req, res) => {
    try {
        var id = req.body.u_id;
        var task_name = req.body.task_name;

        await task.create({ u_id: id, status: "0", task_name: task_name });

        res.redirect('/admin/admin_dashboard');
    } catch (error) {
        console.log(error);
    }
}

exports.viewtask = async (req, res) => {
    try {
        // var pending = await task.find({ status: "0" }).count();
        // var running = await task.find({ status: "1" }).count();
        // var complete = await task.find({ status: "2" }).count();
        // var decline = await task.find({ status: "3" }).count();
        
        // console.log(running)
        // console.log(complete)
        // console.log(decline)
        // console.log(pending)
        const pending = await task.countDocuments({ status: "0" });
        const running = await task.countDocuments({ status: "1" });
        const complete = await task.countDocuments({ status: "2" });
        const decline = await task.countDocuments({ status: "3" });
       
        // console.log(running)
        // console.log(complete)
        // console.log(decline)
        // console.log(pending)
        res.render('view_task', { running, complete, decline, pending });
        // res.render('view_task',{pendding});
    } catch (error) {
        console.log(error);
    }
}


exports.pending = async (req, res) => {
    try {
        var data = await task.find({ status: "0" }).populate("u_id");
        
        console.log(data[0].u_id.name)
        res.render('pending', { results: data })
    } catch (error) {
        console.log(error);
    }
}

exports.running = async (req, res) => {
    try {
        var data = await task.find({ status: "1" });
        res.render('running', { results: data })
    } catch (error) {
        console.log(error);
    }
}

exports.complete = async (req, res) => {
    try {
        var data = await task.find({ status: "2" });
        res.render('complete', { results: data })
    } catch (error) {
        console.log(error);
    }
}


exports.decline = async (req, res) => {
    try {
        var data = await task.find({ status: "3" });
        res.render('decline', { results: data })
    } catch (error) {
        console.log(error);
    }
}