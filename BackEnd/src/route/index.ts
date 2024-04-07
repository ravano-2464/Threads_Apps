import * as express from 'express'
import ThreadControllers from '../controllers/ThreadControllers'
import AuthControllers from '../controllers/AuthControllers'
import AuthenticationMiddlewares from "../middlewares/Auth"
import FileUpload from '../middlewares/UploadFile'
import LikeControllers from '../controllers/LikeControllers'
import ReplyControllers from '../controllers/ReplyControllers'
import ThreadQueue from '../queue/ThreadQueue'
import UserControllers from '../controllers/UserControllers'
import FollowsController from '../controllers/FollowControllers'

const router = express.Router()
const UploadMiddleware = new FileUpload("image")

// CRUD Threads
router.get("/threads", AuthenticationMiddlewares.Authentication, ThreadControllers.find)
router.get("/detail-thread/:id", AuthenticationMiddlewares.Authentication,  ThreadControllers.findOne)
router.get("/thread/:id", AuthenticationMiddlewares.Authentication,  ThreadControllers.findOneByUserId)
router.post("/thread", AuthenticationMiddlewares.Authentication, UploadMiddleware.handleUpload.bind(UploadMiddleware), ThreadQueue.create)

// AUTH 
router.post("/auth/register", AuthControllers.register)
router.post("/auth/login", AuthControllers.login)
router.get("/auth/check", AuthenticationMiddlewares.Authentication, AuthControllers.check)

// USERS
router.get("/users", AuthenticationMiddlewares.Authentication, UserControllers.find)
router.get("/user/:id", AuthenticationMiddlewares.Authentication, UserControllers.findOne)
router.patch("/user/:id", AuthenticationMiddlewares.Authentication, UploadMiddleware.handleUpload.bind(UploadMiddleware), UserControllers.update)

// LIKE
router.post("/like", AuthenticationMiddlewares.Authentication, LikeControllers.create)
router.delete("/like/:thread_id", AuthenticationMiddlewares.Authentication, LikeControllers.delete)

// REPLY'
router.post("/reply", AuthenticationMiddlewares.Authentication, ReplyControllers.create)
router.get("/replies", AuthenticationMiddlewares.Authentication, ReplyControllers.find)

// FOLLOW
router.get("/follows", AuthenticationMiddlewares.Authentication, FollowsController.find);
router.post("/follow", AuthenticationMiddlewares.Authentication, FollowsController.create);
router.delete("/follow/:followed_user_id", AuthenticationMiddlewares.Authentication, FollowsController.delete);


// NOTIFICATION
router.get("/notifications", (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write("event: message\n");
  function sendNotification(data: any) {
    res.write("data:" + data + "\n\n");
  }

  router.get("/new-thread", (req, res) => {
    const data = JSON.stringify({ data: "new thread!" });
    sendNotification(data);

    res.sendStatus(200);
  });
});

export default router