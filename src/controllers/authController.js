import { createToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

const connect = initModels(sequelize);

// Login
const login = async (request, response) => {
  try {
    let { email, mat_khau } = request.body;
    let data = await connect.nguoi_dung.findOne({
      where: {
        email: email,
      },
    });
    if (data) {
      let userToken = {
        email,
        mat_khau,
      };
      let token = createToken(userToken);
      response.status(200).send({ token });
    } else {
      response.status(404).send("Login failed, please try again!");
    }
  } catch (error) {
    console.log(`Back-End Error: ${error}`);
    response.status(500).send("Internal Server Error!");
  }
};

// Register
const register = async (request, response) => {
  try {
    const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = request.body;
    const data = await connect.nguoi_dung.findOne({
      where: { email: email },
    });
    if (data) {
      response.status(401).send("User already exists");
    } else {
      const enCodePassword = bcrypt.hashSync(mat_khau, 10);
      const newUser = {
        email,
        mat_khau: enCodePassword,
        ho_ten,
        tuoi,
        anh_dai_dien,
      };
      const token = createToken({ email });
      await connect.nguoi_dung.create(newUser);
      response.status(201).send(`User is created with token: ${token}`);
    }
  } catch (error) {
    console.log(`BE Error...${error}`);
    response.status(500).send("Internal Server Error");
  }
};
export { login, register };
