import jwt from "jsonwebtoken";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const connect = initModels(sequelize);

const createToken = (data) => {
  return jwt.sign({ data }, "Authorization", { expiresIn: "1y" });
};

const checkToken = (token) => {
  return jwt.verify(token, "Authorization", (error, decoded) => {
    if (error) {
      return {
        status: 401,
        message: "Invalid Token!",
      };
    }
    return {
      status: 200,
      message: decoded,
    };
  });
};

const keyAPI = async (request, response, next) => {
  const { token } = request.headers;
  if (token) {
    const verifyToken = checkToken(token);
    if (verifyToken.status === 401) {
      response.status(401).send("Invalid Token!");
      return;
    }
    const { email } = verifyToken.message.data;
    const checkUser = await connect.nguoi_dung.findOne({
      where: {
        email: email,
      },
    });
    if (!checkUser) {
      response.status(401).send("Invalid Token!");
      return;
    }
    request.user = checkUser;

    next();
  } else {
    response.status(401).send("Not Authorized!");
    return;
  }
};

export { createToken, checkToken, keyAPI };
