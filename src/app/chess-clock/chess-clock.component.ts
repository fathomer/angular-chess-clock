import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ClockSettingsComponent,
  DialogData,
} from './settings/clock-settings/clock-settings.component';

@Component({
  selector: 'app-chess-clock',
  templateUrl: './chess-clock.component.html',
  styleUrls: ['./chess-clock.component.css'],
})
export class ChessClockComponent implements OnInit {
  initialTime: number = 60000;
  increment: number = 0;
  player1Time!: number;
  player2Time!: number;
  player1Interval: any;
  player2Interval: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.player1Time = this.initialTime;
    this.player2Time = this.initialTime;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Key', event);
    switch (event.code) {
      case 'Space':
        this.togglePlayer();
        break;
    }
  }

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
    this.player1Time = this.initialTime;
    this.player2Time = this.initialTime;
  }

  pauseTimer(): void {
    this.stopPlayer1Timer();
    this.stopPlayer2Timer();
  }

  startPlayer1Timer(): any {
    if (!this.player1Interval && this.player1Time > 0) {
      this.player1Interval = setInterval(() => {
        if (this.player1Time > 0) {
          this.player1Time -= 100;
        }
      }, 100);
    }
  }

  startPlayer2Timer(): any {
    if (!this.player2Interval && this.player2Time > 0) {
      this.player2Interval = setInterval(() => {
        if (this.player2Time > 0) {
          this.player2Time -= 100;
        }
      }, 100);
    }
  }

  togglePlayer(): void {
    if (this.player1Interval) {
      this.stopPlayer1Timer();
      this.startPlayer2Timer();
    } else {
      this.stopPlayer2Timer();
      this.startPlayer1Timer();
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

  openSettings() {
    let dialogRef = this.dialog.open(ClockSettingsComponent, {
      height: '400px',
      width: '600px',
      data: {
        startTime: this.initialTime / 1000,
        increment: this.increment / 1000,
      },
    });
    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        console.log('Saved ', result);
        this.initialTime = result.startTime * 1000;
        this.increment = result.increment * 1000;
        this.resetBoth();
      }
    });
  }
}
