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
	guesses = 5;
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
		wordBlanks[i] = "_";
	}
}


//min guesses = 5; max guesses = word length / 2 + 5

//display letter in place of box/blank on correct guess

//keep track of wins and losses

//loop game until exited(?)

//show pictures on win/lose

//initialize game variables