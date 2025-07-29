let userScore = 0; // Variable for keeping track of the user score.
let compScore = 0; // Variable for keeping track of the computer score.

const choices = document.querySelectorAll(".choice"); // Accessing the choice selected by the user ( all 3 ).
const msg = document.querySelector("#msg"); // Accessing the Div which displays the win,loose or draw msg.

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

choices.forEach( (choice) => {

    choice.addEventListener("click" , () =>{

        const userChoice = choice.getAttribute("id");
        playGame(userChoice);

    });

});

const playGame = (userChoice) =>{

    const compChoice = genCompChoice();

    if(userChoice === compChoice){

        // The game is Draw
        drawGame();

    }

    else{

        let userWin = true;
        if(userChoice === "rock"){

            //scissors or paper
            userWin = compChoice === "paper" ? false : true;

        }

        else if(userChoice === "paper"){

            //rock or scissors
            userWin = compChoice === "rock" ? true : false;

        }

        else{

            //rock or paper
            userWin = compChoice === "rock" ? false : true;

        }

        showWinner(userWin, userChoice, compChoice);

    }

}

const drawGame = () =>{

    msg.innerText = "Game was Draw! Play again.";
    msg.style.backgroundColor = "#081b31";

}


const genCompChoice = () =>{

    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3); // Generate a number ( which is the index of above array ) from 0 to 2;
    return options[randIdx];

}

const showWinner = (userWin, userChoice, compChoice) =>{

    if(userWin){

        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = 'green';

    }

    else{

        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = 'red';

    }

};



