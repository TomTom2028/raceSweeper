import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import {GameBoardComponent} from '../game-board/game-board.component';
import {SquareComponent} from '../square/square.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage, GameBoardComponent, SquareComponent]
})
export class GamePageModule {}
