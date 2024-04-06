const quests = [
    {
        quest : "Who invented C++?",
        answers:[
            { text:"Dennis Ritchie", correct:false},
            { text:"Ken Thompson", correct:false},
            { text:"Brian Kernighan", correct:false},
            { text:"Bjarne Stroustrup", correct:true},
        ]
    },
    {
        quest : " Which of the following type is provided by C++ but not C?",
        answers:[
            { text:"double", correct:false},
            { text:" float", correct:false},
            { text:"bool", correct:true},
            { text:"int", correct:false},
        ]
    },
    {
        quest : " What is C++?",
        answers:[
            { text:"C++ supports both procedural and object oriented programming language", correct:true},
            { text:"C++ is an object oriented programming language", correct:false},
            { text:"C++ is a procedural programming language", correct:false},
            { text:"C++ is a functional programming language", correct:false},
        ]
    },
    {
        quest : " Which of the following is used for comments in C++?",
        answers:[
            { text:" /* comment */", correct:false},
            { text:"// comment */", correct:false},
            { text:"// comment", correct:false},
            { text:"both // comment or /* comment */", correct:true},
        ]
    },
    {
        quest : "Which of the following user-defined header file extension used in c++?",
        answers:[
            { text:"h", correct:true},
            { text:"hg", correct:false},
            { text:"cpp", correct:false},
            { text:"hf", correct:false},
        ]
    },

];
const questEle = document.getElementById("question");
const ansbtn = document.getElementById("ansButton");
const nextbtn = document.getElementById("next-btn");

let currentQuestindex = 0;
let score = 0;

function startQuiz(){
    currentQuestindex =0;
    score=0;
    nextbtn.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = quests[currentQuestindex];
    let questNo = currentQuestindex +1;
    questEle.innerHTML = questNo+"."+currentQuestion.quest;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAns);
    });
}
function resetState(){
    nextbtn.style.display = "none";
    while(ansbtn.firstChild){
        ansbtn.removeChild(ansbtn.firstChild);
    }

}

function selectAns(e){
    const selectedBtn =  e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansbtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function showScore(){
    resetState();
    questEle.innerHTML = 'you scored '+score+' out of '+(quests.length)+'!';
    nextbtn.innerHTML= "Play Again";
    nextbtn.style.display="block";
}

function handleNextBtn(){
    currentQuestindex++;
    if(currentQuestindex<quests.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextbtn.addEventListener("click",()=>{
    if(currentQuestindex<quests.length){
        handleNextBtn()
    }
    else{
        startQuiz();
    }
})

startQuiz();