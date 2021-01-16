$(document).ready(function(){

  // variables for DOM elements
  const sem1Input = $('input#sem1');
  const sem2Input = $('input#sem2');
  const examInput = $('input#exam');
  const submitBtn = $('button.get-grade');
  const resultEl = $('p.result');
  const letterGradeEl = $('p.letter-grade');
  const noexamCheckEl = $('input#noexam');

  function getLetterGrade(percentage) {
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
  }

  function calculateGrade() {
    const sem1Grade = parseFloat(sem1Input.val());
    const sem2Grade = parseFloat(sem2Input.val());
    const examGrade = parseFloat(examInput.val());
    const noexam = noexamCheckEl.is(":checked");
    let semesterGrade;

    if (noexam) {
      semesterGrade = ((sem1Grade + sem2Grade) / 2).toFixed(2)
    } else {
      semesterGrade = ((sem1Grade + sem2Grade) * 0.4 + examGrade * 0.2).toFixed(2)
    }
    // Turn the % grade into a letter grade
    const letterGrade = getLetterGrade(semesterGrade)
    // Add the semester grade (% and letter grade) to the DOM
    resultEl.html(`${semesterGrade}%`);
    letterGradeEl.html(`${letterGrade}`);
  };

  submitBtn.on("click", function() {
    calculateGrade();
  });

  // clearBtn.on("click", function() {
  //   clearForm();
  // })
});