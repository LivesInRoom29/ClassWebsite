$(document).ready(function(){

  // variables for DOM elements
  const quarter1Input = $('input#q1');
  const quarter2Input = $('input#q2');
  const examInput = $('input#exam');
  const submitBtn = $('button#get-grade-btn');
  const resultEl = $('p.result');
  const letterGradeEl = $('p.letter-grade');
  const noexamCheckEl = $('input#noexam');
  const graphContainerEl = $('div#graph-container');

  function validateForm(q1, q2, exam) {
    // return false if:
    // there is an exam grade if "No Exam" was not cheked
    if (!exam && !noexamCheckEl.is(":checked")) {
      alert('You must include an exam grade or check off "Check if no exam" box.');
      return false;
    // the exam grade exists, but it's not between 0 and 100
    } else if (exam && (exam < 0 || exam > 100)) {
      alert('Your exam grade needs to be a number between 0 and 100.');
      return false;
    // q1 and q2 grades are missing
    } else if (!q1 || !q2) {
      alert('You need to input a number grade between 0 and 100 for both quarters.');
      return false;
    // if q1 and q2 grades are not between 0 and 100
    } else if (q1 > 100 || q2 > 100 || q1 < 0 || q2 < 0) {
      alert('Your grades all need to numbers be between 0 and 100.');
      return false;
    // otherwise, return true.
    } else {
      return true;
    }
  };

  // To turn the percentage grade into a letter grade using the SHS handbook
  function getLetterGrade(percentage) {
    // round the grade first and compare that grade to values in the switch statement
    const roundedGrade = Math.round(percentage);
    let letterGrade = "";

    switch(true) {
      case percentage >= 99:
        letterGrade = "A+";
        break;
      case roundedGrade <= 98 && roundedGrade >= 96:
        letterGrade = "A";
        break;
      case roundedGrade <= 95 && roundedGrade >= 93:
        letterGrade = "A-";
        break;
      case roundedGrade <= 92 && roundedGrade >= 91:
        letterGrade = "B+";
        break;
      case roundedGrade <= 90 && roundedGrade >= 88:
        letterGrade = "B";
        break;
      case roundedGrade <= 87 && roundedGrade >= 85:
        letterGrade = "B-";
        break;
      case roundedGrade <= 84 && roundedGrade >= 83:
        letterGrade = "C+";
        break;
      case roundedGrade <= 82 && roundedGrade >= 80:
        letterGrade = "C";
        break;
      case roundedGrade <= 79 && roundedGrade >= 77:
        letterGrade = "C-";
        break;
      case roundedGrade <= 76 && roundedGrade >= 75:
        letterGrade = "D+";
        break;
      case roundedGrade <= 74 && roundedGrade >= 73:
        letterGrade = "D";
        break;
      case roundedGrade <= 72 && roundedGrade >= 70:
        letterGrade = "D-";
        break;
      case roundedGrade < 70:
        letterGrade = "F";
        break;
      default:
        letterGrade = "default";
    }
    return letterGrade;
  };

  function calculateGrade() {
    const q1Grade = parseFloat(quarter1Input.val());
    const q2GRade = parseFloat(quarter2Input.val());
    const examGrade = parseFloat(examInput.val());
    // no exam will be true if the box is checked, otherwise false
    const noexam = noexamCheckEl.is(":checked");
    let semesterGrade;

    const isFormValid = validateForm(q1Grade, q2GRade, examGrade);
    console.log("is form valid? ", isFormValid);

    //only if the form inputs are valid, calculate and display the grade
    if (isFormValid) {
      // To calculate the semester grade:
      // if the box is checked, get the average of the two quarter grades
      // otherwise combine 40% of each semester grade with 20% of the exam grad
      if (noexam) {
        semesterGrade = ((q1Grade + q2GRade) / 2).toFixed(2)
      } else {
        semesterGrade = ((q1Grade + q2GRade) * 0.4 + examGrade * 0.2).toFixed(2)
      }
      // Turn the % grade into a letter grade
      const letterGrade = getLetterGrade(semesterGrade)
      // Add the semester grade (% and letter grade) to the DOM
      resultEl.html(`${semesterGrade}%`);
      letterGradeEl.html(`${letterGrade}`);
    }
  };
  
  // on("submit") and .submit() are still reloading even with event.preventDefault()??
  // The tool tips for the vaildation in html (required) only work using "Submit", not "click"
  // submitBtn.on("submit", function(event) {
  //   event.preventDefault();
  //   //event.isPreventDefault(true);
  //   calculateGrade();
  //   return false;
  // });

  submitBtn.on("click", function(event) {
    event.preventDefault();
    calculateGrade();
  });
});