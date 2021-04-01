import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SquareSquareInfo } from './square-square-info';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {

  @Input() val: SquareSquareInfo;

  constructor() { }


  ngOnInit() {}

}
