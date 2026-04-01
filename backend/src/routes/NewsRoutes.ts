import { CreateNews, GetNews, BulkNewsUpload } from "../controllers/NewsMethods.js";
import { Router } from "express";
const newsRouter = Router();

newsRouter.get("/getnews", GetNews);
newsRouter.post("/newnews", CreateNews);
newsRouter.post("/bulknews", BulkNewsUpload);


export default newsRouter;