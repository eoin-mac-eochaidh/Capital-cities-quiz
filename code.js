#!/usr/env/bin node

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
 });
 
const json_qs = require("./country-by-capital-city.json");
let questionArray = [];
let qCounter = 0;
let score = 0;


//Random numbers used for selecting the countries and placing question country.
function randNum(){
    return (Math.floor(Math.random()*244));
};

function randomInt(){
  return(Math.floor(Math.random()*3));
}


// Populate the array with three countries.
function populateArray(){
    questionArray=[];
    for(x=0;x<3;x++){
        questionArray.push(randNum());
    }
    readQuestion(questionArray);
}


//Ternary operator to check if the answer is correct and move onto the next question
function checkAnswer(answer,retCorrect){
    let answerposition = 0;

    if(answer=='a'){
        answerposition=0;
    }else if(answer=='b'){
        answerposition=1;
    }else{
        answerposition=2;
    }

    
    answerposition==retCorrect? populateArray(score++):populateArray();
    // answer=='test'? console.log('That\'s a Match'):console.log('No match');
}


function readQuestion(questionArray){


    qCounter==10? wrapup(): qCounter++;
    console.log(qCounter);
    let answer = '';
    let country = json_qs[questionArray[(randomInt())]].country;

    let correctPosition = function(country){
        for(x=0;x<=2;x++){
            if(country==(json_qs[questionArray[x]].country)){
                return (x);
            }else{
                continue;
            }
        }
    }

    let retCorrect = (correctPosition(country));

    

    /// let correctAnswerIndex = questionArray.indexOf(`${country}`); 
    // Read the question and get the user Input.
    //readline.question(`The capital of ${country}`+' is --- A:'+json_qs[questionArray[0]].city+', B:'+json_qs[questionArray[1]].city+' or C:'+json_qs[questionArray[2]].city+'\n\nPlease Type A B or C and hit enter to record your answer', answer => {
   
    //});

    readline.question(`The capital of ${country}`+' is --- A:'+json_qs[questionArray[0]].city+', B:'+json_qs[questionArray[1]].city+' or C:'+json_qs[questionArray[2]].city+'\n\nPlease Type A B or C and hit enter to record your answer', function(answer) {
        console.log(`You have answered ${answer}`);
        // readline.close();
        checkAnswer(answer, retCorrect);
    });

};

function wrapup(){
    console.log('\x1b[31m','Your final results are in');
    console.log(score);
    readline.close(); //// Try and figure this out. The readline.close() does not close user input. Program does not exit in best fashion. Using process.exit as temp work around 
    process.exit(-1);
};


populateArray();




