const cloudinary = require('cloudinary');
const config = require('../config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name, 
  api_key: config.cloudinary.api_key, 
  api_secret: config.cloudinary.api_secret,
  secure: config.cloudinary.secure
})


async function uploadImage(filePath){
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: 'perfil'
  })
}

const deleteImage = async (publicId) => {
  return await cloudinary.v2.uploader.destroy(publicId)
}

module.exports = { uploadImage };