import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  startTime: number;
  increment: number;
}

@Component({
  selector: 'app-clock-settings',
  templateUrl: './clock-settings.component.html',
  styleUrls: ['./clock-settings.component.css'],
})
export class ClockSettingsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ClockSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  dialogData!: DialogData;
  ngOnInit(): void {
    this.dialogData = {
      startTime: this.data.startTime,
      increment: this.data.increment,
    };
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.dialogData);
  }
}
