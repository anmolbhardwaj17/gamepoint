import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogBoxYesComponent } from '../custom-dialog-box-yes/custom-dialog-box-yes.component';
import { CustomDialogBoxComponent } from '../custom-dialog-box/custom-dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog : MatDialog) { }

  openYesDialog(msg: string, dialogType : string){
    return this.dialog.open(CustomDialogBoxYesComponent,{
      width:'400px',
      panelClass: dialogType,
      disableClose: true,
      data:{
        message:msg,
      }
    });
  }

  openConfirmDialog(msg : string){
    return this.dialog.open(CustomDialogBoxComponent,{
      width:'400px',
      panelClass: 'success-dialog-container',
      disableClose: true,
      data:{
        message:msg,
      }
    });
  }
}
