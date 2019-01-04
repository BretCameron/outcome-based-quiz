let questions = $('.question');

//ONLY DISPLAY THE FIRST QUESTION

$('.question').each(function (i, val) {
    $(this).addClass('question' + i);
    if (i !== 0) {
        $(this).addClass('display-none');
    };
    if (i < $('.question').length - 1) {
        $(this).prepend(`<h3>Question ${i + 1}</h3>`);
    };
});

//SET UP PROGRESS CIRCLES

for (let i = 0; i < $('.question').length - 1; i++) {
    $('#progress').append('<div class="circle"></div>\n');
    $('.circle').each(function (i, val) {
        $(this).addClass('circle' + i);
        if (i === 0) {
            $(this).addClass('filled');
        }
    });

};

//NUMBER OF QUESTIONS ANSWERED

let i = 0;
$('.question' + i).append(`<br>Question ${i + 1} of ${$('.question').length - 1}`).css('font-style', 'italic');

//AFTER EACH ANSWER, SHOW THE NEXT QUESTION

$('button').click(function () {
    if (i < $('.question').length - 1) {
        $('.question' + (i + 1)).removeClass('display-none');
        $('.question' + i).addClass('display-none');
    }
    $('.circle' + (i + 1)).addClass('filled');
    i++;
    if (i <= $('.question').length - 2) {
        $('.question' + i).append(`<br>Question ${i + 1} of ${$('.question').length - 1}`).css('font-style', 'italic');
    }
})

$('#reveal').click(function () {
    $('#reveal-text').text('Coming Soon!');
})

//DEFINE OUTCOMES

let outcomes = {
    outcome1: { name: 'Advanced Programme', count: 0 },
    outcome2: { name: 'Intermediate Programme', count: 0 },
    outcome3: { name: 'Beginner Programme', count: 0 }
};

$('button[class^=outcome]').click(function () {
    let buttonClass = $(this).attr('class');
    outcomes[buttonClass].count += 1;
    console.log(buttonClass + ': ' + outcomes[buttonClass].count);
});