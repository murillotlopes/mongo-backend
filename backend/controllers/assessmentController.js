const Assessment = require('../models/AssessmentModel')()

const controller = {}

controller.create = async (req, res) => {
    try{
        await Assessment.create(req.body)

        res.status(201).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try{
        const result = await Assessment.find({user: req.authenticateId}).populate('user').select('-user.password_hash')

        res.send(result)
    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try{
        const id = req.params.id
        const result = await Assessment.findOne({_id: id, user: req.authenticateId})

        if(result) res.send(result)

        else res.status(404).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try{
        const id = req.body._id
        const result = await Assessment.findByIdAndUpdate(id, req.body)

        if(result) res.status(204).end()

        else res.status(404).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try{
        const id = req.body._id
        const result = await Assessment.findByIdAndDelete(id)

        if(result) res.status(204).end()

        else res.status(404).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

module.exports = controller