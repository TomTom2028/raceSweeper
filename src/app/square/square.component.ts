import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Input } from '@angular/core';
import { SquareInfo } from './square-info';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {

  @Input() val: any;

  constructor(public platform: Platform) {
  }

  ngOnInit() {
  }

}
