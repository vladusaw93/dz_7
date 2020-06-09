const {userServices, mailerservices} = require(`../../services`);
const {hasher} = require(`../../helpers`);
const {errorHandler, errors: {NOUSER}} = require(`../../errors`);

const {
    errorsStatusEnum: {UNAUTHORIZED},
    emailEnum: {REGUSER, DELETEDUSER}
} = require(`../../constants`)

module.exports = {
    getUsers: async (req, res) => {
        const allUsers = await userServices.getUsers();
        res
            .json(allUsers)
            .end();
    },

    getUserById: async (req, res, next) => {
        const {userId} = req.params;
        const oneUser = await userServices.getUserBuId(userId);

        if (!oneUser) {
            return next(new errorHandler(
                NOUSER.message,
                UNAUTHORIZED,
                NOUSER.code));
        }

        res
            .json(oneUser)
            .end();

    },

    deleteUser: async (req, res, next) => {
        const {userId} = req.params;
        const user = await userServices.getUserBuId(userId);

        if (!user) {
            return next(new errorHandler(
                NOUSER.message,
                UNAUTHORIZED,
                NOUSER.code));
        }


        await mailerservices.sendMails(user.email, DELETEDUSER);
        await userServices.deleteUserById(userId);

        res.end();
    },

    creatUser: async (req, res) => {
        try {
            const newUser = req.body;
            newUser.password = await hasher(newUser.password);

            await userServices.creatUser(newUser);
            await mailerservices.sendMails(newUser.email, REGUSER, {
                userName: newUser.name,
                login: newUser.email,

            })
            res.json(newUser);
            res.end();
        }
    catch
        (e) {
        res.json(e);
    }

    res.end();
},

}
