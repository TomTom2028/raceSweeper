import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Input } from '@angular/core';
import { SquareInfo } from './square-info';
import { Platform } from '@ionic/angular';
import {SquareStatus} from './square-status.enum';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {

  @Input() val: SquareInfo;

  squareText: string;
  squareClass: string;


  constructor(public platform: Platform) {
  }

  ngOnInit() {
    this.setSquareStatus(this.val.status);
  }

  public setSquareStatus(status: SquareStatus) {
    switch (status) {
      case SquareStatus.HIDDEN:
        this.squareText = "";
        this.squareClass = "sq-hidden";
        break;

      case SquareStatus.EMPTY:
        this.squareText = "";
        this.squareClass = "sq-empty";
        break;

      case SquareStatus.NEARBY1:
        this.squareText = "1";
        this.squareClass = "sq-1";
        break;

      case SquareStatus.NEARBY2:
        this.squareText = "2";
        this.squareClass = "sq-2";
        break;

      case SquareStatus.NEARBY3:
        this.squareText = "3";
        this.squareClass = "sq-3";
        break;

      case SquareStatus.NEARBY4:
        this.squareText = "4";
        this.squareClass = "sq-4";
        break;

      case SquareStatus.NEARBY5:
        this.squareText = "5";
        this.squareClass = "sq-5";
        break;

      case SquareStatus.NEARBY6:
        this.squareText = "6";
        this.squareClass = "sq-6";
        break;

      case SquareStatus.NEARBY7:
        this.squareText = "7";
        this.squareClass = "sq-7";
        break;

      case SquareStatus.NEARBY8:
        this.squareText = "8";
        this.squareClass = "sq-8";
        break;

      case SquareStatus.BOMB:
        this.squareText = "B";
        this.squareClass = "sq-bomb";
        break;

      case SquareStatus.FLAGGED:
        this.squareText = "F";
        this.squareClass = "sq-flagged";
        break;
    }
  }

}
