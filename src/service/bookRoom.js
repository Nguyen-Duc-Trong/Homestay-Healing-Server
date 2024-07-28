import db from '../models'

export const getBookRoomService = ({userId}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.BookRoom.findOne({
            where: {userId},
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to post BookRoom.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const addBookRoomService = ({userId, postId}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.BookRoom.findOne({
            where: {userId},
        })
        if(!response){
            await db.BookRoom.create(
                { userId, bookRoomId: JSON.stringify([postId]) }
            )
        }else{ 
            let newData = JSON.parse(response.bookRoomId);
            newData.push(postId)
            response.bookRoomId = JSON.stringify(newData); 
            response.save()
        }
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to post BookRoom.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const deleteBookRoomService = ({userId, postId}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.BookRoom.findOne({
            where: {userId},
        })
        if(!response){
            console.log(msg , "không tìm thấy bản lưu")
        }else{ 
            let newData = JSON.parse(response.bookRoomId);
            newData = newData.filter(item => item !== postId);
            response.bookRoomId = JSON.stringify(newData); 
            response.save()
        }
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to post BookRoom.',
            response
        })
    } catch (error) {
        reject(error)
    }
})