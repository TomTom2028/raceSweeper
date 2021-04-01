import {Component, Input, OnInit} from '@angular/core';
import {GameBoardInfo} from './game-board-info';
import {SquareInfo} from '../square/square-info';
import {Platform} from '@ionic/angular';
import {SquareStatus} from '../square/square-status.enum';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {

  board: SquareInfo[][];

  squareSize: number;

  @Input() val: GameBoardInfo;


  constructor(private platform: Platform) {
    this.squareSize = 1;
    this.platform.resize.subscribe(async () => {
      this.calculateSquareSize();
    });
  }

  ngOnInit() {
    this.generateBoard();
    this.calculateSquareSize();
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
