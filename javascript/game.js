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

//initializes screen and word pool
function initialize(){
	words = ["kitsune", "yuki onna"];

	$("#start").empty();
	$("#numGuesses").html("Guesses Remaining: " + guesses);
	$("#wins").html("Wins: " + wins);
	$("#losses").html("Losses: " + losses);
	$("#currentGuesses").html("Current Guesses: " + userGuesses);

	//assign random word from pool and show as blanks for the length of the word
	targetWord = randomWord(words);
	//guesses = setGuesses(targetWord); possible use for future balance
	blanks(targetWord);
}

//Picks a random word from the word pool
function randomWord(wordPool){
	return wordPool[Math.floor(Math.random() * wordPool.length)];
}

//display random word as boxes or blanks equal to length of word
function blanks(targetWord){
	var wordBlanks = [];
	for (var i = 0; i < targetWord.length; i++) {
		if (targetWord[i] == " ") {
			wordBlanks[i] = "\u00A0";
			wordLength++;
		}
		else {
			wordBlanks[i] = "_";
		}
	}

	for (var i = 0; i < wordBlanks.length; i++) {
		var newSpan = $("<span>");
		newSpan.attr("id", i);
		newSpan.text(wordBlanks[i] + " ")
		$("#blanks").append(newSpan);
	}
}

//Checks current guess against list of guesses.
//Adds current guess to guess list if not already in guess list
//otherwise ignores it; to play sound if already guessed
function checkGuess(guessList, guess) {

	if (guessList.includes(guess)) {
		//do nothing, yet
	}
	else if (guesses > 0) {
		guessList.push(guess);
		$("#currentGuesses").append(guessList[guessList.length-1].toUpperCase() + " ");

		//if letter is in word, find position and fill blanks
		if (targetWord.includes(guess)) {
			for (var i = 0; i < targetWord.length; i++) {
				if (guess == targetWord.charAt(i)) {
					$("#"+i).html(guess);
					wordLength++;
				}
			}
		}
		//if letter is not in word, decrease guesses
		else {
			guesses--;
			$("#numGuesses").html("Guesses: " + guesses);
		}
	}		
}

/*sets number of guesses; possible use for future balance
function setGuesses(targetWord) {
	return Math.max(5 + Math.floor(targetWord.length / 2), 10);
}*/

//checks win/loss
function checkResult () {
	if (gameFlag == false){
		if (wordLength == targetWord.length){	
			console.log("you win!");//replace with proper code
			wins++;//define exit code
			gameFlag = true;
			$("#wins").html("Wins: " + wins);
		}
		else if (guesses == 0){
			console.log("you lose...");//replace with proper code
			losses++;//define exit code
			gameFlag = true;
			$("#losses").html("Losses: " + losses);
		}
	}
}

//resets guesses, game flag, word blanks, target wordm and current guesses
function replay(){
	console.log("replay");
	guesses = 6;
	gameFlag = false;
	$("#blanks").empty();
	$("#currentGuesses").empty().html("Current Guesses: ");
	userGuesses = [" "];
	//assign random word from pool and show as blanks for the length of the word
	targetWord = randomWord(words);
	//guesses = setGuesses(targetWord); possible use for future balance
	blanks(targetWord);
}

//show image of word
function showImage(){

}

//game over sequence
function gameOver(){
	if (gameFlag) {
		console.log("game over");
		console.log("restart game?")
		replay(); //only process if restart is true
	}	
}