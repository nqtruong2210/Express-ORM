import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { keyAPI } from "../config/jwt.js";

const connect = initModels(sequelize);

// const { checkUser } = keyAPI;

// GET thông tin người dùng
const getUserInformation = (request, response) => {
  try {
    // const data = await connect.nguoi_dung.findAll();
    const user = request.user;
    response.status(200).send(user);
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// GET danh sách ảnh đã lưu theo id người dùng
const getListSaveImage = async (request, response) => {
  try {
    let nguoi_dung_id = request.user.nguoi_dung_id;
    let data = await connect.luu_anh.findAll({
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
    });
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send(error);
  }
};

// GET danh sách ảnh đã tạo theo id người dùng
const getListCreatedImage = async (request, response) => {
  try {
    const { nguoi_dung_id } = request.params;
    const data = await connect.hinh_anh.findOne({
      where: { nguoi_dung_id },
    });
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// DELETE ảnh đã tạo theo id người dùng
const deleteCreatedImage = async (request, response) => {
  try {
    const { hinh_id } = request.params;
    await connect.hinh_anh.destroy({
      where: { hinh_id },
    });
    response.status(200).send("Delete the create image successfully!");
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// PUT thông tin bình luận
const putUserInformation = async (request, response) => {
  try {
    const { nguoi_dung_id } = request.params;
    const { mat_khau, ho_ten, tuoi, anh_dai_dien } = request.body;
    const newData = {
      mat_khau: mat_khau,
      ho_ten: ho_ten,
      tuoi: tuoi,
      anh_dai_dien: anh_dai_dien,
    };

    await connect.nguoi_dung.update(newData, {
      where: { nguoi_dung_id },
    });
    response.status(200).send("Update user successfully!");
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// POST thêm một ảnh của user
const postImageUser = async (request, response) => {
  try {
    const { hinh_id, ten_hinh, duong_dan, mo_ta } = request.body;
    const user = request.user;
    const nguoi_dung_id = user.nguoi_dung_id;
    if (!user) {
      response.status(400).send(`User not found!!`);
      return;
    }
    const newData = {
      hinh_id,
      nguoi_dung_id: nguoi_dung_id,
      ten_hinh,
      duong_dan,
      mo_ta,
    };
    await connect.hinh_anh.create(newData);
    response.status(200).send("Created successfully!");
  } catch (error) {
    response.status(500).send(nguoi_dung_id);
  }
};

export {
  getUserInformation,
  getListSaveImage,
  getListCreatedImage,
  deleteCreatedImage,
  putUserInformation,
  postImageUser,
};
