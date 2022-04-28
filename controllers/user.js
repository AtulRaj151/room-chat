const makeValidation = require('@withvoid/make-validation');
const  User = require('../model/User');

module.exports = {
    onUserlogin: async (req, res, next) => {
        return res
        .status(200)
        .json({
          success: true,
          authorization: req.authToken,
        });
    },
    onGetAllUsers: async (req, res) => {
        try {
          const users = await User.UserModel.getUsers();
          return res.status(200).json({ success: true, users });
        } catch (error) {
          return res.status(500).json({ success: false, error: error })
        }
      },
      onGetUserById: async (req, res) => {
        try {
          const user = await User.UserModel.getUserById(req.params.id);
          return res.status(200).json({ success: true, user });
        } catch (error) {
          return res.status(500).json({ success: false, error: error })
        }
      },
      onCreateUser: async (req, res) => {
        try {
          const validation = makeValidation(types => ({
            payload: req.body,
            checks: {
              firstName: { type: types.string },
              lastName: { type: types.string },
              college:  { type: types.string },
              type: { type: types.enum, options: { enum: User.USER_TYPES } },
            }
          }));
          if (!validation.success) return res.status(400).json({ ...validation });
    
          const { firstName, lastName, college, mobile, type, username, password } = req.body;
        //   check if username exists or not
          const oldUser = await User.UserModel.findOne({username});
          console.log(oldUser)
          if(oldUser) {
            return res.status(409).send({
                success: false,
                message: "username already exits"
            })
          }
          const user = await User.UserModel.createUser(firstName, lastName, college, mobile, type, username, password);
          return res.status(200).json({ success: true, user, message: "user created successfully!" });
        } catch (error) {
          return res.status(500).json({ success: false, error: error })
        }
      },
      onDeleteUserById: async (req, res) => {
        try {
          const user = await User.UserModel.deleteByUserById(req.params.id);
          return res.status(200).json({ 
            success: true, 
            message: `Deleted a count of ${user.deletedCount} user.` 
          });
        } catch (error) {
          return res.status(500).json({ success: false, error: error })
        }
      },
}