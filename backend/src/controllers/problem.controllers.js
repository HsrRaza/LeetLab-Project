import e from "express";

import { getJudge0LanguageId, submitBatch } from "../libs/judge0.lib";

export const createProblem = async (req, res) => {
    // get the all data from the req body

    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolution } = req.body;


    // check the user role  once again
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "You are not allowed to create a problem" })
    }
    try {

        // loop through each reference solution for different langauges.. 

        for (const { language, solutionCode } of Object.entries(referenceSolution)) {

            const langauageId = getJudge0LanguageId(language);

            if (!langauageId) {
                return res.status(400).json({ error: `Language ${language} is not supported ` })
            }

            // 
            const submissions = testcases.map((input, output) => ({
                souce_code: solutionCode,
                language_id: langauageId,
                stdin: input,
                expected_output: output,
            }))


            const submissionsResults = await submitBatch(submissions)

            const tokens = submissionsResults.map((res) => res.token);

            const results = await pollBatchResults(tokens)

            for (let i = 0; i < results.length; i++) {
                const results = results[i];

                if (results.status.id !== 3) {
                    return res.status(400).json({ error: `TestCase ${i + 1} failed for langauage ${language}` })
                }
            }


            //save the problem to the database;
            const newProblem = await db.problem.create({

                data: {
                    title,
                    description,
                    difficulty,
                    tags,
                    examples,
                    constraints,
                    testcases,
                    codeSnippets,
                    referenceSolution,
                    userId: req.user.id,

                }
            });

            return res.status(201).json({
                newProblem
            })

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Creating Problem"
        })


    }





}


export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if (!problems) {
            return res.status(404).json({
                error: "no problem found"
            });
        }


        res.status(200).json({
            message: "Message fetched Successfully",
            problems,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While fetching All Problem"
        })

    }

}
export const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await db.problem.findUnique({
            where: {
                id
            }
        })

        if (!problem) {
            return res.status(404).json({ error: "Problem Not found" })
        }

        res.status(200).json({
            success: true,
            message: "Message fetched Successfully",
            problem,
        })


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            error: "Error While fetching  Problem by id"
        })

    }


}
export const updateProblem = async (req, res) => {
    // id
    // id --> problem (condition)
    // baaki kaam same as 

}
export const deleteProblem = async (req, res) => {

    const { id } = req.params;
    try {

        const problem = await db.problem.findUnique({ where: { id } })

        if (!problem) {
            return res.status(404).json({ error: "Problem Not found" })
        }

        await db.problem.delete({where:{id}})

        res.status(200).json({
            success:true,
            message:"problem deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While deleting the  Problem"
        })
    }


}
export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
        where:{
            solvedBy:{
                some:{
                    userId:req.user.id
                }
            }
        },
        include:{
            solvedBy:{
                where:{
                    userId:req.user.id
                }
            }
        }
    });

    res.status(200).json({
        success:true,
        message:"Problem fetched successfully",
        problems
    })
  } catch (error) {
    console.error("Error fetching problems :", error);
    res.status(500).json({
        success:false,
        message:"Cann"
    })
    
  }
    
  

}