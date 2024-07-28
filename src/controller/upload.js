import { uploadToCloudinary } from "../service/uploadService";
export const uploadFile = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    try {
        const result = await uploadToCloudinary(req.file);
        return res.status(201).json({
            url: result.url,
        });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};