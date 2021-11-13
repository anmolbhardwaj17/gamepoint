import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from 'jquery';
import {MatTableModule} from '@angular/material/table'
import { GameService } from '../service/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ExternalService } from '../service/external.service';


@Component({
  selector: 'app-entergame',
  templateUrl: './entergame.component.html',
  styleUrls: ['./entergame.component.scss']
})

export class EntergameComponent implements OnInit {

  public displayMessage : string  = "";

  public isWon :boolean = false;
  public fileInput :boolean = false;
  display = "none";

  url: any; //Angular 11, for stricter type
	msg = "";
  public userId :string;
  public psnId : string;
  public opponentUserID : string;
	public opponentPsnId : string;
  public console : string;
  public gameName : string;
  public gameId : string
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
	}

  public proofCheck: FormGroup;


  constructor(
    private router: Router,
    private gameService : GameService,
    private snackBar: MatSnackBar,
    private _externalService:ExternalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


   // const gameId = window.history.state?.gameId;
    const gameId = this.route.snapshot.queryParamMap.get('gameId');
    console.log("Game ID" , gameId)
    this.proofCheck = new FormGroup({
      myTeamName: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      opponentTeamName: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      myConsoleScreenshot: new FormControl(""),
      myScore: new FormControl("", [Validators.required, Validators.max(99999999)]),
      opponentScore: new FormControl("", [Validators.required, Validators.max(99999999)]),
      myGameResult: new FormControl("", [Validators.required]),
    });





    console.log("gameId" , gameId);
    if (gameId != null || gameId != undefined) {
         this.gameId = gameId;
          this.loadGameDetails(gameId);
    }


  }
  loadGameDetails(gameId :any){
    this.gameService.getGameDetails(gameId)
    .pipe(catchError(this.errorHandler.bind(this)))
    .subscribe((res) => {
      console.log("Response Recieved from Backend : ", res);

      var responseMessage = res["message"];
      if ( responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined) ) {

        this.userId = res["currentUserId"];
        this.psnId = res["currentUserConsoleId"];

        this.opponentUserID = res["opponentUserId"];
        this.opponentPsnId = res["opponentUserConsoleId"];

        this.console = res["consoleName"];
        this.gameName = res["gameName"];

        this._externalService.showSuccessDialog(responseMessage);

      }
      else {
        this._externalService.showErrorDialog(responseMessage);

      }
    });
  }
  errorHandler(error: HttpErrorResponse) {
    console.log("error.message", error.error.message);
    this._externalService.showErrorDialog(error.error.message);

    return throwError(error.message || "server error.");
  }
  openProcessingModal() {

     this.submitGameDetails();
    //  this.display = "block";
     //this.display = "ublock";
  }
  submitGameDetails(){
    console.log(this.proofCheck.value);
    this.gameService.submitGameDetails(this.gameId, this.proofCheck.value)
    .pipe(catchError(this.errorHandler.bind(this)))
    .subscribe((res) => {
      console.log("Response Recieved from Backend : ", res);

      var responseMessage = res["message"];
      if ( responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined) ) {
        this.displayMessage = responseMessage;
        this.display = "block";

        this._externalService.showSuccessDialog(responseMessage);

      }
      else {
        this._externalService.showErrorDialog(responseMessage);
      }
    });
  }

  public navigateToDashboard(): void {
    this.router.navigate(["/dashboard"]);
  }

  public showScreenshot(): void{
    this.isWon = true;
    const ss = this.proofCheck.get('myConsoleScreenshot');
    ss?.setValidators(Validators.required);
  }
  public hideScreenshot(): void{
    this.isWon = false;
    const ss = this.proofCheck.get('myConsoleScreenshot');
    ss?.setErrors(null);
  }

}
