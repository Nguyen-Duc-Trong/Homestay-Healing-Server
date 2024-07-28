import db from "../models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const getFirst10Chars = () => {
    let id = uuidv4();
    return id.substring(0, 10);}
export const registerService = ({ name, phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const [user, created] = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                phone,
                name,
                zalo : phone,
                password: hashPassword(password),
                id: getFirst10Chars(),
                rules: "user",
                money: 0,
                avatar : "https://res.cloudinary.com/drorqx56b/image/upload/v1720143468/Homstay%20Healing/default-user_-_Copy_toudvy.png"
            }
        });
        const token = created && jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY, { expiresIn: '1d' });
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Đăng kí thành công' : 'Tài khoản đã tồn tại',
            token: token || null,
            username: token ? user.name : " ",
            phone: token ? user.phone : " ",
            id: token ? user.id : " ",
            rules: token ? user.rules : " ",
            money: token ? user.money : " ",
            avatar: token ? user.avatar : " ",
            zalo: token ? user.zalo : " ",
        });
    } catch (error) {
        reject(error);
    }
});

export const loginService = ({phone, password}) => new Promise(async(resolve, reject) => {
    try{
        const user =  await db.User.findOne ({
            where: {phone},
            raw: true
        })
        // console.log(user);
        const isCorrectPassword = user && bcrypt.compareSync(password, user.password)
        const token = isCorrectPassword && jwt.sign({id: user.id, phone: user.phone}, process.env.SECRET_KEY, {expiresIn: '1d'})
        resolve({
            checkPhone : user ? true : false , 
            checkPass : isCorrectPassword ? true : false,
            err: token ? 0 : 2,
            // msg: token ? 'Đăng nhập thành công' : response ? 'Sai mật khẩu' : 'Số điện thoại chưa tồn tại',
            token: token || null,
            username: token ? user.name : " ",
            phone: token ? user.phone : " ",
            id: token ? user.id : " ",
            rules: token ? user.rules : " ",
            money: token ? user.money : " ",
            zalo: token ? user.zalo : " ",
            avatar: token ? user.avatar : " ",
        })
    }catch(error){
        reject(error)
    }
})