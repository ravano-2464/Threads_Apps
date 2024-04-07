import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";


export default new class AuthControllers {
  async register(req: Request, res: Response) {
    try {
      const response = await AuthServices.register(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const response = await AuthServices.login(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const response = await AuthServices.check(loginSession);

      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
}