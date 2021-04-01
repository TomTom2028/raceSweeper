import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { GameBoardInfo } from './game-board-info';
import { Input } from '@angular/core';
import {SquareInfo} from '../square/square-info';
import { Platform } from '@ionic/angular';

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
    this.board = [];
    for (let i = 0; i < this.val.squareY; i++)
    {
      const row: SquareInfo[] = [];
      for (let j = 0; j < this.val.squareX; j++)
      {
        row.push({x: j, y: i, boardWidth: this.val.squareX, boardHeight: this.val.squareY, hasBomb: false});
      }
      this.board.push(row);
    }
  }

  private calculateSquareSize() {
    const maxWidth = this.val.sizingRef.offsetWidth   / this.val.squareY;
    const maxHeight = this.val.sizingRef.offsetHeight  / this.val.squareX;

    this.squareSize = maxWidth > maxHeight ? maxHeight : maxWidth;
  }




}
