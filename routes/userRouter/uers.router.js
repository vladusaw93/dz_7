const {Router} = require(`express`);
const userRouter = Router();

const {userContorller} = require(`../../controllers`)

const {
    UserMiddlowares: {
        ValidUserToCreate,
        ValidUser
    },
    ValidFiles: {
        ChecklvalidFiles,
        CheckvalidFilesToUpload,
    },
    authMidlovare: {
        validToken,
    }
} = require(`../../middelwars`);

userRouter.get(`/`, userContorller.getUsers);

userRouter.post(`/`,
    ValidUserToCreate,
    ValidUser,
    ChecklvalidFiles,
    CheckvalidFilesToUpload,
    userContorller.creatUser);

userRouter.get(`/:userId`, userContorller.getUserById);

userRouter.delete(`/:userId`,
    ValidUser,
    userContorller.deleteUser);

userRouter.delete(`/deletePhoto`,
    validToken,
    userContorller.deletePhoto);


module.exports = userRouter;
