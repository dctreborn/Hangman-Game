/*Choose a theme for your game! In the demo, we picked an 80s theme: 80s questions, 80s sound and an 80s aesthetic. You can choose any subject for your theme, though, so be creative!

Use key events to listen for the letters that your players will type.

Display the following on the page:

    Press any key to get started!

    Wins: (# of times user guessed the word correctly).

        If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _.

        As the user guesses the correct letters, reveal them: m a d o _ _ a.

    Number of Guesses Remaining: (# of guesses remaining for the user).

    Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).

After the user wins/loses the game should automatically choose another word and make the user play it.
*/

//youkai theme

//Start Game

//pick random word

//Initializes game variables
function initialize(){
	wins = 0;
	losses = 0;
	guesses = 0;
	userGuesses = [];
	wordBlanks = [];
}

//Picks a random word from the word pool
function randomWord(wordPool){
	return wordPool[Math.floor(Math.random() * wordPool.length)];
}

//display random word as boxes or blanks equal to length of word
function blanks(targetWord){
	for (var i = 0; i < targetWord.length; i++) {
		if (targetWord[i] == " ") {
			wordBlanks[i] = "\u00A0";
		}
		else {
			wordBlanks[i] = "_";
		}
	}

	for (var i = 0; i < wordBlanks.length; i++) {
		$("#blanks").append(wordBlanks[i] + " ");
	}
	
}

//Checks current guess against list of guesses.
//Adds current guess to guess list if not already in guess list
//otherwise ignores it; to play sound if already guessed
function checkGuess(guessList, guesses) {

	for (var i = 0; i < guessList.length; i++) {
		if (guessList[i] == guess) {
			//do nothing, yet
		}
		else if (i == guessList.length - 1) {
			guesses++;
			guessList.push(guess);
		}

		//add condition for guessing entire word
	}	
}

//sets number of guesses
function setGuesses(targetWord) {
	return Math.max(5 + Math.floor(targetWord.length / 2), 10);
}

//tallies wins and losses
function tally() {

}

//prompts to reset game
function reset(){

}

//show image of word
function showImage(){

}

//game over sequence
function gameOver(){

}

//loop game until exited(?)