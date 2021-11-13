import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ExternalService } from "../service/external.service";
import { LoginRequest } from "../pojo/LoginRequest";
import { RegisterRequest } from "../pojo/RegisterRequest";
import { ForgotRequest } from "../pojo/ForgotRequest";
import { AppConstant } from "../utility/AppConstant";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { AngularCountdownDateTimeModule } from "angular-countdown-date-time";
import { MatSnackBar } from "@angular/material/snack-bar";
import { throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { map, filter, catchError } from "rxjs/operators";

import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { GameService } from '../service/game.service';

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
  endTime = "2021-10-20T00:00:00";


  public totalUsers : number  = 0;
  public totalEarnings : number  = 0;
  public totalGames : number  = 0;

  leaderBoardListData: MatTableDataSource<any>;

  listData: MatTableDataSource<any>;
  displayedColumnsOpengames: string[] = ['userId', 'consoleName', 'gameName', 'entryAmount', 'scheduleTime','action'];
  
  displayedColumnsLeaderboard: string[] = ['userId', 'totalEarnings', 'winningStreak' , 'matchesPlayed'];
 
  leaderboardHeadElements = ["User ID", "Sessions", "Amount won"];

  //using for counter in stats
  option = {
    startVal: 0,
    useEasing: true,
    duration: 6,
  };

  public registerForm: FormGroup;
  public loginForm: FormGroup;
  public forgotPasswordForm: FormGroup;
  display = "none";
  displaysignup = "none";
  displayForgotPassword = "none";

  displayPopup = "none";

  user: LoginRequest = new LoginRequest();

  fuser: ForgotRequest = new ForgotRequest();

  ruser: RegisterRequest = new RegisterRequest();
  statusCode: string;
  hide: boolean = true;

  ngOnInit(): void {

    if(localStorage.getItem('USER_TOKEN')){
      this.gameService.getGameTypes().subscribe(res=>{
        this.navigateToDashboard();
      });  
    }

    this.gameService.getOpenGamesForLandingPage().subscribe(res=>{
      this.intiDataSource(res);
    });

    this.gameService.getLandingPageStats().subscribe(res=>{
      this.intiDataSourceStats(res);
    });

    this.gameService.getLeaderBoard().subscribe(res=>{
      this.intiLeaderDataSource(res);
    })


    $(".btnClick").click(toggle);
    function toggle() {
      if ($("#1").css("display") != "none") {
        $("#2").show().siblings("div").hide();
      } else if ($("#2").css("display") != "none") {
        $("#1").show().siblings("div").hide();
      }
    }

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });

    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl("", [Validators.required]),
      mobileNumber: new FormControl("",[Validators.max(999999999999999)]),
      userId: new FormControl("", [Validators.required]),
    });
  }
  public  intiDataSource(data : any){
    this.parseResponseAndIntializeDataSource(data);

 }
 public  intiDataSourceStats(data : any){
  this.parseResponseAndIntializeDataSourceStats(data);

}

parseResponseAndIntializeDataSourceStats(res: any) {
  const response = res;
  var cumulativeData = response['table'][0];
  this.totalUsers = cumulativeData["totalUsers"];
  this.totalEarnings = cumulativeData["totalEarnings"];
  this.totalGames = cumulativeData["totalGames"];

}

 parseResponseAndIntializeDataSource(res: any) {

   const response = res;
   var openGameList = response['table'];
   var len = openGameList.length;
   for(let i=0;i<len;i++){
    var s = openGameList[i]["scheduleTime"];
    openGameList[i]["scheduleTime"] = this.convertTime(s);
   }
   this.listData = new MatTableDataSource(openGameList);

 }

 public getRowData(roData : any){
  this.gameService.joinGame(roData.id).subscribe(res=>{
  })
  this.gameService.getOpenGames().subscribe(res=>{
    this.intiDataSource(res);
  })
}
public  intiLeaderDataSource(data : any){
  this.parseResponseAndIntializeLeaderBoardDataSource(data);

}

parseResponseAndIntializeLeaderBoardDataSource(res: any) {
const response = res;
var leaderBoard = response['table'];
this.leaderBoardListData = new MatTableDataSource(leaderBoard);
}

  openModallogin() {
    this.display = "block";

  }
  onCloseHandledlogin() {
    this.display = "none";
  }
  openModalsignup() {
    this.displaysignup = "block";

  }
  onCloseHandledsignup() {
    this.displaysignup = "none";
  }

  openModalForgotPassword() {
    this.displayForgotPassword = "block";
    this.onCloseHandledlogin();

  }
  onCloseHandledForgotPassword() {
    this.displayForgotPassword = "none";
  }

  openPopup() {
    this.displayPopup = "block";
  }
  closePopup() {
    this.displayPopup = "none";
  }

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private _externalService: ExternalService,
    private gameService: GameService
  ) {}

  public register(): void {
    var responseMessage = "";
    this.ruser = new RegisterRequest(this.registerForm.value);
    console.log(this.registerForm.value);

    this._externalService
      .register(this.ruser)
      .pipe(catchError(this.errorHandler))
      .subscribe((res) => {
        responseMessage = res["message"];
        if (
          responseMessage != undefined &&
          (res["httpCode"] == null || res["httpCode"] == undefined)
        ) {
          this._externalService.showSuccessDialog(responseMessage);
          this.clearFormControls();
          this.onCloseHandledsignup()

        } else {
          this._externalService.showErrorDialog(responseMessage);
        }

      });
  }

  public login(): void {
    var responseMessage = "";
    var token = "";
    var userId = "";
    var userName = "";
    var phoneNumber = "";
    var consoleName = "";
    var psnId = "";
    this.user = new LoginRequest(this.loginForm.value);

    this._externalService
      .login(this.user)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {

        responseMessage = res["message"];
        token = res["token"];
        userId = res["userId"];
        userName = res["userName"];
        phoneNumber = res['phoneNumber'];
        psnId = res['consoleId'];
        consoleName = res['consoleType'];
        if (
          responseMessage != undefined &&
          (res["httpCode"] == null || res["httpCode"] == undefined)
        ) {
         // this._externalService.showSuccessDialog(responseMessage);
         this._externalService.setToken(token, userId, userName , phoneNumber, psnId, consoleName, res);
          this.clearFormControls();
          this.onCloseHandledlogin();
        }

        let consoleFromLocalStorage = localStorage.getItem('CONSOLE_NAME');
        console.log(consoleFromLocalStorage);
        if(!consoleFromLocalStorage || consoleFromLocalStorage == "null"){
          this.navigateToMyAccount();
        }
      
        else if(consoleFromLocalStorage != "null"){
          
          this.navigateToDashboard();
        }
        
      });
  }

  errorHandler(error: HttpErrorResponse) {
    console.log("error.message", error.error.message);

    this._externalService.showErrorDialog(error.error.message);
    return throwError(error.message || "server error.");
  }

  showPassword(event: any) {
    if (event.target.checked) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  public navigateToDashboard(): void {
    this.router.navigate(["/dashboard"]);
  }
  public navigateToMyAccount(): void {
    this.router.navigate(["/myaccount"]);
  }

  public clearFormControls(): void {
    this.registerForm.controls.email.reset();
    this.registerForm.controls.password.reset();
    this.registerForm.controls.name.reset();
    this.registerForm.controls.mobileNumber.reset();
    this.registerForm.controls.userId.reset();
    this.loginForm.controls.email.reset();
    this.loginForm.controls.password.reset();

  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get loginEmail() {
    return this.loginForm.get("email");
  }
  get forgotPasswordEmail() {
    return this.forgotPasswordForm.get("email");
  }

  get loginPassword() {
    return this.loginForm.get("password");
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  get userId() {
    return this.registerForm.get("userId");
  }
  get name() {
    return this.registerForm.get("name");
  }
  get mobileNumber() {
    return this.registerForm.get("mobileNumber");
  }

  convertTime(s:any) {
    const monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
    var date = new Date(s),
        month = (monthNames[date.getMonth()]),
        day  = ("0" + date.getDate()).slice(-2);
        const hrs  = ("0" + date.getHours()).slice(-2);
        const min = ("0" + date.getMinutes()).slice(-2);
        var formatDate = [month, day].join("-");
        var formatTime = [hrs, min].join(":");
    return [formatDate, formatTime].join(" : ");
  }
  

  public forgotPassword(){ 
    this.sendForgotPasswordEmail()
    
    this.onCloseHandledForgotPassword();
  }

  public sendForgotPasswordEmail() {
    this.fuser = new ForgotRequest(this.forgotPasswordForm.value);
    this._externalService
      .sendForgotPasswordEmail(this.fuser)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {

        let responseMessage = res["message"]
        if (
          responseMessage != undefined &&
          (res["httpCode"] == null || res["httpCode"] == undefined)
        ) {
         // this._externalService.showSuccessDialog(responseMessage);
          this.clearFormControls();
          this._externalService.showSuccessDialog(responseMessage);
        }
        
      });
  }

    
    
    
}



export interface Opengames {
  console: string;
  userId: string;
  gameName: string;
  entryFee: string;
  action: string;
}

export interface Leaderboard {
  userId: string;
  session: string;
  amountWon: string;
}




