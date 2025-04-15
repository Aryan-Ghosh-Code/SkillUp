// // middlewares/uploadMiddleware.js
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
//   api_key: process.env.CLOUDINARY_API_KEY || 'your_api_key',
//   api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret'
// });

// // Configure CloudinaryStorage for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'your_folder_name', // adjust as needed
//     allowed_formats: ['mp4', 'mov', 'avi']
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;
