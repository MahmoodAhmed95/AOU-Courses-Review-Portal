// step form 3
let currentStepThree = 0; // Current tab is set to be the first tab (0)
let stepsFormThree = document.getElementsByClassName("step-form-three");
// let theFormThree = document.getElementsByTagName('form')[2];

showStepThree(currentStepThree); // Display the current tab

// This function will display the specified tab of the form
function showStepThree(stepNumber) {
  stepsFormThree[stepNumber].style.display = "block";
  // fix the Previous/Next buttons:

  if (stepNumber == 0) {
    document.getElementById("prevBtnThree").style.display = "none";
  } else {
    document.getElementById("prevBtnThree").style.display = "inline";
  }
  if (stepNumber == stepsFormThree.length - 1) {
    document.getElementById("nextBtnThree").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtnThree").innerHTML = "Next";
  }
  // run a function that will display the correct step indicator:
  fixStepIndicatorThree(stepNumber);
}

// This function will figure out which tab to display
function nextPrevThree(step) {
  // Exit the function if any field in the current tab is invalid:
  if (step == 1 && !validateFormThree()) {
    return false;
  }
  // Hide the current tab:
  stepsFormThree[currentStepThree].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentStepThree = currentStepThree + step;
  // if you have reached the end of the form
  if (currentStepThree >= stepsFormThree.length) {
    // the form gets submitted:
    theFormThree.submit();
    return false;
  }
  removeInvalidThree();
  // Otherwise, display the correct tab:
  showStepThree(currentStepThree);
}

// This function deals with validation of the form fields
function validateFormThree() {
  let valid = true;
  let inputs = stepsFormThree[currentStepThree].getElementsByTagName("input");
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
    document.getElementsByClassName("step-dots-three")[
      currentStepThree
    ].className += " finish";
  }
  return valid; // return the valid status
}
function removeInvalidThree() {
  let inputs = stepsFormThree[currentStepThree].getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    // remove "invalid" if valid
    inputs[i].className = inputs[i].className.replace(" invalid", "");
  }
}
// This function removes the "active" class of all steps
function fixStepIndicatorThree(theStep) {
  let stepDot = document.getElementsByClassName("step-dots-three");
  for (let i = 0; i < stepDot.length; i++) {
    stepDot[i].className = stepDot[i].className.replace(" active", "");
  }
  // add the "active" class on the current step:
  stepDot[theStep].className += " active";
}
