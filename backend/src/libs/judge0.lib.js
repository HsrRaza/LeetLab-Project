import axios from "axios"


export const getJudge0LanguageId = (language) => {


    if (!language || typeof language !== "string") {
        throw new Error("Invalid language input to getJudge0LanguageId()");
    }
    
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }

    return languageMap[language.toUpperCase()] 
}


const sleep = (ms) => new Promise( (resolve) => setTimeout(resolve, ms))

export const pollBatchResults =async(tokens)=>{
    while(true){
        const {data}= await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

        const results = data.submissions
        // console.log(results)

        const isAllDone = results.every(
            (r)=>r.status.id !== 1 && r.status.id !== 2
        )

        if(isAllDone) return results
        await sleep(1000)
    }
    
    
}



export const submitBatch = async (submissions)=>{
    try {
        const  {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
            submissions
        })
    
        console.log("submission Results", data);
    
        return data  // {token}, {token}, {token}
        
    } catch (error) {
        console.error("Judge0 API error:", error.response?.data || error.message);
        throw error
        
        
    }

}

export function getLanguageName(langauageId){
    const LANGUAGE_NAME = {
        74:"TypeScript",
        63:"JavaScript",
        71:"Python",
        62:"Java"
    }

    return LANGUAGE_NAME[langauageId] || "Unknown"
}