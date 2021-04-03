import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {GameBoardInfo} from './game-board-info';
import {SquareInfo} from '../square/square-info';
import {Platform} from '@ionic/angular';
import {SquareStatus} from '../square/square-status.enum';
import {GameStatus} from '../game/game-status.enum';
import {SquareComponent} from '../square/square.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {

  board: SquareInfo[][];
  squareSize: number;

  gameStarted = false;

  @Output() gameStatusEvent = new EventEmitter <GameStatus>();

  @Input() val: GameBoardInfo;

  @ViewChildren('thisSquare') squares: QueryList<SquareComponent>;

  numBombsLeft: number;
  canFlag = true;

  constructor(private platform: Platform) {
    this.platform.resize.subscribe(async () => {
      this.calculateSquareSize();
    });
  }

  ngOnInit() {
    this.numBombsLeft = this.val.numBombs;
    this.generateBoard();
    this.calculateSquareSize();
  }

  async onLeftClick(square: SquareComponent) {
    if (!this.gameStarted)
    {
      this.gameStarted = true;
      this.gameStatusEvent.emit(GameStatus.GAMESTART);
    }

    // We only uncover hidden squares
    if (square.getSquareStatus() === SquareStatus.HIDDEN)
    {
      this.uncoverSquare(square);
      if (square.getSquareStatus() === SquareStatus.BOMB)
      {
        console.log("u lost");
      }
    }
  }

  onRightClick(square: SquareComponent): boolean {
    if (!this.gameStarted)
    {
      this.gameStarted = true;
      this.gameStatusEvent.emit(GameStatus.GAMESTART);
    }

    this.flagSquare(square);

    return false;
  }


  uncoverSquare(square: SquareComponent) {
    if (square.hasBomb())
    {
      square.setSquareStatus(SquareStatus.BOMB);
      return;
    }

    const squareX = square.getX();
    const squareY = square.getY();


    // Search all squares around this square, check if bomb.
    // First check and fix the search bounds.
    const minX = squareX - 1 < 0 ? 0 : squareX - 1;
    const maxX = squareX + 1 > this.board[0].length - 1 ? this.board[0].length - 1 : squareX + 1;

    const minY = squareY - 1 < 0 ? 0 : squareY - 1;
    const maxY = squareY + 1 > this.board.length - 1 ? this.board.length - 1 : squareY + 1;

    function needCheckSquare(sq: SquareComponent): boolean {
      const sqX = sq.getX();
      const sqY = sq.getY();

      // It is the same square as the current one we are uncovering
      if (squareX === sqX && squareY === sqY)
      {
        return false;
      }

      // We only need to check squares that are not uncovered yet
      if (sq.getSquareStatus() !== SquareStatus.HIDDEN)
      {
        return false;
      }

      // We have the edge cases down, now we see if the square is in the set bound
      return !(sqX < minX || sqX > maxX || sqY < minY || sqY > maxY);
    }


    // get a array of all the squares to check
    const toCheckSquares = this.squares.filter(sq => needCheckSquare(sq));
    let numOfBombsNearby = 0;
    toCheckSquares.forEach( (thisSquare) => {
      if (thisSquare.hasBomb())
      {
        numOfBombsNearby++;
      }
    });

    function sw(nB: number): SquareStatus
    {
      switch (nB) {
        case 0: return SquareStatus.EMPTY;
        case 1: return SquareStatus.NEARBY1;
        case 2: return SquareStatus.NEARBY2;
        case 3: return SquareStatus.NEARBY3;
        case 4: return SquareStatus.NEARBY4;
        case 5: return SquareStatus.NEARBY5;
        case 6: return SquareStatus.NEARBY6;
        case 7: return SquareStatus.NEARBY7;
        case 8: return SquareStatus.NEARBY8;
      }
      throw new Error("Illegal amount of bombs nearby!");
    }

    square.setSquareStatus(sw(numOfBombsNearby));

    // no bombs nearby: uncover all nearby squares
    if (numOfBombsNearby === 0)
    {
      toCheckSquares.forEach(thisSquare => this.uncoverSquare(thisSquare));
    }

  }



  flagSquare(square) {
    if (this.canFlag)
    {
      if (square.getSquareStatus() === SquareStatus.HIDDEN)
      {
        if (this.numBombsLeft > 0)
        {
          square.setSquareStatus(SquareStatus.FLAGGED);
          this.numBombsLeft--;
          this.gameStatusEvent.emit(GameStatus.FLAGADD);
        }
      }
      else
      {
        if (square.getSquareStatus() === SquareStatus.FLAGGED)
        {
          square.setSquareStatus(SquareStatus.HIDDEN);
          this.numBombsLeft++;
          this.gameStatusEvent.emit(GameStatus.FLAGDEL);
        }
      }
    }

}

  generateBoard(): void{
    const tempArr = [];
    for (let i = 0; i < this.val.squareY; i++)
    {
      const row: SquareInfo[] = [];
      for (let j = 0; j < this.val.squareX; j++)
      {
        row.push({x: j, y: i, boardWidth: this.val.squareX, boardHeight: this.val.squareY, hasBomb: false, status: SquareStatus.HIDDEN});
      }
      tempArr.push(row);
    }

    // now gen the bombs
    let bombLeft = this.val.numBombs;

    while (bombLeft > 0)
    {
      const tempI = Math.floor(Math.random() * this.val.squareY);
      const tempJ = Math.floor(Math.random() * this.val.squareX);

      if (!tempArr[tempI][tempJ].hasBomb)
      {
        tempArr[tempI][tempJ].hasBomb = true;
        bombLeft--;
      }
    }

    this.board = tempArr;

  }

  private calculateSquareSize() {
    const maxWidth = this.val.sizingRef.offsetWidth   / this.val.squareY;
    const maxHeight = this.val.sizingRef.offsetHeight  / this.val.squareX;

    this.squareSize = maxWidth > maxHeight ? maxHeight : maxWidth;
  }
}
