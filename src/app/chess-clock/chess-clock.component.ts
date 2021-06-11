import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess-clock',
  templateUrl: './chess-clock.component.html',
  styleUrls: ['./chess-clock.component.css'],
})
export class ChessClockComponent implements OnInit {
  player1Time: number = 600000;
  player2Time: number = 600000;
  player1Interval: any;
  player2Interval: any;

  constructor() {}

  ngOnInit(): void {}

  player1Click(): void {
    this.stopPlayer1Timer();
    this.startPlayer2Timer();
  }

  player2Click(): void {
    this.stopPlayer2Timer();
    this.startPlayer1Timer();
  }

  resetBoth(): void {
    this.stopPlayer1Timer();
    this.stopPlayer2Timer();
    this.player1Time = 600000;
    this.player2Time = 600000;
  }

  pauseTimer(): void {
    this.stopPlayer1Timer();
    this.stopPlayer2Timer();
  }

  startPlayer1Timer(): any {
    if (!this.player1Interval) {
      this.player1Interval = setInterval(() =>{
        this.player1Time -= 100;
        if(this.player1Time <= 0){
          this.stopPlayer1Timer();
        }
      } , 100);
    }
  }

  startPlayer2Timer(): any {
    if (!this.player2Interval) {
      this.player2Interval = setInterval(() =>{
        this.player2Time -= 100;
        if(this.player2Time <= 0){
          this.stopPlayer2Timer();
        }
      } , 100);
    }
  }

  stopPlayer2Timer(): void {
    clearInterval(this.player2Interval);
    this.player2Interval = false;
  }

  stopPlayer1Timer(): void {
    clearInterval(this.player1Interval);
    this.player1Interval = false;
  }
}
