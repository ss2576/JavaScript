'use strict';
    let temporaryFigure = "";
    let whoInTheCage = "";
    let ucodeFigure = "";
    let ucodeFigureInTheCage = "";
    let whiteFigure = [
                    '&#9817',
                    '&#9815',
                    '&#9816',
                    '&#9814',
                    '&#9813',
                    '&#9812'];
        
        /**
         *  Контейнер игры. 
         */
        let chess = {
            gameContainerEl: document.getElementById('game'),
            figures: [
                {name: 'p', color: 'w', pos: 'A2'},
                {name: 'p', color: 'w', pos: 'B2'},
                {name: 'p', color: 'w', pos: 'C2'},
                {name: 'p', color: 'w', pos: 'D2'},
                {name: 'p', color: 'w', pos: 'E2'},
                {name: 'p', color: 'w', pos: 'F2'},
                {name: 'p', color: 'w', pos: 'G2'},
                {name: 'p', color: 'w', pos: 'H2'},
                {name: 'R', color: 'w', pos: 'A1'},
                {name: 'N', color: 'w', pos: 'B1'},
                {name: 'B', color: 'w', pos: 'C1'},
                {name: 'Q', color: 'w', pos: 'D1'},
                {name: 'K', color: 'w', pos: 'E1'},
                {name: 'B', color: 'w', pos: 'F1'},
                {name: 'N', color: 'w', pos: 'G1'},
                {name: 'R', color: 'w', pos: 'H1'},

                {name: 'p', color: 'b', pos: 'A7'},
                {name: 'p', color: 'b', pos: 'B7'},
                {name: 'p', color: 'b', pos: 'C7'},
                {name: 'p', color: 'b', pos: 'D7'},
                {name: 'p', color: 'b', pos: 'E7'},
                {name: 'p', color: 'b', pos: 'F7'},
                {name: 'p', color: 'b', pos: 'G7'},
                {name: 'p', color: 'b', pos: 'H7'},
                {name: 'R', color: 'b', pos: 'A8'},
                {name: 'N', color: 'b', pos: 'B8'},
                {name: 'B', color: 'b', pos: 'C8'},
                {name: 'Q', color: 'b', pos: 'D8'},
                {name: 'K', color: 'b', pos: 'E8'},
                {name: 'B', color: 'b', pos: 'F8'},
                {name: 'N', color: 'b', pos: 'G8'},
                {name: 'R', color: 'b', pos: 'H8'},
            ],
            //Фигуры шахмат в Юникоде./
            figureHtml: {
                pw: '&#9817;',
                Bw: '&#9815;',
                Nw: '&#9816;',
                Rw: '&#9814;',
                Qw: '&#9813;',
                Kw: '&#9812;',

                pb: '&#9823;',
                Bb: '&#9821;',
                Nb: '&#9822;',
                Rb: '&#9820;',
                Qb: '&#9819;',
                Kb: '&#9818;',
            },

            /**
             * отображения игрового поля.
             */
            renderMap() {
                const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0];
                const cols = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 0];
                

                for (let row = 0; row < rows.length; row++) {
                    const tr = document.createElement('tr');
                    this.gameContainerEl.appendChild(tr);
                    tr.className = "tr_tr";

                    for (let col = 0; col < cols.length; col++) {
                        const td = document.createElement('td');
                        tr.appendChild(td);
                        td.className = "td_td";
                        

                        td.dataset.row = rows[row];
                        td.dataset.col = cols[col];

                        if (rows[row] === 0 && cols[col] !== 0) {
                            td.innerHTML = cols[col];
                        } else if (cols[col] === 0 && rows[row] !== 0) {
                            td.innerHTML = rows[row];
                        }

                        if (this.isCellIsBlack(row, col)) {
                            td.style.backgroundColor = 'grey';
                        }
                    }
                }
 
                let clickTd = document.querySelectorAll('.td_td');
                for (let i = 0; i < clickTd.length; i++) {
                    if (clickTd[i].dataset.col !=0 && clickTd[i].dataset.row !=0) {
                            clickTd[i].addEventListener('click', function(element){
                                temporaryFigure = element.target.innerText;
                                chess.moveChessPiece(element);
                            })
                    }
                }
            },

            /**
             * Определяет является ли ячейка черной.
             * @param {int} rowNum Номер в строке.
             * @param {int} colNum Номер в колонке.
             * @returns {boolean} true, если ячейка должна быть черной, иначе false.
             */
            isCellIsBlack(rowNum, colNum) {
                if (rowNum === 0 || rowNum === 9 || colNum === 0 || colNum === 9) {
                    return false;
                }
                return (rowNum % 2 + colNum % 2) === 1;
            },

            //Отображение фигур на поле.
            renderFigures() {
                for (const figure of this.figures) {
                    const col = figure.pos.charAt(0);
                    const row = figure.pos.charAt(1);

                    document.querySelector(`[data-col='${col}'][data-row='${row}']`).innerHTML =
                        this.figureHtml[figure.name + figure.color];
                }
            }, 
            /* удаляем по клику фигуру из td-элемента и создаём p-лемент
               со свойствами и помещаем в него фигуру */
            moveChessPiece(element){ 
                let piece = document.createElement('p');
                document.body.appendChild(piece);
                piece.className = "p_p";
                piece.innerText =  temporaryFigure;
                element.target.innerText = "" ;
                piece.style.zIndex = 1000; // над другими элементами
                piece.style.position = 'absolute';   
                let coords = getCoords(element);
                let shiftX = element.pageX - coords.left;
                let shiftY = element.pageY - coords.top;
                ucodeFigure = '&#'+temporaryFigure.charCodeAt();
                
                if (whiteFigure.indexOf(ucodeFigure) !== -1){
                    ucodeFigure = "white";
                }else{
                    ucodeFigure = "black";
                } 
                moveAt(element);

                piece.onmousemove = function(element) {
                    moveAt(element);
                };

                function moveAt(element) {
                    piece.style.left = element.pageX - shiftX  - 5 + 'px';
                    piece.style.top = element.pageY - shiftY - 45 + 'px';
                }

                piece.onmousedown = function() {
                    let delPiece = document.querySelector('.p_p');
                    delPiece.remove();
                    chess.inChessPiece(element);
                    piece.onmousemove = null;
                    piece.onmousedown = null;
                };

                function getCoords(element) { 
                    let box = element.target.getBoundingClientRect();
                    return {
                        top: box.top + pageYOffset,
                        left: box.left + pageXOffset
                    };
                }

            },

            /*вставляем в td-элемент фигуру из p-элемента,если фигура 
              в td-элементе другого цыета или td-элемент не содержит фигуры,иначе ход запрещён*/
            inChessPiece(element){
                let clickTd = document.querySelectorAll('.td_td');
                for (let i = 0; i < clickTd.length; i++) {
                    if (clickTd[i].dataset.col !=0 && clickTd[i].dataset.row !=0) {
                        clickTd[i].addEventListener('mouseup', function(elem){
                            whoInTheCage = elem.target.innerText;
                            ucodeFigureInTheCage = '&#'+whoInTheCage.charCodeAt();
                            if (whiteFigure.indexOf(ucodeFigureInTheCage) !== -1){
                                ucodeFigureInTheCage = "white";
                            }
                            if (whoInTheCage == ""){
                                ucodeFigureInTheCage = 0;
                            }else{
                                ucodeFigureInTheCage = "black";
                            }

                            if (ucodeFigure == ucodeFigureInTheCage) {
                                alert("Такой ход запрещён!Вы рубите свои фигуры!");
                                element.target.innerText = temporaryFigure;
                            }
                            else{
                                elem.target.innerText = temporaryFigure;
                                alert("вставка сработала");
                            }
                        })
                    }
                }
                /* НЕ РАБОТАЕТ!!!!
                   удаляем слушателя события "mouseup"
                   но при нажатие на клетку не срабатывет "click",
                   а рсабатывает "mouseup" */
                for (let i = 0; i < clickTd.length; i++) {
                    if (clickTd[i].dataset.col !=0 && clickTd[i].dataset.row !=0){
                        clickTd[i].removeEventListener('mouseup',function(){

                        });
                    }
                } 
                    
            },
        };

        // Запуск отображения карты.
        chess.renderMap();
        chess.renderFigures();
