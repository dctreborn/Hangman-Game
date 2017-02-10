/*Choose a theme for your game! In the demo, we picked an 80s theme: 80s questions, 80s sound and an 80s aesthetic. You can choose any subject for your theme, though, so be creative!

After the user wins/loses the game should automatically choose another word and make the user play it.
*/

//initializes screen and word pool
function initialize(){
	console.log("initialize");
	words =	createList();
	guesses = 6;
	wordLength = 0;
	userGuesses = [" "];
	gameFlag = false;

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

//word template
function youkai(name, image, url){
	return {
	name: name,
	image: image,
	url: url
	//to add url link to youkai article
	}
}

//create word list
function createList(){
	var array = [];

	//list of words
	array.push(youkai("kistune", "kitsune.jpg", "http://yokai.com/kitsune/"));
	array.push(youkai("yuki onna", "yukionna.jpg", ""));
	array.push(youkai("kappa", "kappa.jpg", ""));
	array.push(youkai("oni", "oni.jpg", ""));
	array.push(youkai("yamata no orochi", "yamatanoorochi.png", ""));

	return array;
}

//Picks a random word from the word pool
function randomWord(wordPool){
	var index = wordPool[Math.floor(Math.random() * wordPool.length)];
	wordPic = index.image;
	wordUrl = index.url;
	return index.name;
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

	//checks to see if guess is in guess list and a character
	if (guessList.includes(guess) || !(guess.match(/[a-z]/)) ) {
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
			drawHang();
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
			showImage();
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
	$("#blanks").empty();
	$("#currentGuesses").empty();
	initialize();
}
//show image of word
function showImage(){
	$("#hangman").empty();
	//use objects for images
	var img = $("<img>");
	img.attr("src","images/" + wordPic);
	img.attr("id","youkaiImg");
	$("#image").html(img);
	$("#youkaiImg").wrap($("<a>",{href: wordUrl, target: "_blank"}));
}

//game over sequence
function gameOver(){
	if (gameFlag) {
		console.log("game over");
		console.log("restart game?")
		replay(); //only process if restart is true
	}	
}

//draws hangman image
function drawHang(){
	$("#image").empty();
	//show image little by little on wrong guesses
	//also change opacity
	var img = $("<img>");
	img.attr("src","images/waraningyo.png");
	img.attr("id","wara");
	$("#hangman").html(img);

	//change opacity and image by 1/(guesses+1)
	$("#hangman").css("opacity",1/(guesses+1));
}