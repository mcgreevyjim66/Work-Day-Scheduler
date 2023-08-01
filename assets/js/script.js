var containerLgEl = $(".container-lg");
var currentDay = dayjs().format("dddd, D MMM YYYY");
var currentTime = parseInt(dayjs().format("HH"), 10);



var workHourObj0 = {
  hour: "0",
  workText: ""

}
var workHourObj1 = {
  hour: "1",
  workText: ""

}
var workHourObj2 = {
  hour: "2",
  workText: ""

}
var workHourObj3 = {
  hour: "3",
  workText: ""

}
var workHourObj4 = {
  hour: "4",
  workText: ""

}
var workHourObj5 = {
  hour: "5",
  workText: ""

}
var workHourObj6 = {
  hour: "6",
  workText: ""

}
var workHourObj7 = {
  hour: "7",
  workText: ""

}
var workHourObj8 = {
  hour: "8",
  workText: ""

}
var arrayOfTasks = [workHourObj0, workHourObj1, workHourObj2, workHourObj3, workHourObj4, workHourObj5, workHourObj6, workHourObj7, workHourObj8];



// initialize screen with any saved tasks and color coded task rows
function init(){

    // TODO: Add code to display the current date in the header of the page.

    $("#currentDay").text(currentDay);
     // get any stored tasks
    var storedTasks = JSON.parse(localStorage.getItem("arrayoftasks"));

    // If were retrieved from localStorage, update the array to it, else initialize local storage
    if (storedTasks !== null) {
        arrayOfTasks = storedTasks;
    } else {
        localStorage.setItem("arrayoftasks", JSON.stringify(arrayOfTasks));
      }
    // update attributes of the time block divs
    setRowAttr();

}
function setRowAttr(){

  //for each object in the array of tasks, update the corresponding div in thr html
  for (i = 0; i <= arrayOfTasks.length - 1; i++){

    //concatenate the element id's for the text-area and time-block parent 
    var textArea = "#text-area-" + arrayOfTasks[i].hour;
     var rowDivEl = "#hour-" + arrayOfTasks[i].hour;

     // set text area of row to the text entered in that row by the user
     $(textArea).val(arrayOfTasks[i].workText);
     // add the proper color to the time block based on current time
    if ((parseInt(arrayOfTasks[i].hour) + 9) < currentTime) {

      $(rowDivEl).attr("class", "row time-block past");
      
    }else if ((parseInt(arrayOfTasks[i].hour) + 9) === currentTime){

      $(rowDivEl).attr("class", "row time-block present");

    } else {

      $(rowDivEl).attr("class", "row time-block future");
    } 

    } 
    //save updated arrayOfTasks to local storage
    localStorage.setItem("arrayoftasks", JSON.stringify(arrayOfTasks));

}

 
function handleSaveItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var timeClicked = $(event.target).attr("data-btn");
  //console.log(timeClicked)
  //retreive any data entered in row to the var
  var textAreaDesc = $("#" + timeClicked).find(".description").val();
 
  var match = timeClicked.match(/(\d+)$/);
  if (match) {
    const trailingNumber = parseInt(match[1]);
    console.log(trailingNumber); // Output: 0
    arrayOfTasks[trailingNumber].workText = textAreaDesc;
  } else {
    console.log("No trailing number found.");
  }

  //console.log(arrayOfTasks)
 // console.log(textAreaDesc);

 // update attributes of the time block divs
  setRowAttr();
}

// use event delegation on the `container` to listen for click on any element with a class of `.saveBtn`
containerLgEl.on('click', '.saveBtn', handleSaveItem);
//initialize screen to display any locally save tasks
init();


