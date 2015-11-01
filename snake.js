$(document).ready(function () {
    var i;
    for (i = 0; i < 1600; i++) {
        $('<div class="square"> </div>').appendTo('.grid');
    }

    
    $('#reset').click(function(){
        $('.square').removeClass('touched').addClass('square');
    });
});