// src/app/components/grid/grid.component.ts
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Cell } from '../../models/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  grid: Cell[][] = [];
  gameover = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  onCellClick(row: number, col: number): void {
    if (!this.gameover) {
      this.gameover = this.gameService.revealCell(row, col);
    }
  }

  startNewGame(): void {
    this.gameService.initializeGrid();
    this.grid = this.gameService.grid;
    this.gameover = false;
  }
}
