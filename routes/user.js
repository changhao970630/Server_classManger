// login register
let {register, login} = require("../validator/register")
const passport = require('passport')
let jwt = require('jsonwebtoken')
const {Router} = require("express");
const router = new Router();
const userModal = require("../model/userModal")
const {identityJuggle} = require("../tools/foo.js")
const {keys} = require("../tools/config")
// router.get("/", (req, res) => {
//     res.json({msg: "test is ok "});//ok
// })
router.post("/user/register", async (req, res) => {//注册
    const {email, nick_name, identity} = req.body
    if (Object.keys(register(req.body)).length == 0) {
        let findResult = await userModal.findOne({email})
        if (!findResult) {
            userModal.create(req.body, err => {
                if (err) {
                    res.json(err)
                } else {
                    res.json({
                        data: {
                            email, nick_name, identity, identity_name: identityJuggle(Number(identity))
                        }
                    })
                }
            })
        } else {
            res.json({error: "用户邮箱已被占用"})
        }
    } else {
        res.json(register(req.body))
    }
})
router.post("/user/login", async (req, res) => {
    const {email, password} = req.body
    if (Object.keys(login(req.body)).length == 0) {
        let findResult = await userModal.findOne({email, password})
        if (findResult) {
            const rules = {id: findResult.id, nick_name: findResult.nick_name}
            jwt.sign(rules, keys, {expiresIn: 3600 * 24}, (err, token) => {
                if (err) throw err
                else {
                    console.log(findResult)
                    res.json({data: {success: "登录成功！", email: email, nick_name: findResult.nick_name,identity:findResult.identity, token}})
                }
            })

        } else {
            res.json({error: "账号或密码错误"})
        }
    }else{
        res.json({errors:login(req.body)})
    }
})
router.get("/",passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json(req.user)
})

module.exports = router
