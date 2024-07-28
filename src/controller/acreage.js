import * as service from '../service/acreage'

export const getAcreages = async (req, res) => {
    try {
        const response = await service.getAcreageSerivce()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at category controller: ' + error
        })
    }
}