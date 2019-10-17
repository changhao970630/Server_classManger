module.exports = class tools {
    static identityJuggle(identity) {
        switch (identity) {
            case 1 :
                return "管理员"
                break;

            case 2 :
                return "教师"
                break;

            case 3 :
                return "学生"
                break;

        }
    }
}
