// import { Request, Response } from "express";
// import FollowServices from "../services/FollowServices";
// import { createFollowingSchema } from "../utils/validator/Follow";

// export default new class FollowControllers {
//   async followed(req: Request, res: Response) {
//     try {
//       const userLogin = res.locals.loginSession
//       const data = {
//         userLogin: userLogin.user.id,
//         followingId: req.body.followingId
//       }

//       const { error } = createFollowingSchema.validate(data)
//       if(error) return res.status(400).json({ Message: "Error entering the userid to be followed / session id does not match" })

//       const followed = await FollowServices.createFollowing(data)

//       return res.status(200).json(followed)
//     } catch (err) {
//       return res.status(500).json({ Message: "Something error while create followed"})
//     }
//   }

//   async find(req: Request, res: Response) {
//     try {
//       const userLogin = res.locals.loginSession;
//       const type = (req.query.type ?? "") as string;

//       const response = await FollowServices.find(userLogin, type);

//       return res.status(200).json(response)
//     } catch (err) {
//       return res.status(500).json({ Message: "Something error while finding followed by user login"})
//     }
//   }
// }


// ============================================================================================================


import { Request, Response } from "express";
import FollowsService from "../services/FollowServices";

class FollowsController {
  async find(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const limit = (req.query.limit ?? 0) as number;
      const type = (req.query.type ?? "") as string;
      
      const response = await FollowsService.find(loginSession, type, limit);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await FollowsService.create(req.body, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const followedUserId = parseInt(req.params.followed_user_id);

      const response = await FollowsService.delete(
        followedUserId,
        loginSession
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new FollowsController();
