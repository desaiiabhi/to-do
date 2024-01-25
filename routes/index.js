var express = require('express');
var router = express.Router();
var admin = require('../contoller/admincontroller')
var user = require('../contoller/usercontroller')


router.get('/',user.login);
router.post('/',user.loginpost);
router.get('/user_dashboard',user.user_dashboard);
router.get('/running/:id',user.user_running);
router.get('/complete/:id',user.user_complete);
router.get('/decline/:id',user.user_decline);

router.get('/admin',admin.adminget);
router.post('/admin',admin.adminpost);
router.get('/admin/admin_dashboard',admin.admindash);
router.get('/admin/add_user',admin.add_userget);
router.post('/admin/add_user',admin.add_userpost);
router.get('/admin/updateuser/:id',admin.updateuser);
router.post('/admin/updateuser/:id',admin.updateuser_post);
router.get('/admin/delete/:id',admin.deletuser);
router.get('/admin/task',admin.addtask);
router.post('/admin/task',admin.addtask_post);
router.get('/admin/task/:id',admin.task_url);
router.post('/admin/task/:id',admin.task_url_post);
router.get('/admin/view_task',admin.viewtask);
router.get('/admin/running',admin.running);
router.get('/admin/complete',admin.complete);
router.get('/admin/decline',admin.decline);
router.get('/admin/pending',admin.pending);




module.exports = router;
