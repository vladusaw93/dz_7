const {userServices, mailerservices} = require(`../../services`);
const {hasher} = require(`../../helpers`);
const {errorHandler, errors: {NOUSER}} = require(`../../errors`);
const uuid = require('uuid').v1();
const path = require('path');
const fsExtra = require('fs-extra').promises;


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
            const [avatar] = req.photos;
            newUser.password = await hasher(newUser.password);

            const createdUser = await userServices.creatUser(newUser);
            const {id} = createdUser;
            const photoDir = `users/${id}/photos`;
            const splitedFile = avatar.name.split(`.`).pop();
            const photoName = `${uuid}.${splitedFile}`;

            await fsExtra.mkdir(path.resolve(process.cwd(), `public`, photoDir), {recursive: true});
            await avatar.mv(path.resolve(process.cwd(), `public`, photoDir, photoName));
            const updatedUser = await userServices.updateUserById(id, {photo: `/${photoDir}/${photoName}`});

            res.json(updatedUser);
            res.end();
        } catch (e) {
            console.log(e);
        }
        res.end();
    },

    deletePhoto: (req, res, next) => {
        try {
            userServices.updateUserById(res.userId, {photo: null});
        } catch (e) {
            console.log(e);
        }
    }
}
