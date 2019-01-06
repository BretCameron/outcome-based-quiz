//DISPLAY THE FIRST QUESTION, ADD QUESTION 1, QUESTION 2, ETC. AS HEADERS

$('.question').each(function (i, val) {
    $(this).addClass('question' + i);
    if (i !== 0) {
        $(this).addClass('display-none');
    };
    if (i < $('.question').length - 1) {
        $(this).prepend(`<h3>Question ${i + 1}</h3>`);
        $(this).append(`<br>Question ${i + 1} of ${$('.question').length - 1}`);
        // $(this).append('<hr>');
    };
});

//CREATE PROGRESS CIRCLES

for (let i = 0; i < $('.question').length - 1; i++) {
    $('#progress').append('<div class="circle"></div>\n');
    $('.circle').each(function (i, val) {
        $(this).addClass('circle' + i);
        $(this).attr('circle-num', i);
        if (i === 0) {
            $(this).addClass('filled');
        }
    });
};

//TURN PAGE (FUNCTION)

let pageNum = 0, furthestPage = 0;
let pageNumHistory = [0];
let enablePageTurn = true;

const turnPage = () => {
    const revealCurrentPage = () => {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        const displayCurrentPage = () => {
            $('.question').animate({ opacity: 100 }, 0);
            $('.question').each(function (i, val) {
                if (i !== pageNum) {
                    $(this).addClass('display-none');
                } else {
                    $(this).removeClass('display-none');
                };
            });
        };
        //ANIMATE SUBMISSION
        $('.question').animate({ opacity: 0 }, 500);
        setTimeout(displayCurrentPage, 501);
    };
    if (enablePageTurn === true) { revealCurrentPage() };
    pageNumHistory.push(pageNum);
    furthestPage = Math.max(...pageNumHistory);
    // VISUAL CHANGES TO CIRCLES
    for (let j = 0; j < $('.question').length; j++) {
        if (j <= furthestPage) {
            $('.circle' + j).addClass('filled');
        } else {
            $('.circle' + j).removeClass('filled');
        }
    };

    //VISUAL CHANGES TO BACK AND FORWARD
    if (pageNum === 0) {
        $('#turn-back').addClass('faded');
    } else {
        $('#turn-back').removeClass('faded');
    };
    if (pageNum === furthestPage) {
        $('#turn-forward').addClass('faded');
    } else {
        $('#turn-forward').removeClass('faded');
    };
};

//TURN PAGE (BUTTONS)

$('#turn-back').click(function () {
    if (pageNum > 0) {
        pageNum--;
        turnPage();
    }
});

$('#turn-forward').click(function () {
    if (pageNum < furthestPage) {
        pageNum++;
        turnPage();
    };
});

$('button').not('#reveal').click(function () {
    if (pageNum < $('.question').length - 1) {
        pageNum++;
        turnPage();
    };
});

$('.circle').click(function () {
    if ($(this).hasClass('filled')) {
        pageNum = Number($(this).attr('circle-num'));
        console.log(pageNum);
        turnPage();
    };
});

// RESET AND REVEAL ALL

$('#reset').click(function () {
    location.reload();
    // pageNum = 0;
    // furthestPage = 0;
    // pageNumHistory = [0];
    // turnPage();
    // $('.select').removeClass('select');
    // $('#reveal-text').empty();
});

$('#reveal-all').one('click', function () {
    enablePageTurn = false;
    $('#reveal-all').addClass('display-none');
    $('#progress').addClass('display-none');
    $('#turn-back').addClass('display-none');
    $('#turn-forward').addClass('display-none');
    $('.question.display-none').removeClass('display-none');
    $('.question').each(function (i, val) {
        if (i < $('.question').length - 1) {
            $(this).append('<hr>');
        };
    });
});

//DEFINE OUTCOMES

let outcomes = {
    outcome1: { name: 'This will contain the outcome text of "Outcome 1"', count: 0 },
    outcome2: { name: 'This will contain the outcome text of "Outcome 2"', count: 0 },
    outcome3: { name: 'This will contain the outcome text of "Outcome 3"', count: 0 }
};

//ADD SELECTIONS (ONLY 1 PER QUESTION)

$('button').not('#reveal').click(function () {
    if (!$(this).hasClass('select')) {
        $(this).parent().find('button').each(function () {
            $(this).removeClass('select');
        })
        $(this).addClass('select');
    };
});

//COUNT UP SELECTED BUTTONS

$('#reveal').click(function () {
    $('#reveal-text').empty();
    let outcomesArray = Object.keys(outcomes);
    //RESET COUNTS TO ZERO
    let scoresArray = [];
    //TALLY UP HOW MANY OF EACH OUTCOME IS SELECTED
    outcomesArray.forEach(function (element) {
        let score = $('.select.' + element).length;
        scoresArray.push(score);
    });
    let winner = (outcomesArray[scoresArray.indexOf(Math.max(...scoresArray))]);

    //IF ALL QUESTIONS ANSWERED, DISPLAY LOADING ANIMATION, THEN RESULT
    if (($('.select').length) === ($('.question').length - 1)) {
        let timeDelay = randomLoadTime(1500, 2500);
        $('#lds-animation').removeClass('lds-off').addClass('lds-on');
        setTimeout(removeLdsAnimation, timeDelay);
        function revealResult() {
            $('#reveal-text').text(outcomes[winner].name);
        };
        setTimeout(revealResult, timeDelay);
    } else {
        let numQuestions = $('.question').length - 1;
        let numLeft = numQuestions - ($('.select').length);
        if (numLeft === 1) {
            $('#reveal-text').prepend(`You missed 1 question!<br><br>You must answer all ${numQuestions} questions to reveal your result.`);
        } else {
            $('#reveal-text').prepend(`You missed ${numLeft} questions!<br><br>You must answer all ${numQuestions} questions to reveal your result.`);
        }
    }
});

function removeLdsAnimation() {
    $('#lds-animation').addClass('lds-off').removeClass('lds-on');
}

// RANDOM DELAY FOR LOADING ANIMATION

function randomLoadTime(min, max = 10000, multipleOf = 500) {
    let arrValue = Math.ceil(min / multipleOf) * multipleOf
    let arrOfNums = [arrValue];
    while (arrValue < max) {
        arrValue += multipleOf;
        arrOfNums.push(arrValue);
    }
    return arrOfNums[Math.floor(Math.random() * arrOfNums.length)];
}