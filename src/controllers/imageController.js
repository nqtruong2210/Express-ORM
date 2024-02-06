import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const connect = initModels(sequelize);

// GET danh sách ảnh
const getListImage = async (request, response) => {
  try {
    const data = await connect.hinh_anh.findAll();
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// GET danh sách ảnh theo tên ảnh
const getListImageByName = async (request, response) => {
  try {
    const { ten_hinh } = request.params;
    const data = await connect.hinh_anh.findOne({
      where: { ten_hinh },
    });
    if (!data) {
      return response.status(404).send("Image not found!");
    }
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// GET thông tin ảnh và người tạo ảnh theo id ảnh
const getImageInformation = async (request, response) => {
  try {
    const { hinh_id } = request.params;
    const data = await connect.hinh_anh.findOne({
      include: ["nguoi_dung"],
      where: { hinh_id },
    });
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// GET thông tin bình luận theo id ảnh
const getCommentInformation = async (request, response) => {
  try {
    const { hinh_id } = request.params;
    const data = await connect.binh_luan.findOne({
      where: { hinh_id },
    });
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// GET thông tin đã lưu hình này hay chưa thông qua id ảnh
const getInformationSaveImage = async (request, response) => {
  try {
    const { hinh_id } = request.params;
    const data = await connect.luu_anh.findOne({
      where: { hinh_id },
    });
    if (!data) {
      return response.status(404).send("Image not found!!");
    }
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send("Internal Server Error!");
  }
};

// POST lưu thông tin bình luận của người dùng với hình ảnh
const postInformationComment = async (request, response) => {
  try {
    const { binh_luan_id, hinh_id, ngay_binh_luan, noi_dung } = request.body;
    const user = request.user;
    const nguoi_dung_id = user.nguoi_dung_id;
    if (!user) {
      response.status(400).send(`User not found!!`);
      return;
    }
    const newData = {
      binh_luan_id,
      nguoi_dung_id,
      hinh_id,
      ngay_binh_luan,
      noi_dung,
    };
    await connect.binh_luan.create(newData);
    response.status(200).send("Created successfully!");
  } catch (error) {
    response.status(500).send(`Internal Server Error!${error}`);
  }
};

export {
  getListImage,
  getListImageByName,
  getImageInformation,
  getCommentInformation,
  getInformationSaveImage,
  postInformationComment,
};
