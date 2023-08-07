module.exports = function (sequelize, Sequelize) {
  var users = sequelize.define("users", {
    landlord_id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
  });
  return users;
};
