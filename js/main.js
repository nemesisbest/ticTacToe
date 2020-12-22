document.addEventListener("DOMContentLoaded", function(event) { 
    event.preventDefault();

    const board = document.getElementById('game_board');
    const pin = document.querySelectorAll('.field_pin');
    const congrat = document.querySelector('.winner_text'); 
    const restartBtn = document.querySelector('#restart');
    const score = document.querySelectorAll('.score');
    const changeNameBtn = document.querySelector('.name');
    const name = document.querySelectorAll('.user_score>text');
    

    let counter = 0;
    let temporary = [0,0];

    var currentPlayer = 1;
    var countOfWin = 0;
    var winPointsFirstPlayer = 0;
    var winPointsSecondPlayer = 0;
    var z = 0;
    var j = 0;
    
    const horizontal=[[0,1,2],
                      [3,4,5],
                      [6,7,8]]; 

    const vertical=[[0,3,6],
                    [1,4,7],
                    [2,5,8]];

    const diagonal=[[0,4,8]
                   ,[2,4,6]];   

    const names = [];
    var flag = true;
    var renamed = false;
    
    pin.forEach(function(element,i){
        element.addEventListener('click', function(){
            element.classList.add('clicked');
            counter<9?counter++:flag=false;

            const driver = function(content,playerNumber,dimension,winpointsType,rowsCount){
                for(z=0;z<rowsCount;z++){
                    for(j=0;j<3;j++){
                        if(pin[dimension[z][j]].textContent == content){
                           currentPlayer = playerNumber;
                           winpointsType++;
                           if(winpointsType == 3){
                            countOfWin++;
                            currentPlayer==1?temporary[0] +=countOfWin:temporary[1] +=countOfWin;
                            countOfWin=0;
                            currentPlayer==1?score[currentPlayer-1].textContent = temporary[0]:score[currentPlayer-1].textContent = temporary[1];
                            board.classList.add('winner');
                            congrat.classList.remove('unvisible');
                            restartBtn.classList.remove('unvisible');
                            renamed==false?congrat.textContent = `Player ${currentPlayer} Won`:congrat.textContent = `${names[currentPlayer-1]} Won`; 
                           }
                           if(counter==9){
                            restartBtn.classList.remove('unvisible');
                           }
                        }
                    }
                    winpointsType = 0; 
                }
            };

            const globalFunc = function(){
                if(counter%2 != 0 && flag == true){
                    pin[i].textContent = "X";
                    driver('X',1,horizontal,winPointsFirstPlayer,3);
                    driver('X',1,vertical,winPointsFirstPlayer,3);
                    driver('X',1,diagonal,winPointsFirstPlayer,2);            
                }
                else if(counter%2 == 0 && flag == true){
                    pin[i].textContent = "O";
                    driver('O',2,horizontal,winPointsSecondPlayer,3);
                    driver('O',2,vertical,winPointsSecondPlayer,3);
                    driver('O',2,diagonal,winPointsSecondPlayer,2);
                }
            };
            globalFunc();

        })
    });
    restartBtn.addEventListener('click', function(){
        counter = 0;
        board.classList.remove('winner');
        congrat.classList.add('unvisible');
        restartBtn.classList.add('unvisible');
        pin.forEach(function(el){
            el.textContent = "?";
            el.classList.remove('clicked');
        });
    });
    changeNameBtn.addEventListener('click', function(){
        renamed = true;
        for(let x =0; x < 2; x++){
            names[x] = prompt(`Enter ${x==0?'FIRST':'SECOND'} player NAME`);
            name[x].textContent = names[x] + ' ';
        }
      
    });
});


// Copyright by Vlas Oleksyn
// Developed on 22.12.2020

