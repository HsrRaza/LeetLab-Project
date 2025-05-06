import express from "express"

import {authMiddleware} from "../middlewares/auth.middle.js"
import { getAllSubmission, getAllSubmissionForProblem , getSubmissionsForProblem } from "../controllers/submission.controllers.js";

const submissionRoutes = express.Router() 

submissionRoutes.get("/get-all-submission", authMiddleware, getAllSubmission);
submissionRoutes.get("/get-submission/:problemId", authMiddleware, getSubmissionsForProblem)

submissionRoutes.get("/get-submission-count/:problemId", authMiddleware,getAllSubmissionForProblem )

export default submissionRoutes
