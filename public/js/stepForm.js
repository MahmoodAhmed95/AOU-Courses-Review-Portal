// step form
let currentStep = 0; // Current tab is set to be the first tab (0)
let stepsForm = document.getElementsByClassName("step-form");
// let theForm = document.getElementsByTagName('form')[0];

showStep(currentStep); // Display the current tab

// This function will display the specified tab of the form
function showStep(stepNumber) {
  stepsForm[stepNumber].style.display = "block";
  // fix the Previous/Next buttons:
  if (stepNumber == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (stepNumber == stepsForm.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // run a function that will display the correct step indicator:
  fixStepIndicator(stepNumber);
}

// This function will figure out which tab to display
function nextPrev(step) {
  // Exit the function if any field in the current tab is invalid:
  if (step == 1 && !validateForm()) {
    return false;
  }
  // Hide the current tab:
  stepsForm[currentStep].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentStep = currentStep + step;
  // if you have reached the end of the form
  if (currentStep >= stepsForm.length) {
    // the form gets submitted:
    theForm.submit();
    return false;
  }
  removeInvalid();
  // Otherwise, display the correct tab:
  showStep(currentStep);
}

// This function deals with validation of the form fields
function validateForm() {
  let valid = true;
  let inputs = stepsForm[currentStep].getElementsByTagName("input");
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
    document.getElementsByClassName("step-dots")[currentStep].className +=
      " finish";
  }
  return valid; // return the valid status
}
function removeInvalid() {
  let inputs = stepsForm[currentStep].getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    // remove "invalid" if valid
    inputs[i].className = inputs[i].className.replace(" invalid", "");
  }
}
// This function removes the "active" class of all steps
function fixStepIndicator(theStep) {
  let stepDot = document.getElementsByClassName("step-dots");
  for (let i = 0; i < stepDot.length; i++) {
    stepDot[i].className = stepDot[i].className.replace(" active", "");
  }
  // add the "active" class on the current step:
  stepDot[theStep].className += " active";
}
