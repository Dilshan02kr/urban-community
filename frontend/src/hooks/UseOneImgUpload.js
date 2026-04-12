import axios from "axios";

const preset_key = process.env.REACT_APP_PRESET_KEY;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

const UseOneImgUpload = async ({ file }) => {
  if (!file) {
    throw new Error("Please select an image file to upload.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset_key);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    const imageUrl = response.data?.secure_url;
    if (!imageUrl) {
      throw new Error("Image upload failed. Try again.");
    }

    return imageUrl;
  } catch (error) {
    throw new Error(
      error?.response?.data?.error?.message ||
        error?.message ||
        "Failed to upload image."
    );
  }
};

export default UseOneImgUpload;
