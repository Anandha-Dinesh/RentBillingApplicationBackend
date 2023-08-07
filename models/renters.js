module.exports = function (sequelize, Sequelize) {
  var renters = sequelize.define("renters", {
    renter_id: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    houseId: {
      type: Sequelize.STRING,
      allowNull: false,
      
    },
    landlordId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "landlord_id",
      },
    },
    rent: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    EBCharge: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    currentReading: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastReading: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    miscellaneousAmount: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return renters;
};
