import * as service from '../service/province'

export const getProvinces = async (req, res) => {
    try {
        const response = await service.getProvinceSerivce()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at province controller: ' + error
        })
    }
}