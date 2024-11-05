// src/app/models/cell.model.ts
export interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  nearbyMines: number;
  isFlagged: boolean;
}
