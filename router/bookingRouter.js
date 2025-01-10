import { Router } from "express";
import { deletebooking, getbooking, postbooking, updatebooking } from "../Controller/bookingController.js";

const bookRouter = Router();

bookRouter.get("/get",getbooking);
bookRouter.post("/create",postbooking);
bookRouter.put("/update/:Full_Name",updatebooking);
bookRouter.delete("/delete/:Full_Name",deletebooking);
export default bookRouter;
