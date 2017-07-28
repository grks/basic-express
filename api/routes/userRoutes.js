module.exports = function(app) {
  var userController = require('../controllers/userController');

  app.route('/user')
     .get(userController.list_all_users)
     .post(userController.create_user)
     .delete(userController.delete_all_users);

  app.route('/token')
     .post(userController.createToken);

  app.route('/user/:userId')
    .get(userController.read_user)
    .put(userController.update_user)
    .delete(userController.delete_user);
};
