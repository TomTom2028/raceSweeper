import { Component, OnInit } from '@angular/core';
import { GameBoardInfo } from './game-board-info';
import { Input } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit {

  @Input() val: GameBoardInfo;

  constructor() { }
  ngOnInit() {}

}
