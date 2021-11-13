
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../service/game.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { map, filter, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { textChangeRangeIsUnchanged } from 'typescript';
import { ExternalService } from '../service/external.service';
import { AppConstant } from '../utility/AppConstant';


@Component({
  selector: 'app-creategame',
  templateUrl: './creategame.component.html',
  styleUrls: ['./creategame.component.scss']
})
export class CreategameComponent implements OnInit {

  defaultGameSelect='';
  defaultPriceSelect='50';
  responseMessage = "";
  selectedGame = "";
  

  public createGameForm: FormGroup;
 
  gameTypes: any[] ; 
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private gameService: GameService,
    private _externalService : ExternalService
  ) {}

  ngOnInit(): void {
    
    this.selectedGame = "";
    this.loadGameTypes();
    this.createGameForm = new FormGroup({
      gameTypeId: new FormControl("", [Validators.required]),
      entryAmount: new FormControl("", [Validators.required]),
      scheduleTime: new FormControl("", [Validators.required]),
    });

    
  }

  public loadGameTypes(){
    this.gameService.getGameTypes()
    .pipe(catchError(this.errorHandler))
    .subscribe((res) => {
      this.responseMessage = res["message"];
      this.gameTypes = res["table"];
      this.selectedGame = res["table"][0]["name"];
      this.defaultGameSelect = res["table"][0]["id"];
      console.log(this.defaultGameSelect);
      if ( this.responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined)) {
        
      } else {
        this._externalService.showErrorDialog(this.responseMessage);
      }
    });
  }

  public selectGameEvent(event : any){
    this.createGameForm.get("gameType")?.setValue(event.target.value);
  }

  errorHandler(error: HttpErrorResponse) {
    this._externalService.showErrorDialog(error.error.message);
    return throwError(error.error || "server error.");
  }

  public createGame(): void {
    var responseMessage = "";

    this.gameService
      .createGame(this.createGameForm.value)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        console.log("Response Recieved from Backend : ", res);

        responseMessage = res["message"];
        if (
          responseMessage != undefined &&
          (res["httpCode"] == null || res["httpCode"] == undefined)
        ) {
          this.navigateToMyGames();
          this._externalService.showSuccessDialog(responseMessage);
        }
      });
  }

  get gameSelect() {
    return this.createGameForm.get("email");
  }

  get entryAmount() {
    return this.createGameForm.get("password");
  }
  get scheduleTime() {
    return this.createGameForm.get("password");
  }

  public navigateToMyGames(): void {
    this.router.navigate(["/mygames"]);
  }

}
