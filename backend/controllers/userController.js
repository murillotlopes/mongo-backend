const User = require('../models/UsersModel')()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const controller = {}

controller.create = async (req, res) => {
    try{
        await User.create(req.body)

        res.status(201).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try{
        const result = await User.find()

        res.send(result)
    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try{
        const id = req.params.id
        const result = await User.findById(id)

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
        const result = await User.findByIdAndUpdate(id, req.body)

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
        const result = await User.findByIdAndDelete(id)

        if(result) res.status(204).end()

        else res.status(404).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.login = async(req, res) => {

    try{
        const user = await User.findOne({email: req.body.email})

        if(!user) {
            res.status(401).end()

        } else {
            bcrypt.compare(req.body.password, user.password_hash, function(err, result){

                console.log(result)
                
                if(result){

                    const token = jwt.sign({
                        id: user._id
                    }, process.env.SECRET, {
                        expiresIn: 3600
                    })

                    res.json({
                        auth: true, token
                    })

                } else {
                    res.status(401).end()
                }
            })
        }

    }catch (error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = controller