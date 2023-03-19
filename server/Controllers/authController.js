

const bcrypt = require('bcrypt')
require(`dotenv`).config();
const Basket = require('../Models/basket')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')

const genJWT = (id, email,birthdate, role) => {
    return jwt.sign(
        {id, email, birthdate, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}

class AuthController {



    async signup(req, res) {

        try {
            const {email, password, birthdate, role} = req.body
            const date_format = new Date(birthdate)
            console.log("email" + email)
            if (!email || !password) {
                return (res.status(400).json("You didn't input password or email  "))
            }

            const existingUser = await User.findOne({
                email: email
            })
            console.log('USERHERE' + existingUser)
            if (existingUser) {
                return res.status(400).json(`You already have account with ${email}  `)
            }
            const hashPass = await bcrypt.hash(password, 3)
            console.log('WE ARE HERE' + existingUser)
            console.log("BIRTHDATE" + birthdate)
            console.log(date_format)

            const user = await User.create({email: email, password: hashPass, role: role, birthdate: date_format})
            console.log('WE CREATED USER' + user)

            const basket = await Basket.create({user: user._id})
            const token = genJWT(user._id, user.email, user.birthdate, user.role )
            console.log(token)
            return res.json({token: token})
        }
        catch(e){
            console.log("token failed" )

            res.status(500).json(e)
        }
    }

    async signin(req, res){
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(400).json("You didn't input password or email right  ")

        }
        let equalPasswords = bcrypt.compareSync(password, user.password)
        if (!equalPasswords) {
            return res.status(400).json("You didn't inputpassword or email right  ")
        }
        const token = genJWT(user.id, user.email, user.isAdmin)
        return res.json({token})
    }


    async verify(req, res, next) {
        const token = genJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }



}
module.exports = new AuthController()