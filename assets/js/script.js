var date = $("#date");
var today = moment();

var scheduleCard = $('.schedule-card');
var body = $('body');

date.text(today.format('dddd, MMMM Do'));

var timeArray = [];
var time = 9;

var colorArray = [];

// Retrieves stored array or initializes a new one if blank nothing previously stored
var savedEvents = JSON.parse(localStorage.getItem("savedEvents")) || ["","","","","","","","","",""];
var buttonText = JSON.parse(localStorage.getItem("buttonText")) || ["","","","","","","","","",""];

checkTime();
createSchedule();

console.log(buttonText);

// Past time is gray, present is red, future is green
function checkTime(){
    // Create an array for all the work day hours
    for(i=0; i<9; i++){
        timeArray[i] = moment(time, "HH").format("hA");
        time++;
    }

    for(i=0; i<9; i++){
        if((moment().format("H") - moment(timeArray[i], "hA").format("H")) > 0){
            colorArray[i] = "bg-secondary"
        }
        else if((moment("13", "H").format("H") - moment(timeArray[i], "hA").format("H")) < 0){
            colorArray[i] = "bg-success"
        }
        else{
            colorArray[i] = "bg-danger"
        }
    }
}

// Create a schedule input for each hour of the work day
function createSchedule(){
    for(i=0; i<9; i++){
        var newCard = document.createElement('div');
    
        newCard.innerHTML = "<div class='container w-100 schedule-card'><div class='row w-100'><div class='col-1 border border-left-0 border-dark'>"+ timeArray[i] +"</div><div class='col-9 p-0 m-0' id='input-parent'><input type='text' name='fname' class='w-100 " + colorArray[i] +" border-0' value='" + savedEvents[i] + "'><br></div><button onclick='clickedButton(this)' class='col-1 bg-info rounded-right ml-1 mb-1' id='button" + i + "'>" + buttonText[i] + "</button></div></div>"
    
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

    if(elem.innerText === ''){

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
    }
    else{
        // Remove the 'save' text from local storage
        elem.innerText = '';
        saveText = elem.innerText;

        // Creates new array with values meant to be saved
        buttonText.splice(index, 1, saveText);
        localStorage.setItem('buttonText', JSON.stringify(buttonText));

        userInput = '';
    
        // Creates new array with values meant to be saved
        savedEvents.splice(index, 1, userInput);
    
        //saves array as string in localstorage
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }  
}

// Load all the locally saved values and place them into input
function renderSavedEvents() {
    for (var i = 0; i<savedEvents.length; i++) {
        var event = savedEvents[i];
        console.log(event)

        //sets value to what is saved in local storage
        $('.container').children().eq(i).children('input').attr('value', event)
    }
}
