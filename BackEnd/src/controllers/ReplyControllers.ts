import { Request, Response } from "express";
import ReplyServices from "../services/ReplyServices";

export default new class ReplyControllers {
  async find(req: Request, res: Response) {
    try {
      const response = await ReplyServices.find(req.query);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await ReplyServices.create(req.body, loginSession);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
}