import axios from "axios"


export const getJudge0LanguageId = (langauage) => {
    const langauageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }

    return langauageMap[langauage.toUpperCase()] 
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

        const isAllDone = results.every(
            (r)=>r.status.id !== 1 && r.status.id !== 2
        )

        if(isAllDone) return results
        await sleep(1000)
    }
}



export const submitBatch = async (submission)=>{
    const  {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?based64_encoded=false`,{
        submission
    })

    console.log("submission Results", data);

    return data  // {token}, {token}, {token}
    

}