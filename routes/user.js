// login register
let {register} = require("../validator/register")

const {Router} = require("express");
const router = new Router();
const userModal = require("../model/userModal")
const {identityJuggle} = require("../tools/foo.js")
// router.get("/", (req, res) => {
//     res.json({msg: "test is ok "});//ok
// })
router.post("/user/register", async (req, res) => {
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

module.exports = router
