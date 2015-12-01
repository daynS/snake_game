var grid = [];
var speed = 250;
var game;

var snake = {
    headPos: [15,15],
    bodyPos: [[]],
    dir: "r",
    size: 0
}

var food = {
    pos: []
}


$(document).ready(function () {
    $('#start').click(function(){
        initialize();
        refresh_grid();
    });    
});

var update_score = function(){
    $( "#score-num" ).fadeOut(1000, function(){
        $( "#score-num" ).empty().append("<div>"+snake.size+"</div>").fadeIn();
    });
}

var refresh_grid = function(){
    game = function(){
        turn();
        var time1 = setTimeout(play, speed);
        var time2 = setTimeout(game, speed);
        update_score();
    }
    game();
}

var play = function(){
    if(food.pos[0] == null) {
        place_food();
    }else{
        find_food();
    }
    move();
}

var move = function(){
    var x = snake.headPos[0];
    var y = snake.headPos[1];

    if(snake.size >= 1){
        draw_body(x,y);
    }

    $('.grid').find('.'+x+'-'+y).removeClass('head');
    switch (snake.dir){
        case 'd':
        snake.headPos[0] += 1;
        break;
        case 'u':
        snake.headPos[0] -= 1;
        break;
        case 'l':
        snake.headPos[1] -= 1;
        break;
        case 'r':
        snake.headPos[1] += 1;
        break;
    }
    x = snake.headPos[0];
    y = snake.headPos[1];

    draw_head();
    check_if_dead();
}

var draw_head = function(){
  var x = snake.headPos[0];
  var y = snake.headPos[1];
  $('.grid').find('.'+x+'-'+y).addClass('head');
}

var draw_body = function(x,y){
    //Not adding to the array or drawing correctly.

    snake.bodyPos.unshift([x,y]);
    if(snake.size < snake.bodyPos.length){
        var oldTailx = snake.bodyPos[snake.bodyPos.length-1][0];
        var oldTaily = snake.bodyPos[snake.bodyPos.length-1][1];
        $('.grid').find('.'+oldTailx+'-'+oldTaily).removeClass('snake');
        snake.bodyPos.pop();
    }
    
    //snake.bodyPos[0][0] = x;
    //snake.bodyPos[0][1] = y;
    $('.grid').find('.'+snake.bodyPos[0][0]+'-'+snake.bodyPos[0][1]).addClass('snake');
    
}

var find_food = function(){
    if(snake.headPos[0] == food.pos[0] && snake.headPos[1] == food.pos[1]){
        devour();
    }
}

var devour = function(){
    x = food.pos[0];
    y = food.pos[1];
    $('.grid').find('.'+x+'-'+y).removeClass('food');

    speed -= 15;

    food.pos[0] = null;
    food.pos[1] = null;
    snake.size += 1;
}

var place_food = function(){
    var x = snake.headPos[0];
    var y = snake.headPos[1];
    while (x == snake.headPos[0] && y == snake.headPos[1]){
        x = Math.floor((Math.random() * 29) + 1);
        y = Math.floor((Math.random() * 29) + 1);
    }

    food.pos[0] = x;
    food.pos[1] = y;
    draw_food(x, y);
}

var draw_food = function(x, y){
  $('.grid').find('.'+x+'-'+y).addClass('food');
}

var check_if_dead = function(){
    var x = snake.headPos[0];
    var y = snake.headPos[1];

    if(x < 0 || x > 29){
        you_dead();   
    }
    if(y < 0 || y > 29){
        you_dead();
    }
    snake.bodyPos.forEach(function(body_piece) {
        if (x == body_piece[0] && y == body_piece[1]){
            you_dead();
        }
    });
}

var you_dead = function(){
    $('.grid').empty();
    $('#game-area').append('<h3 class="game-over">You died</h3>').
                    append('<p class="game-over">Final Score: '+snake.size+'</p>');
    speed = 25000000000000;
}

var initialize = function(){
    $('.game-over').text("");
    $('.grid').empty();
    //$('#score').empty();
    $('#score-num').text("0");
    grid = [];
    speed = 250;
    snake = {
        headPos: [15,15],
        bodyPos: [[]],
        dir: "r",
        size: 0
    }
    food = {
        pos: []
    }

    for(var i = 0; i < 30; i++){
        grid[i] = [];
        for(var j = 0; j < 30; j++){
            grid[i][j] = " ";
        }
    }
    render_grid();
}

var render_grid = function(){
    for(var i = 0; i < grid.length; i++){
        $('.grid').append('<div class="row"></div>');
        for(var j = 0; j < grid[i].length; j++){
                $('.row:last-child').append('<div class="square ' + i + '-' + j + '">'+ grid[i][j] +'</div>')
        }
    }
    $('.grid').show();
}

var turn = function(){
    $(document).keydown(function(e) {
        if(e.keyCode == 39){
            snake.dir = "r"
        }else if(e.keyCode == 37){
            snake.dir = "l"
        }else if(e.keyCode == 38){
            snake.dir = "u"
        }else if(e.keyCode == 40){
            snake.dir = "d"
        }
    });  
}