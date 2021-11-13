import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { GameService } from '../service/game.service';
import { throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { map, filter, catchError } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExternalService } from '../service/external.service';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {


  a1='';

  currentPhoneNo='Please enter you phone no.';
  currentGamerId='Enter your PSN ID';

  public configConsole: FormGroup;
  public updatePhone: FormGroup;
  selectedValue = 1;
  responseMessage = "";
  mySelect = "";
  firstSelected ="";
  public currentConsoleName ="";
  public currentConsoleId = 0;
  public currentPsnId = "Enter your PSN ID";
  public currentPhoneNumber ="Please enter you phone no.";

  consoleTypes: any[] ;
  constructor(
    private router: Router,
    private gameService : GameService,
    private _externalService : ExternalService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadConsoleType();
    
    this.configConsole = new FormGroup({
      consoleTypeName: new FormControl(""),
      consoleTypeId: new FormControl("",[Validators.required]),
      consoleId: new FormControl("", [Validators.required, Validators.maxLength(20)]),// psn Id
    });

    this.updatePhone = new FormGroup({
      mobileNumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.max(999999999999999)]),
    });

  // this.configConsole.get("consoleTypeId")?.setValue(this.firstSelected);
  }
  public setCurrentUserDetails(){
    let consoleName = localStorage.getItem('CONSOLE_NAME') as any;
    let psnId = localStorage.getItem('PSN_ID') as any;
    let phoneNumber = localStorage.getItem('PHONE_NUMBER') as any;
    let consoleId = localStorage.getItem("CONSOLE_ID")as any;
    if( consoleName!=null){
      this.currentConsoleName = consoleName;
    }
    if( psnId!=null ){
      this.currentPsnId = psnId;
    }
    if( phoneNumber !=null){
      this.currentPhoneNumber = phoneNumber;
    }
    if(consoleId!=null){
       this.currentConsoleId = consoleId;
    }
  }
  public loadConsoleType (){
    this.gameService.getConsoleTypes()
    .pipe(catchError(this.errorHandler))
    .subscribe((res) => {
      this.responseMessage = res["message"];
      this.consoleTypes = res["table"];
      console.log(this.consoleTypes);
      
      if(localStorage.getItem('CONSOLE_NAME')){
        let console_name = localStorage.getItem('CONSOLE_NAME')
        for (let i = 0; i < this.consoleTypes.length; i++) {
          if(console_name == this.consoleTypes[i]["name"]){
            localStorage.setItem("CONSOLE_ID" ,  this.consoleTypes[i]["id"] as any)
            this.setCurrentUserDetails();
          }
        }
      }
      
      if ( this.responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined)) {
        if(!localStorage.getItem('CONSOLE_NAME')){
          this._externalService.showSuccessDialog(this.responseMessage);
        }
        
      } else {
        this._externalService.showErrorDialog(this.responseMessage);
      }
    });
 
}

    public updateConsole(){


      this.gameService.updateConsole(this.configConsole.value)
      .pipe(catchError(this.errorHandler))
      .subscribe((res) => {
        this.responseMessage = res["message"];
        
        if ( this.responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined)) {
          
          this._externalService.showSuccessDialog(this.responseMessage);

          this.setConsoleData(this.configConsole.value);
         
          this.setCurrentUserDetails();
          this.clearFormControls();
        } else {
          this._externalService.showErrorDialog(this.responseMessage);
        }
      });  
    }



    public setConsoleData(data : any){
      for(let i = 0; i < this.consoleTypes.length; i++){
        
          if(data.consoleTypeId == this.consoleTypes[i]["id"]){
            localStorage.setItem("CONSOLE_ID" ,  this.consoleTypes[i]["id"] as any)
            localStorage.setItem('CONSOLE_NAME', this.consoleTypes[i]["name"] as any);
          }
      }
      localStorage.setItem('PSN_ID', this.configConsole.value.consoleId as any);
    }

  public updatePhoneNumber(){
    this.gameService.updateContact(this.updatePhone.value)
    .pipe(catchError(this.errorHandler))
    .subscribe((res) => {
      this.responseMessage = res["message"];
      //this.consoleTypes = res["table"];
      console.log(this.updatePhone.value)
      if ( this.responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined)) {
        this._externalService.showSuccessDialog(this.responseMessage);
        localStorage.setItem('PHONE_NUMBER', this.updatePhone.value.mobileNumber as any);

        let p1 = localStorage.getItem('PHONE_NUMBER');
          if(p1!=null){
            this.currentPhoneNumber = p1;
           }
           this._externalService.showSuccessDialog(this.responseMessage);
           this.clearFormControls();
      } else {
        this._externalService.showErrorDialog(this.responseMessage);
      }
    });
      console.log(this.configConsole.value);
  }
  public selectOption(event : any){
   
  }
    public errorHandler(error: HttpErrorResponse) {
    console.log("error.message", error.error.message);
    this._externalService.showErrorDialog(error.error.message);

    return throwError(error.message || "server error.");
  }

  public logout(): void {

    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("DATA");
    localStorage.removeItem("CONSOLETYPE");
    localStorage.removeItem("CONSOLE_NAME");
    localStorage.removeItem("PHONE_NUMBER");
    localStorage.removeItem("PSN_ID");
    localStorage.removeItem("CONSOLE_ID");
    localStorage.removeItem("CONSOLEID");
    this.navigateToHome();
  }

  public navigateToHome(): void {
    this.router.navigate(["/"]);
  }

  public clearFormControls(): void {
    //this.configConsole.controls.consoleTypeId.reset();
    this.configConsole.controls.consoleId.reset();
    this.updatePhone.controls.mobileNumber.reset();
  }

}


