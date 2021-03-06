import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {GameStatus} from './game-status.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements  AfterViewChecked, OnDestroy {
  render = false;
  doNgAfterViewChecked = true;

  secondsTimer: any;

  timerVal = 0;

  width = 3;
  height = 3;
  numBombsLeft = 2;


  startingBombs: number;

  renderModal = false;
  modalText = "";

  @ViewChild('gameBoardWrapper') gameBoardWrapper;


  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.startingBombs = this.numBombsLeft;
  }

  // bool is really important. This function gets executed wayyyy to much lol
  ngAfterViewChecked() {
    if (this.doNgAfterViewChecked) {
      if (this.gameBoardWrapper.nativeElement.offsetWidth !== 0)
      {
        this.render = true;
        this.doNgAfterViewChecked = false;
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  ngOnDestroy() {
    if (this.secondsTimer !== undefined)
    {
      clearInterval(this.secondsTimer);
    }
  }

  doOnStatusUpdate(status: GameStatus) {
    switch (status) {
      case GameStatus.GAMESTART:
        this.secondsTimer = setInterval(() => {
          this.timerVal++;
        }, 1000);
        break;

      case GameStatus.GAMEWON:
        clearInterval(this.secondsTimer);
        this.modalText = "You won!!";
        this.renderModal = true;
        break;

      case GameStatus.GAMELOST:
        clearInterval(this.secondsTimer);
        this.modalText = "You lost :-(";
        this.renderModal = true;
        break;

      case GameStatus.FLAGADD:
        this.numBombsLeft--;
        break;

      case GameStatus.FLAGDEL:
        this.numBombsLeft++;
        break;
    }
  }



}
