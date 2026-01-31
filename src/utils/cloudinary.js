import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

let uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    let result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return result
  } catch (error) {
    console.error("🔥 Cloudinary upload error:", error.message || error)

    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw error
  }
}

export { uploadOnCloudinary }