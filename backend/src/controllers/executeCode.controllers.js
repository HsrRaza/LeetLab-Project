import { db } from "../libs/db.js";
import { submitBatch, pollBatchResults } from "../libs/judge0.lib.js";


export const executeCode = async (req , res)=>{

    try {
        const {source_code , langauage_id , stdin , expected_outputs , problemId } = req.body;

        const userId = req.user.id;
        // validate test cases,  standard input 

        if(
            !Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length !== stdin.length
        )
        {
            return res.status(400).json({error: "invalid or missing test cases "})
        };

        // 2. Prepare each test cases for judge0 batch submission

        const submissions = stdin.map( (input) =>({
            source_code,
            langauage_id,
            stdin:input,
        }));

        // 3. send batch of submission to judge0

        const submitResponse = await submitBatch(submissions)


        const tokens = submitResponse.map( (res) => res.token);


        // 4. poll judge0 for results of all submitted test cases 

        const results = await pollBatchResults(tokens);


        console.log("Results-----------");
        console.log(results);







        // store submission summary

        const submission = await db.submission.create({
            data:{
                userId,
                problemId,
                sourceCode:source_code,
                langauage:getJudge0LanguageId(langauage_id),
                stdin:stdin.json("\n"),
                stdout:JSON.stringify(detailedResults.map( (r)=> r.stdout)),



            }
        });

        // If All passed = true mark 
        if(allPassed){
            await db.problemSolved.upsert({
                where:{
                    userId_problemId:{
                        userId, problemId
                    }
                },
                update:{},
                create:{
                    userId, problemId
                }
            })
        }

        // 8. save individual test case 
  
        res.status(200).json({
            message:"Code Executed!",
        });

        
        
    } catch (error) {
        
    }

}