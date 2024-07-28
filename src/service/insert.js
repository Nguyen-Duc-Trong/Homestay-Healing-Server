import db from "../models"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

import choThueCanHo from '../../data/choThueCanHo.json'
import choThuePhongTro from '../../data/choThuePhongTro.json'
import nhaChoThue from '../../data/nhaChoThue.json'

import generateCode from "../ultis/generateCode";
import { dataPrice, dataAcreage } from "../ultis/data";
import { getNumberFromString } from "../ultis/common";
dotenv.config();

const dataBody = [
    {
        body: choThueCanHo.body,
        code: 'ChoThueCanHo'
    },
    {
        body: choThuePhongTro.body,
        code: 'ChoThuePhongTro'
    },
    {
        body: nhaChoThue.body,
        code: 'NhaChoThue'
    },
]

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Hàm để tạo data trên bảng
export const insertService = () => new Promise(async(resolve, reject) => {
    try{
        const provinceCodes = []
        const labelCodes = []
        dataBody.forEach(cate => {
            cate.body.forEach(async (item)=>{
                let postId = uuidv4()
                let labelCode = generateCode(item?.header?.class?.classType).trim()
                labelCodes?.every(item => item?.code !== labelCode) && labelCodes.push({
                    code: labelCode,
                    value: item?.header?.class?.classType?.trim()
                })
                let provinceCode = generateCode(item?.header?.address?.split(',')?.slice(-1)[0]).trim()
                provinceCodes?.every(item => item?.code !== provinceCode) && provinceCodes.push({
                    code: provinceCode,
                    value: item?.header?.address?.split(',')?.slice(-1)[0].trim()
                })
                let attributesId = uuidv4()
                let userId = uuidv4()
                let overviewId = uuidv4()
                let imagesId = uuidv4()
                let currentAcreage = getNumberFromString(item?.header?.attributes?.acreage)
                let currentPrice = getNumberFromString(item?.header?.attributes?.price)
    
                await db.Post.create({
                    id: postId,
                    title: item?.header?.title,
                    star: item?.header?.star,
                    labelCode,
                    address: item?.header?.address,
                    attributesId,
                    categoryCode: cate.code,
                    description: JSON.stringify(item?.mainContent?.content),
                    userId,
                    overviewId,
                    imagesId,
                    priceCode: dataPrice.find(price => price.max >= currentPrice && price.min <= currentPrice)?.code,
                    acreageCode: dataAcreage.find(acreage => acreage.max >= currentAcreage && acreage.min <= currentAcreage)?.code, //Hàm này sẽ trả về số diện tích nằm trong Obj nào sau khi tìm
                    provinceCode
                })
                await db.Attribute.create({
                    id: attributesId,
                    price: item?.header?.attributes?.price,
                    acreage: item?.header?.attributes?.acreage,
                    published: item?.header?.attributes?.published,
                    hashtag: item?.header?.attributes?.hashtag,
                })
                await db.Image.create({
                    id:imagesId,
                    image: JSON.stringify(item?.images)
                })
                await db.Overview.create({
                    id:overviewId,
                    code: item?.overview?.content.find(i => i.name === "Mã tin:")?.content,
                    area: item?.overview?.content.find(i => i.name === "Khu vực")?.content,
                    type: item?.overview?.content.find(i => i.name === "Loại tin rao:")?.content,
                    target: item?.overview?.content.find(i => i.name === "Đối tượng thuê:")?.content,
                    bonus: item?.overview?.content.find(i => i.name === "Gói tin:")?.content,
                    created: item?.overview?.content.find(i => i.name === "Ngày đăng:")?.content,
                    expire: item?.overview?.content.find(i => i.name === "Ngày hết hạn:")?.content,
                })
                await db.User.create({
                    id: userId,
                    name: item?.contact?.content.find(i => i.name === 'Liên hệ:')?.content,
                    password: hashPassword('123456'),
                    phone: item?.contact?.content.find(i => i.name === 'Điện thoại:')?.content,
                    zalo: item?.contact?.content.find(i => i.name === 'Zalo')?.content,
                    rules : "user",
                    avatar: "https://res.cloudinary.com/drorqx56b/image/upload/v1720143468/Homstay%20Healing/default-user_-_Copy_toudvy.png"
                })
            })
        })
        // console.log(provinceCodes);
        provinceCodes?.forEach(async (item) => {
            await db.Province.create(item)
        })
        labelCodes?.forEach(async (item) => {
            await db.Label.create(item)
        })
        resolve('Đã tạo xong')
    }catch(error){
        reject(error)
    }
})
export const createPricesAndAcreage = () => new Promise(async (resolve, reject) => {
    try {

        for (const [index, item] of dataPrice.entries()) {
            await db.Price.create({
                code: item?.code,
                min: item?.min,
                max: item?.max,
                value: item?.value,
                order: index + 1
            });
        }
        for (const [index, item] of dataAcreage.entries()) {
            await db.Acreage.create({
                code: item?.code,
                min: item?.min,
                max: item?.max,
                value: item?.value,
                order: index + 1
            });
        }
        resolve('Okkkkk');
    } catch (err) {
        reject(err);
    }
});