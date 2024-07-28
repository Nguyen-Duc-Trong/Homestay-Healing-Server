import * as service from '../service/contract'

export const getContract = async (req, res) => {
    try {
        const data = req.body
        const response = await service.getContractService(data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at contract controller: ' + error
        })
    }
}

export const addContract = async (req, res) => {
    try {
        const data = req.body
        const response = await service.addContractService(data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at add contract controller: ' + error
        })
    }
}
