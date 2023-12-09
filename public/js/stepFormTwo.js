// step form 2
let currentStepTwo = 0; // Current tab is set to be the first tab (0)
let stepsFormTwo = document.getElementsByClassName("step-form-two");
// let theFormTwo = document.getElementsByTagName('form')[1];

showStepTwo(currentStepTwo); // Display the current tab

// This function will display the specified tab of the form
function showStepTwo(stepNumber) {
  stepsFormTwo[stepNumber].style.display = "block";
  // fix the Previous/Next buttons:

  if (stepNumber == 0) {
    document.getElementById("prevBtnTwo").style.display = "none";
  } else {
    document.getElementById("prevBtnTwo").style.display = "inline";
  }
  if (stepNumber == stepsFormTwo.length - 1) {
    document.getElementById("nextBtnTwo").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtnTwo").innerHTML = "Next";
  }
  // run a function that will display the correct step indicator:
  fixStepIndicatorTwo(stepNumber);
}

// This function will figure out which tab to display
function nextPrevTwo(step) {
  // Exit the function if any field in the current tab is invalid:
  if (step == 1 && !validateFormTwo()) {
    return false;
  }
  // Hide the current tab:
  stepsFormTwo[currentStepTwo].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentStepTwo = currentStepTwo + step;
  // if you have reached the end of the form
  if (currentStepTwo >= stepsFormTwo.length) {
    // the form gets submitted:
    theFormTwo.submit();
    return false;
  }
  removeInvalidTwo();
  // Otherwise, display the correct tab:
  showStepTwo(currentStepTwo);
}

// This function deals with validation of the form fields
function validateFormTwo() {
  let valid = true;
  let inputs = stepsFormTwo[currentStepTwo].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  //!---------------------------------------------------
  // for (let i = 0; i < inputs.length; i++) {
  //     // If a field is empty...
  //     if (inputs[i].value == "") {
  //         // add an "invalid" class to the field
  //         inputs[i].className += " invalid";
  //         // and set the current valid status to false
  //         valid = false;
  //     }
  // }
  // If the valid status is true, mark the step as finished and valid
  if (valid) {
    document.getElementsByClassName("step-dots-two")[
      currentStepTwo
    ].className += " finish";
  }
  return valid; // return the valid status
}
function removeInvalidTwo() {
  let inputs = stepsFormTwo[currentStepTwo].getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    // remove "invalid" if valid
    inputs[i].className = inputs[i].className.replace(" invalid", "");
  }
}
// This function removes the "active" class of all steps
function fixStepIndicatorTwo(theStep) {
  let stepDot = document.getElementsByClassName("step-dots-two");
  for (let i = 0; i < stepDot.length; i++) {
    stepDot[i].className = stepDot[i].className.replace(" active", "");
  }
  // add the "active" class on the current step:
  stepDot[theStep].className += " active";
}
