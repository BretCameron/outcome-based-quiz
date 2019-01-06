//DISPLAY THE FIRST QUESTION, ADD QUESTION 1, QUESTION 2, ETC. AS HEADERS

$('.question').each(function (i, val) {
    $(this).addClass('question' + i);
    if (i !== 0) {
        $(this).addClass('display-none');
    };
    if (i < $('.question').length - 1) {
        $(this).prepend(`<h3>Question ${i + 1}</h3>`);
        $(this).append(`<br>Question ${i + 1} of ${$('.question').length - 1}`);
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

const turnPage = () => {
    $('.question').each(function (i, val) {
        if (i !== pageNum) {
            $(this).addClass('display-none');
        } else {
            $(this).removeClass('display-none');
        };
    });

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

$('#reset').click(function () {
    pageNum = 0;
    furthestPage = 0;
    pageNumHistory = [0];
    turnPage();
    $('.select').removeClass('select');
    $('#reveal-text').empty();
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

//DEFINE OUTCOMES

let outcomes = {
    outcome1: { name: 'This will contain the outcome text of "Outcome 1"', count: 0 },
    outcome2: { name: 'This will contain the outcome text of "Outcome 2"', count: 0 },
    outcome3: { name: 'This will contain the outcome text of "Outcome 3"', count: 0 }
};

//ADD SELECTIONS (ONLY 1 PER QUESTION)

$('button').click(function () {
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
    $('#lds-animation').removeClass('lds-off').addClass('lds-on');
    let timeDelay = randomLoadTime(1000, 2000);
    setTimeout(removeLdsAnimation, timeDelay);
    function revealResult() {
        $('#reveal-text').text(outcomes[winner].name);
    };
    setTimeout(revealResult, timeDelay);
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