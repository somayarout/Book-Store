import { Router } from "express";
import { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } from "./bookcontroller.js";

const router = Router();

router.post("/create-book", postABook);
router.get("/get", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", updateBook);
router.delete("/:id", deleteABook);

export default router; 