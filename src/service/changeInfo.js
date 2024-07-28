
import db from "../models"
import bcrypt from "bcryptjs"
import {uploadToCloudinary } from "../service/uploadService"
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const changeInfo = async (req) => new Promise(async (resolve, reject) => {
    try {
        const { id, password, username,zalo ,phone, newPassword ,avatar} = req.body
        // console.log(req.body);
        // const  avatar = req.file
        const user = await db.User.findOne({
            where: { id },
            raw: true
        });
        if (!user) {
            reject({ message: 'User not found' });
            return;
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            reject({ message: 'Invalid password' });
            return;
        }
        // let newAvatar = ''
        // if(avatar){
        //     const result = await uploadToCloudinary(avatar);
        //     newAvatar = result.url
        // }
        // console.log("url" + newAvatar);
        await db.User.update(
            {
                id: id || user.id,
                name: username || user.name,
                password: newPassword ? hashPassword(newPassword) : user.password,
                phone: phone || user.phone,
                zalo: zalo || user.zalo,
                avatar: avatar || user.avatar,
            },
            { where: { id } }
        );

        const updatedUser = await db.User.findOne({
            where: { id },
            raw: true
        });
        resolve(updatedUser);
    } catch (error) {
        reject(error);
    }
});