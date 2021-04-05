import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() modalText: string;
  @Output() closeEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}


}
