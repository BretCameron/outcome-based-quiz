//DISPLAY THE FIRST QUESTION, ADD QUESTION 1, QUESTION 2, ETC. AS HEADERS

$(".question").each(function (i, val) {
  $(this).addClass("question" + i);
  if (i === 0) {
    $(this).removeClass("display-none");
  }
  if (i < $(".question").length - 1) {
    $(this).prepend(`<h3 class="question-num">Question ${i + 1}</h3>`);
    $(this).append(
      `<br><p class="question-of">Question ${i + 1} of ${$(".question").length -
      1}</p>`
    );
    // $(this).append('<hr>');
  }
});

//CREATE PROGRESS CIRCLES

for (let i = 0; i < $(".question").length - 1; i++) {
  $("#progress").append('<div class="circle"></div>');
}
$(".circle").each(function (i, val) {
  $(this).addClass("circle" + i);
  $(this).attr("circle-num", i);
  if (i === 0) {
    $(this).addClass("filled");
  }
});

$("[circle-num=0]").addClass("white-border");

//TURN PAGE (FUNCTION)

let pageNum = 0,
  furthestPage = 0;
let pageNumHistory = [0];
let enablePageTurn = true;

const turnPage = () => {
  const revealCurrentPage = () => {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    const displayCurrentPage = () => {
      // $('.question').animate({ opacity: 100 }, 0);
      $(".question").each(function (i, val) {
        if (i !== pageNum) {
          $(this).addClass("display-none");
        } else {
          $(this).removeClass("display-none");
        }
      });
    };
    //ANIMATE FADE (DISABLE COMMENT TO ENABLE)
    // $('.question').animate({ opacity: 0 }, 500);
    // setTimeout(displayCurrentPage, 501);
    displayCurrentPage();
    $(".circle").removeClass("white-border");
    $(`[circle-num=${pageNum}]`).addClass("white-border");
  };
  if (enablePageTurn === true) {
    revealCurrentPage();
  }
  pageNumHistory.push(pageNum);
  furthestPage = Math.max(...pageNumHistory);
  // VISUAL CHANGES TO CIRCLES
  for (let j = 0; j < $(".question").length; j++) {
    if (j <= furthestPage) {
      $(".circle" + j).addClass("filled");
      $("#progress-bar").css({
        background: `linear-gradient(
            90deg,
            rgb(255, 0, 0) 0% ${j * 25}%,
            rgb(238, 238, 238) ${j * 25}% 100%
          ) 
          50% 50% / 6em 6em no-repeat`
      });
    } else {
      $(".circle" + j).removeClass("filled");
    }
  }

  //VISUAL CHANGES TO BACK AND FORWARD
  if (pageNum === 0) {
    $("#turn-back").addClass("faded");
  } else {
    $("#turn-back").removeClass("faded");
  }
  if (pageNum === furthestPage) {
    $("#turn-forward").addClass("faded");
  } else {
    $("#turn-forward").removeClass("faded");
  }
};

//TURN PAGE (BUTTONS)

$("#turn-back").click(function () {
  if (pageNum > 0) {
    pageNum--;
    turnPage();
  }
});

$("#turn-forward").click(function () {
  if (pageNum < furthestPage) {
    pageNum++;
    turnPage();
  }
});

$("button")
  .not("#reveal")
  .click(function () {
    if (pageNum < $(".question").length - 1) {
      pageNum++;
      turnPage();
    }
  });

$(".circle").click(function () {
  if ($(this).hasClass("filled")) {
    pageNum = Number($(this).attr("circle-num"));
    // console.log(pageNum);
    turnPage();
  }
});

// RESET AND REVEAL ALL

$("#reset").click(function () {
  location.reload();
  // pageNum = 0;
  // furthestPage = 0;
  // pageNumHistory = [0];
  // turnPage();
  // $('.select').removeClass('select');
  // $('#reveal-text').empty();
});

$("#reveal-all").one("click", function () {
  enablePageTurn = false;
  $("#reveal-all").addClass("display-none");
  $("#progress").addClass("display-none");
  $("#turn-back").addClass("display-none");
  $("#turn-forward").addClass("display-none");
  $(".question.display-none").removeClass("display-none");
  $(".question").each(function (i, val) {
    if (i < $(".question").length - 1) {
      $(this).append("<hr>");
    }
  });
});

//DEFINE OUTCOMES

let outcomes = {
  outcome1: {
    name: 'This will contain the outcome text of "Outcome 1"',
    count: 0
  },
  outcome2: {
    name: 'This will contain the outcome text of "Outcome 2"',
    count: 0
  },
  outcome3: {
    name: 'This will contain the outcome text of "Outcome 3"',
    count: 0
  }
};

//ADD SELECTIONS (ONLY 1 PER QUESTION)

$("button")
  .not("#reveal")
  .click(function () {
    if (!$(this).hasClass("select")) {
      $(this)
        .parent()
        .find("button")
        .each(function () {
          $(this).removeClass("select");
        });
      $(this).addClass("select");
    }
  });

//COUNT UP SELECTED BUTTONS

$("#reveal").click(function () {
  $("#reveal-text").empty();
  let outcomesArray = Object.keys(outcomes);
  //RESET COUNTS TO ZERO
  let scoresArray = [];
  //TALLY UP HOW MANY OF EACH OUTCOME IS SELECTED
  outcomesArray.forEach(function (element) {
    let score = $(".select." + element).length;
    scoresArray.push(score);
  });
  let winner = outcomesArray[scoresArray.indexOf(Math.max(...scoresArray))];

  //IF ALL QUESTIONS ANSWERED, DISPLAY LOADING ANIMATION, THEN RESULT
  if ($(".select").length === $(".question").length - 1) {
    let timeDelay = randomLoadTime(1500, 1500);
    $("#lds-animation")
      .removeClass("lds-off")
      .addClass("lds-on");
    setTimeout(removeLdsAnimation, timeDelay);
    function revealResult() {
      $("#reveal-text").text(outcomes[winner].name);
    }
    setTimeout(revealResult, timeDelay);
    setTimeout(function () {
      if (winner === "outcome1") {
        window.top.location.href = `https://www.designmyfit.com/6-week-program-hypertrophy-g78g8`;
      } else if (winner === "outcome2") {
        window.top.location.href = `https://www.designmyfit.com/6-week-program-strength-jd9e8`;
      } else if (winner === "outcome3") {
        window.top.location.href = `https://www.designmyfit.com/6-week-program-combined-hvt65d`;
      }
    }, timeDelay);
  } else {
    let numQuestions = $(".question").length - 1;
    let numLeft = numQuestions - $(".select").length;
    if (numLeft === 1) {
      $("#reveal-text").prepend(
        `You missed 1 question!<br><br>You must answer all ${numQuestions} questions to reveal your result.`
      );
    } else {
      $("#reveal-text").prepend(
        `You missed ${numLeft} questions!<br><br>You must answer all ${numQuestions} questions to reveal your result.`
      );
    }
  }
});

function removeLdsAnimation() {
  $("#lds-animation")
    .addClass("lds-off")
    .removeClass("lds-on");
}

// RANDOM DELAY FOR LOADING ANIMATION

function randomLoadTime(min, max = 10000, multipleOf = 500) {
  let arrValue = Math.ceil(min / multipleOf) * multipleOf;
  let arrOfNums = [arrValue];
  while (arrValue < max) {
    arrValue += multipleOf;
    arrOfNums.push(arrValue);
  }
  return arrOfNums[Math.floor(Math.random() * arrOfNums.length)];
}

// NAVIGATION MESSAGE

$(".circle").hover(
  function () {
    if ($(this).hasClass("filled")) {
      circleNum = Number($(this).attr("circle-num"));
      if (circleNum < pageNum) {
        $("#progress-text").append(`Go to Question ${circleNum + 1}`);
      } else if (circleNum == pageNum) {
        //$('#progress-text').append(`You're on Question ${circleNum + 1}`);
      } else {
        $("#progress-text").append(`Go to Question ${circleNum + 1}`);
      }
    }
  },
  function () {
    $("#progress-text").html("");
  }
);

// REPORT ON ANSWERS AT SUBMISSION

// Define class "Question" which will record every question and answer
class Question {
  constructor(id, question, answer) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }
  test() {
    console.log(`id ${this.id}`);
    console.log(`question ${this.question}`);
    console.log(`answer ${this.answer}`);
  }
}

// On click of "reveal" button, console log a report of questions and answers. In the future, this could provide data for a database integration, which keeps notes of the survey asnwers.

let questions = [];
let numOfQuestions = $(".question").length;

$("button")
  .not("#reveal")
  .click(function () {
    for (i = 0; i < numOfQuestions - 1; i++) {
      questions[i] = new Question(
        i,
        $(`.question${i} > h1`).text(),
        $(
          `.question${i} > div.flex-buttons > button.select > p.button-text`
        ).text()
      );
    }
    $("#display-results").html(`
  <table id="results-table" width="100%" style="max-width: 536px">

  </table>
  `);
    questions.forEach(el => {
      $("#results-table").append(
        `
    <tr>
      <td><b>${el.question}</b></td>
      <td>${el.answer}</td>
    </tr>
    `
      );
    });
  });
