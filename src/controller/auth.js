import * as authService from "../service/auth"
export const register  = async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Request body:', req.body);
    const {name, phone, password} = req.body
    try{
        if (!name || !phone || !password) return res.status(400).json({
            err: 1, //Lỗi số dương thì là lỗi Client còn 0 là thành công
            msg: 'Missing input!',
        })
        const response =  await authService.registerService(req.body) 
        return res.status(200).json(response)
    }catch(error) {
        return res.status(500).json({
            err: -1, //Lỗi số âm là lỗi Server còn 0 là thành công
            msg: "Fall at controller: " + error
        })
    }
}
export const login  = async (req, res) => {
    const {phone, password} = req.body
    try{
        const response =  await authService.loginService(req.body) 
        // console.log(response);
        return res.status(200).json(response)
    }catch(error) {
        return res.status(500).json({
            err: -1, //Lỗi số âm là lỗi Server còn 0 là thành công
            msg: "Fall at controller: " + error
        })
    }
}
