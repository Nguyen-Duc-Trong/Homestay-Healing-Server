import * as insertService from "../service/insert"


export const insert  = async (req, res) => {
    try{
        const response =  await insertService.insertService() 
        // const response =  await insertService.createPricesAndAcreage() 
        return res.status(200).json(response)
    }catch(error) {
        return res.status(500).json({
            err: -1, //Lỗi số âm là lỗi Server còn 0 là thành công
            msg: "Fall at controller: " + error
        })
    }
}