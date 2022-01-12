var date = $("#date");
var today = moment();

var scheduleCard = $('.schedule-card');
var body = $('body');

date.text(today.format('dddd, MMMM Do'));

var timeArray = [];
var time = 9;

var inputArray = [];
var colorArray = [];
// Local stored inputs
var inputArray = [];

console.log(inputArray);

// Create an array for all the work day hours
for(i=0; i<9; i++){
    timeArray[i] = moment(time, "HH").format("hA");
    time++;
}

// Past time is gray, present is red, future is green
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

// Create a schedule input for each hour of the work day
for(i=0; i<9; i++){
    var newCard = document.createElement('div');

    newCard.innerHTML = "<div class='container w-100 schedule-card'><div class='row w-100'><div class='col-1 border border-left-0 border-dark'>"+ timeArray[i] +"</div><div class='col-9 p-0 m-0' id='input-parent'><input type='text' name='fname' class='w-100 " + colorArray[i] +" border-0' value='" + inputArray[i] + "'><br></div><button onclick='clickedButton(this)' class='col-1 bg-info rounded-right ml-1 mb-1' id='button" + i + "'></button></div></div>"

    inputArray[i] = newCard;

    body.append(newCard);
}

function clickedButton(elem){
    if(elem.innerText === ''){
        elem.innerText = 'Saved';

        newItem = localStorage.setItem('inputValue', elem.parentNode.children[1].children[0].value)

        // Save the current input value into local storage and add it into an array
        inputArray[elem.id[(elem.id.length - 1)]] = newItem;
    }
    else{
        elem.innerText = '';

        // Remove input value from array of local storage
        inputArray[elem.id[(elem.id.length - 1)]] = '';
    }
}
