import * as service from '../service/bookRoom'

export const getBookRoom = async (req, res) => {
    try {
        const data = req.body
        const response = await service.getBookRoomService(data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at book room controller: ' + error
        })
    }
}

export const addBookRoom = async (req, res) => {
    try {
        const data = req.body
        const response = await service.addBookRoomService(data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at add book room controller: ' + error
        })
    }
}

export const deleteBookRoom = async (req, res) => {
    try {
        const data = req.body
        const response = await service.deleteBookRoomService(data)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at delete book room controller: ' + error
        })
    }
}