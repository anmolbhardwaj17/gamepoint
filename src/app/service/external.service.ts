import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { LoginRequest } from "../pojo/LoginRequest";
import { RegisterRequest } from "../pojo/RegisterRequest";
import { environment } from "../../environments/environment";
import { DialogService } from "../shared/dialog.service";


@Injectable({
    providedIn: "root",
  })
export class ExternalService {
    
    ServerUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient,
      private dialogService: DialogService ) {
       
    }

    


    public login(data: LoginRequest): Observable<any> {
        const url = this.ServerUrl + "gamepoint/v1/account/login/";
        const httpOptions = {
          headers: new HttpHeaders({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        };
        
        return this.httpClient.post<any>(url, JSON.stringify(data), httpOptions);
        
    }

    public sendForgotPasswordEmail(email: any): Observable<any> {
      const url = this.ServerUrl + "gamepoint/v1/account/forgotPassword/";
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      };
      return this.httpClient.post<any>(url, JSON.stringify(email), httpOptions);
    }

    public register(data: RegisterRequest): Observable<any> {
      const url = this.ServerUrl + "gamepoint/v1/account/registration/";
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      };
      data.confirmPassword= data.password;
      return this.httpClient.post<any>(url, JSON.stringify(data), httpOptions);
  }

  public showSuccessDialog(message : any){
        //yes dialog box
    this.dialogService.openYesDialog(message, 'success-dialog-container')
    .afterClosed().subscribe(res => {
      if(res){

      }else{

      }
    });
  }

  public showErrorDialog(message : any){
    //yes dialog box
this.dialogService.openYesDialog(message, 'error-dialog-container')
.afterClosed().subscribe(res => {
  if(res){

  }else{

  }
});
}

  public setToken(token : any , userId : any, userName : any , phoneNumber: any, psnId:any,consoleName:any, data : any){
    
    localStorage.setItem('USER_TOKEN', token);
    localStorage.setItem('DATA',JSON.stringify(data));
    localStorage.setItem('CONSOLE_NAME',consoleName);
    localStorage.setItem('PSN_ID', psnId);
    localStorage.setItem('PHONE_NUMBER', phoneNumber);
    localStorage.setItem('USER_ID', userId);
    localStorage.setItem('USER_NAME', userName);
  }
  public getCurrentLogedInUser(): any {
    var retrievedObject = localStorage.getItem("DATA");
    return JSON.parse(retrievedObject as string);
  }


}