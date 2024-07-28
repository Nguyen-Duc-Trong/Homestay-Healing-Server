import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                console.error("Upload error:", error);
                reject(error);
            } else {
                console.log("Upload successful:", result);
                resolve(result);
            }
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};