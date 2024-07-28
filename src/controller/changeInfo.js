import * as changeInfoService from "../service/changeInfo"
export const changeInfo = async (req, res) => {
    try {
        const response = await changeInfoService.changeInfo(req);
        // console.log(req.file);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in controller:", error);
        return res.status(500).json({
            err: -1,
            msg: "Mật khẩu không đúng, vui lòng thử lại!"
        });
    }
};