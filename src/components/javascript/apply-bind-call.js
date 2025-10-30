/*
call() → Borrows a function from one object and calls it immediately, passing arguments one by one.

apply() → Borrows a function from one object and calls it immediately, passing arguments as an array.

bind() → Borrows a function from one object but returns a new function with this permanently bound (can be called later)
*/

const OPEN_AI={
   companyName: "OpenAI",
   model : "GPT 5",
   softwareBot: function(botName,purpose){
       //this always refers to who is calling the function, not where it’s defined.
       //that's why we are using OPEN_AI.model
    console.log(`${botName} of ${this.companyName} using ${OPEN_AI.model} for the ${purpose}`)
   }
}

const INTERVIEWER_COMPANY={
    companyName : "ABC Pvt ltd"
}

//using call()
OPEN_AI.softwareBot.call(INTERVIEWER_COMPANY,"X-RAY Bot", "Medical")

//using apply()
OPEN_AI.softwareBot.apply(INTERVIEWER_COMPANY,["Hiring Bot", "Hiring"])

//usind bind()
const purchaseSoftware = OPEN_AI.softwareBot.bind(INTERVIEWER_COMPANY,"Codex Bot", "Coding")
purchaseSoftware()