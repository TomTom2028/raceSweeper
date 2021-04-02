import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameBoardInfo} from './game-board-info';
import {SquareInfo} from '../square/square-info';
import {Platform} from '@ionic/angular';
import {SquareStatus} from '../square/square-status.enum';
import {GameStatus} from '../game/game-status.enum';

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

  constructor(private platform: Platform) {
    this.platform.resize.subscribe(async () => {
      this.calculateSquareSize();
    });
  }

  ngOnInit() {
    this.generateBoard();
    this.calculateSquareSize();
  }

  async onLeftClick(square) {
    if (!this.gameStarted)
    {
      this.gameStarted = true;
      this.gameStatusEvent.emit(GameStatus.GAMESTART);
    }

    square.setSquareStatus(SquareStatus.BOMB);

  }

  onRightClick(square): boolean {
    if (!this.gameStarted)
    {
      this.gameStarted = true;
      this.gameStatusEvent.emit(GameStatus.GAMESTART);
    }

    if (square.getSquareStatus() === SquareStatus.HIDDEN)
    {
      square.setSquareStatus(SquareStatus.FLAGGED);
      this.gameStatusEvent.emit(GameStatus.FLAGADD);
    }
    else
    {
      if (square.getSquareStatus() === SquareStatus.FLAGGED)
      {
        square.setSquareStatus(SquareStatus.HIDDEN);
        this.gameStatusEvent.emit(GameStatus.FLAGDEL);
      }
    }
    return false;
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
