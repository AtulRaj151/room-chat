const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



 const USER_TYPES = {
    ADMIN: "admin",
    TRAINER: "trainer",
    CONSUMER: 'consumer'
};


const userSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
      },
      firstName: String,
      lastName: String,
      type: String,
    },
    {
      timestamps: true,
      collection: "users",
    }
  );
/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */
 userSchema.statics.createUser = async function (firstName, lastName, type) {
    try {
      const user = await this.create({ firstName, lastName, type });
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {String} id, user id
   * @return {Object} User profile object
   */
  userSchema.statics.getUserById = async function (id) {
    try {
      const user = await this.findOne({ _id: id });
      if (!user) throw ({ error: 'No user with this id found' });
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @return {Array} List of all users
   */
  userSchema.statics.getUsers = async function () {
    try {
      const users = await this.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {Array} ids, string of user ids
   * @return {Array of Objects} users list
   */
  userSchema.statics.getUserByIds = async function (ids) {
    try {
        console.log("this is called")
      const users = await this.find({ _id: { $in: ids } });
      console.log("hjhj",users)
      return users;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * @param {String} id - id of user
   * @return {Object} - details of action performed
   */
  userSchema.statics.deleteByUserById = async function (id) {
    try {
      const result = await this.remove({ _id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }

  const UserModel = mongoose.model('User',userSchema);
  module.exports = {UserModel, USER_TYPES}