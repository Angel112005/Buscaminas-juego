import { Injectable } from '@angular/core';
import { Cell } from '../models/cell';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gridSize = 10;
  totalMines = 10;
  grid: Cell[][] = [];

  initializeGrid(): void {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({
        isMine: false,
        isRevealed: false,
        nearbyMines: 0,
        isFlagged: false,
      }))
    );
    this.placeMines();
    this.calculateNearbyMines();
  }

  private placeMines(): void {
    let minesPlaced = 0;
    while (minesPlaced < this.totalMines) {
      const row = Math.floor(Math.random() * this.gridSize);
      const col = Math.floor(Math.random() * this.gridSize);
      if (!this.grid[row][col].isMine) {
        this.grid[row][col].isMine = true;
        minesPlaced++;
      }
    }
  }

  private calculateNearbyMines(): void {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        if (!this.grid[row][col].isMine) {
          this.grid[row][col].nearbyMines = this.countMinesAround(row, col);
        }
      }
    }
  }

  private countMinesAround(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < this.gridSize && newCol >= 0 && newCol < this.gridSize && this.grid[newRow][newCol].isMine) {
          count++;
        }
      }
    }
    return count;
  }

  revealCell(row: number, col: number): boolean {
    if (this.grid[row][col].isMine) {
      return true; // Game over
    }
    this.revealEmptyCells(row, col);
    return false;
  }

  private revealEmptyCells(row: number, col: number): void {
    if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize || this.grid[row][col].isRevealed) {
      return;
    }


    this.grid[row][col].isRevealed = true;

    if (this.grid[row][col].nearbyMines > 0) {
      return;
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          this.revealEmptyCells(row + i, col + j);
        }
      }
    }
  }
}
