import express from "express";
import { studentControllers } from "./student.controler";

const router = express.Router()

router.post('./create-student',studentControllers.createStudent)

export const StudentRoutes = router