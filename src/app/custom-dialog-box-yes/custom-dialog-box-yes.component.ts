import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog-box-yes',
  templateUrl: './custom-dialog-box-yes.component.html',
  styleUrls: ['./custom-dialog-box-yes.component.scss']
})
export class CustomDialogBoxYesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message:string},
    public dialogRef: MatDialogRef<CustomDialogBoxYesComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(true);
  }

}
