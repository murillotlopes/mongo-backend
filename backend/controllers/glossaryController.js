const Glossary = require('../models/GlossaryModel')()

const controller = {}

controller.create = async (req, res) => {
    try{
        await Glossary.create(req.body)

        res.status(201).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try{
        const result = await Glossary.find()

        res.send(result)
    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

module.exports = controller