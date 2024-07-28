import db from '../models'

export const getAcreageSerivce = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Acreage.findAll({
            raw: true,
            attributes: ['code', 'value', 'order', 'min', 'max']
        })
        // console.log(response);
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get price.',
            response
        })
    } catch (error) {
        reject(error)
    }
})