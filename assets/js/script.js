var date = $("#date");
var today = moment();

var scheduleCard = $('.schedule-card');
var body = $('body');

date.text(today.format('dddd, MMMM Do'));

var timeArray = [];
var time = 9;

// Retrieves stored array or initializes a new one if blank nothing previously stored
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || ["","","","","","","","","",""];
var buttonText = JSON.parse(localStorage.getItem("buttonText")) || ["","","","","","","","","",""];

// Keep track of which buttons are pushed down
var pushedButtons = JSON.parse(localStorage.getItem("activeButtons")) || [null,null,null,null,null,null,null,null,null,null];

// Create an array for all the work day hours
for(i=0; i<9; i++){
    timeArray[i] = moment(time, "HH").format("hA");
    time++;
}

createSchedule();

var inputArray = $('input');
checkButton();
setTime();


// Past time is gray, present is red, future is green
function checkTime(){
    console.log('it has been a minute');

    for(i=0; i<9; i++){
        var listOfClasses = inputArray[i].classList;

        if((moment().format("H") - moment(timeArray[i], "hA").format("H")) > 0){
            if(listOfClasses.contains('bg-success')){
                listOfClasses.remove('bg-success');
                listOfClasses.add('bg-secondary');
            }
            else if(listOfClasses.contains('bg-danger')){
                listOfClasses.remove('bg-danger');
                listOfClasses.add('bg-secondary');
            }
            else if(!listOfClasses.contains('bg-secondary')){
                listOfClasses.add('bg-secondary');
            }
        }
        else if((moment().format("H") - moment(timeArray[i], "hA").format("H")) < 0){
            if(listOfClasses.contains('bg-secondary')){
                listOfClasses.remove('bg-secondary');
                listOfClasses.add('bg-success');
            }
            else if(listOfClasses.contains('bg-danger')){
                listOfClasses.remove('bg-danger');
                listOfClasses.add('bg-success');
            }
            else if(!listOfClasses.contains('bg-success')){
                listOfClasses.add('bg-success');
            }
        }
        else{
            if(listOfClasses.contains('bg-success')){
                listOfClasses.remove('bg-success');
                listOfClasses.add('bg-danger');
            }
            else if(listOfClasses.contains('bg-secondary')){
                listOfClasses.remove('bg-secondary');
                listOfClasses.add('bg-danger');
            }
            else if(!listOfClasses.contains('bg-danger')){
                listOfClasses.add('bg-danger');
            }
        }
    }
}

// Create a schedule input for each hour of the work day
function createSchedule(){
    for(i=0; i<9; i++){
        var newCard = document.createElement('div');
    
        newCard.innerHTML = "<div class='container w-100 schedule-card'><div class='row w-100'><div class='col-1 border border-left-0 border-dark'>"+ timeArray[i] +"</div><div class='col-9 p-0 m-0' id='input-parent'><input type='text' name='fname' class='w-100 border-0' value='" + savedEvents[i] + "'><br></div><button onclick='clickedButton(this)' class='col-1 bg-info rounded-right ml-1 mb-1' id='button" + i + "'>" + buttonText[i] + "</button></div></div>"
    
        body.append(newCard);
    }
}

// When you click the button it saves your input value
function clickedButton(elem){
    // The index of the button is tied to the end of it's id name
    var index = elem.id[(elem.id.length - 1)];

    // Keep track of what input value needs to be saved even on refresh of webpage
    var saveText;

    // Stores what user typed into variable
    var userInput;

    if(elem.innerText === '' && (elem.parentNode.children[1].children[0].value !== '')){

        // Save which buttons need to keep the text 'saved'
        elem.innerText = 'Saved';
        saveText = elem.innerText;

        // Creates new array with values meant to be saved
        buttonText.splice(index, 1, saveText);
        localStorage.setItem('buttonText', JSON.stringify(buttonText));
            
        userInput = elem.parentNode.children[1].children[0].value;
    
        // Creates new array with values meant to be saved
        savedEvents.splice(index, 1, userInput);
    
        //saves array as string in localstorage
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

        pushedButtons.splice(index, 1, elem);
        localStorage.setItem('activeButtons', JSON.stringify(pushedButtons));
    }
    else if(elem.innerText === 'Saved'){
        // Remove the 'save' text from local storage
        elem.innerText = '';
        saveText = elem.innerText;

        // Creates new array with values meant to be saved
        buttonText.splice(index, 1, saveText);
        localStorage.setItem('buttonText', JSON.stringify(buttonText));

        userInput = '';
    
        // Creates new array with values meant to be saved
        savedEvents.splice(index, 1, userInput);
    
        // Saves array as string in localstorage
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));


        pushedButtons.splice(index, 1, null);
        localStorage.setItem('activeButtons', JSON.stringify(pushedButtons));
    }
}

// Check if save button is pressed when screen loads... if it is pressed and input is empty than unpress the save button
function checkButton(){
    var buttonArray = $('button');

    for(i=0; i<buttonArray.length; i++){
        if((buttonText[i] === 'Saved') && (savedEvents[i] === '')){

            // Remove the 'save' text from local storage
            buttonArray[i].innerText = '';
            saveText = '';

            // Creates new array with values meant to be saved
            buttonText.splice(i, 1, saveText);

            localStorage.setItem('buttonText', JSON.stringify(buttonText));
        }
    }
}

// Every minute check the time and change the input colors accordingly
function setTime(){
    checkTime();

    var timerInterval = setInterval(function(){
        checkTime();
    }, 60000);
}