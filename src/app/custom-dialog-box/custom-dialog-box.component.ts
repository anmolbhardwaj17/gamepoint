import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog-box',
  templateUrl: './custom-dialog-box.component.html',
  styleUrls: ['./custom-dialog-box.component.scss']
})

export class CustomDialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message:string},
    public dialogRef: MatDialogRef<CustomDialogBoxComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
