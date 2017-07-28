import User from '../models/userModel';

exports.list_all_users = function(req, res) {
  User.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.createToken = function(req, res) {
  console.log('req', req);
  res.json({ok:1});
}

exports.create_user = function(req, res) {
  var new_task = new User(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_user = function(req, res) {
  User.findById(req.params.userId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_user = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

exports.delete_all_users = function(req, res) {
  User.remove({}, function(err, task) {
    if (err)
      res.send(err);
    res.json({message: 'All users successfully deleted'});
  });
}
