const validator = require("validator");

module.exports= class validators {
    static register(data) { //注册验证
        const { email,password,nick_name,identity } = data;
        console.log(email)
        let errors={}
        if(!validator.isEmail(email)){
            errors.email="邮箱格式不正确"
        }
        if(validator.isEmpty(password)){
            errors.email="密码不能为空"
        }
        if(!validator.isByteLength(nick_name,{min:2, max: 8})){
            errors.email="昵称格式不正确，最少两位，最多8位"
        }
        if(validator.isEmpty(identity)){
            errors.email="身份未选择"
        }
        return errors
    }
    static login(data){
        let errors={}
        const { email,password} = data;
        if(!validator.isEmail(email)){
            errors.email="邮箱格式不正确"
        }
        if(validator.isEmpty(password)){
            errors.email="密码不能为空"
        }
        return errors
    }
}
