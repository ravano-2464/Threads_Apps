import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";
import ThreadQueue from "../queue/ThreadQueue";

export default new class ThreadControllers {
  async find(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession

      const response = await ThreadServices.find(req.query, loginSession);
      
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await ThreadServices.findOne(id);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async findOneByUserId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await ThreadServices.findOneById(id);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
  
  create(req: Request, res: Response) {
    ThreadQueue.create(req, res)
  }
}