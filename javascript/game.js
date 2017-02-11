//initializes screen and word pool
function initialize(){
	words =	createList();
	guesses = 7;
	wordLength = 0;
	userGuesses = [" "];
	gameFlag = false;
	sound = createSFX();

	$("#message").html("Guess for your life...").css("display","none").fadeIn(2000);
	$("#numGuesses").html("Guesses Remaining: " + guesses);
	$("#wins").html("Wins: " + wins);
	$("#losses").html("Losses: " + losses);
	$("#currentGuesses").html("<p> Current Guesses: </p>" + userGuesses);

	//assign random word from pool and show as blanks for the length of the word
	targetWord = randomWord(words);
	//guesses = setGuesses(targetWord); possible use for future balance
	blanks(targetWord);
}

//plays audio
function setAudio(path){
	var audio = document.createElement("audio");
	audio.setAttribute("src","sound/" + path);
	audio.play();
}

//creates sound library
function createSFX(){
	return {
		win: "Door4.ogg",
		lose: "creepy.mp3",
		move1: "Move1.ogg",
		move2: "Move2.ogg",
		move3: "Move3.ogg",
		move4: "Move4.ogg",
		move5: "Move5.ogg"
	}
}

//word template
function youkai(name, image){
	return {
	name: name,
	image: name.replace(/\s/g, '') + "." + image,
	url: name.replace(/\s/g, '')
	}
}

//create word list
function createList(){
	var array = [];

	//list of words
	array.push(youkai("kitsune", "jpg"));
	array.push(youkai("yuki onna", "jpg"));
	array.push(youkai("kappa", "jpg"));
	array.push(youkai("oni", "jpg"));
	array.push(youkai("yamata no orochi", "png"));
	array.push(youkai("nue", "jpg"));
	array.push(youkai("shuten doji","jpg"));
	array.push(youkai("akaname","jpg"));
	array.push(youkai("baku","jpg"));
	array.push(youkai("tsuchigumo","jpg"));
	array.push(youkai("enma daiou","png"));
	array.push(youkai("futakuchi onna","jpg"));
	array.push(youkai("hitodama","jpg"));
	array.push(youkai("ibaraki doji","jpg"));
	array.push(youkai("kama itachi","jpg"));
	array.push(youkai("kasha","jpg"));
	array.push(youkai("bakeneko","jpg"));
	array.push(youkai("nekomata","jpg"));
	array.push(youkai("nurikabe","jpg"));
	array.push(youkai("nurarihyon","jpg"));
	array.push(youkai("satori","jpg"));
	array.push(youkai("shiisaa","jpg"));
	array.push(youkai("tanuki","jpg"));
	array.push(youkai("yamabiko","jpg"));

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

		//adds letters to current guesses and fades each letter in as they are entered
		var newSpan = $("<span>");
		var index = guessList.length - 1;
		newSpan.attr("id", "fade" + index);
		newSpan.text(guessList[index].toUpperCase() + " ");
		$("#currentGuesses").append(newSpan);
		$("#fade" + index).css("display","none").fadeIn(1500);

		//if letter is in word, find position and fill blanks
		if (targetWord.includes(guess)) {
			for (var i = 0; i < targetWord.length; i++) {
				if (guess == targetWord.charAt(i)) {
					$("#"+i).html(guess).css("display","none").fadeIn(1500);
					wordLength++;
				}
			}
		}
		//if letter is not in word, decrease guesses
		else {
			guesses--;
			switch (Math.floor(Math.random() * 6)) {
				case 1:
					setAudio(sound.move1);
				break;

				case 2:
					setAudio(sound.move2);
				break;

				case 3:
					setAudio(sound.move3);
				break;

				case 4:
					setAudio(sound.move4);
				break;

				case 5:
					setAudio(sound.move5);
				break;

				default:
				break;
			}

			$("#numGuesses").html("Guesses: " + guesses);
			drawHang();
			showMessage();
		}
	}		
}

/*sets number of guesses; possible use for future balance
function setGuesses(targetWord) {
	return Math.max(5 + Math.floor(targetWord.length / 2), 10);
}*/

//checks win/loss
function checkResult () {
	showMessage();
	if (gameFlag == false){
		if (wordLength == targetWord.length){	
			setAudio(sound.win);
			wins++;
			gameFlag = true;
			$("#wins").html("Wins: " + wins);
			showImage();
		}
		else if (guesses == 0){
			setAudio(sound.lose);
			losses++;
			gameFlag = true;
			$("#losses").html("Losses: " + losses);
		}
	}
}

//resets guesses, game flag, word blanks, target wordm and current guesses
function replay(){
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
	$("#youkaiImg").wrap($("<a>",{href: "http://yokai.com/" + wordUrl, target: "_blank"}));
}

//shows message in message ID
function showMessage(){
	//win message
	if (wordLength == targetWord.length){
		$("#description").html("<b>"+targetWord.charAt(0).toUpperCase() + targetWord.slice(1)+"</b>");
	}
	//lose message
	else if (guesses == 0){
		$("#description").html("<b>Dead Parrot</b>");
	}
	//while guessing
	else if (guesses > 0 && wordLength < targetWord.length) {
		$("#description").html("Footsteps come closer...").css("font-style","italic");
	}
}

//game over sequence
function gameOver(){
	if (gameFlag) {
		replay();
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

	//add link if loss
	if (guesses == 0) {
		$("#wara").wrap($("<a>",{href: "http://yokai.com/waraningyou", target: "_blank"}));
	}

	//change opacity and image by 1/(guesses+1)
	$("#hangman").css("opacity",1/(guesses+1));

}