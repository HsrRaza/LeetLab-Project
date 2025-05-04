import {db} from "../libs/db.js"

export const getAllSubmission = async (req, res) =>{
    try {
        const userId = req.user.id;

        const submission = await db.submission.findMany({
            where:{
                userId:userId,
            }
        })




        res.status(200).json({
            success:true,
            messgae:"Submissions fetched successfully",
            submission
        })
        
    } catch (error) {


        
    }
    
}
export const getSubmissionsForProblem = async (req, res) =>{

    try {
        const userId = req.user.id;
        const problemId = req.params.problemId;

        const submission = await db.submission,findMany({
            where:{
                userId:userId,
                problemId:problemId
            }
        });



    } catch (error) {
        
    }

}
export const getAllSubmissionForProblem = async (req, res) =>{
    try {
        const problemId = req.params.problemId;
        const submission = await db.submission.count({
            where:{
                problemId:problemId
            }
        });

        res.status(200).json({
            success:true,
            message:"Submission fetche successfully",
            count: submission
        })
    } catch (error) {
        console.error(error);
        
        
    }

}