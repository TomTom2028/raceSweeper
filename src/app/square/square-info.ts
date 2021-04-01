import {SquareStatus} from './square-status.enum';

export interface SquareInfo {
  x: number;
  y: number;

  boardWidth: number;
  boardHeight: number;

  hasBomb: boolean;

  status: SquareStatus;
}
