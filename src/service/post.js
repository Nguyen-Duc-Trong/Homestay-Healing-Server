import db from '../models'
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import overview from '../models/overview'


export const getPostsService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'users', attributes: ['name', 'phone', 'zalo'] },
                { model: db.Overview, as: 'Overviews'}
            ],
            attributes: ['id', 'title', 'star', 'address', 'description', 'categoryCode', 'provinceCode', 'priceCode', 'acreageCode']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ok" : "Getting posts is Fail",
            response : response,
        })
    } catch (error) {
        reject(error)
    }
})

export const filterPrices = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'users', attributes: ['name', 'phone', 'zalo'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description', "acreageCode"]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ok" : "Getting posts is Fail",
            response : response,
        })
    } catch (error) {
        reject(error)
    }
})

export const posting  = (data) => new Promise(async (resolve, reject) => {
    try {
        console.log(data);
        const {star,title,userId,categoryCode,ContactInfo,areaNumber,
            priceNumber,images,address,priceCode,areaCode,description,
            target,province,acreagesCode} = data
        let postId = uuidv4()
        let labelCode = uuidv4()
        let attributesId = uuidv4()
        let overviewId = uuidv4()
        let imagesId = uuidv4()
        await db.Post.create({
            id: postId,
            title: title,
            star: star,
            labelCode : labelCode,
            address: address,
            attributesId : attributesId,
            categoryCode: categoryCode,
            description: JSON.stringify(description),
            userId : userId,
            overviewId : overviewId,
            imagesId : imagesId,
            priceCode: priceCode,
            acreageCode: acreagesCode, 
            provinceCode : areaCode
        })

        await db.Attribute.create({
            id: attributesId,
            price: priceNumber / 1000000 + "triệu/tháng",
            acreage: areaNumber,
            published: "1 phút trước",
            hashtag: attributesId,
        })
        await db.Image.create({
            id:imagesId,
            image: JSON.stringify(images)
        })
        let date = new Date()
        await db.Overview.create({
            id:overviewId,
            code: overviewId,
            area: province,
            type: categoryCode,
            target: target,
            bonus: description,
            created : date,
            expire :date,
        })


        resolve("Đã tạo thành công !" )
    } catch (error) {
        reject(error)
    }
})

export const deletePost = async ({idPost}) => {
    try {
        // console.log(idPost);
      const result = await db.Post.destroy({
        where: {
          id: idPost
        }
      });
        if (result) {
        console.log(`Xóa thành công bài đăng có id : ${idPost}`);
      } else {
        console.log(`Không tìm thấy bài đăng có id : ${idPost}`);
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng:', error);
    }
  };