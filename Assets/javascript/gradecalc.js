$(document).ready(function(){

  // variables for DOM elements
  const sem1Input = $('input#sem1');
  const sem2Input = $('input#sem2');
  const examInput = $('input#exam');
  const submitBtn = $('button.get-grade');
  const clearBtn = $('button.clear');
  const resultEl = $('p.result');
  const noexamCheckEl = $('input#noexam');

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
    console.log("sem grade = ", semesterGrade);
    resultEl.html(`${semesterGrade}`);
  };

  function clearForm() {
  }

  submitBtn.on("click", function() {
    calculateGrade();
  });

  // clearBtn.on("click", function() {
  //   clearForm();
  // })
});