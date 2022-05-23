import Sequelize from "sequelize";

export const sequelize = new Sequelize("encryptionapi", "root", "", {
  host: "localhost",
  dialect: "mysql",
  login: false,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
