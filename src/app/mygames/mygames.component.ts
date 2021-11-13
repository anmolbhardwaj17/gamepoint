import { Component, OnInit,AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { GameService } from '../service/game.service';
import { AppConstant } from '../utility/AppConstant';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { map, filter, catchError } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { ExternalService } from '../service/external.service';
import * as $ from "jquery";



@Component({
  selector: 'app-mygames',
  templateUrl: './mygames.component.html',
  styleUrls: ['./mygames.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MygamesComponent implements OnInit {
  

  displayedColumnsMygames: string[] = ['gameName','entryAmount', 'scheduleTime','consoleName', 'action'];
  listData: MatTableDataSource<any>;

  constructor(private games : GameService ,  private snackBar: MatSnackBar , private router: Router, private _externalService:ExternalService) { }

  ngOnInit(): void {

    this.loadMyGames();

    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip()
    })
   
  }
  public loadMyGames(){
    this.games.getMyGames().subscribe(res=>{
      this.intiDataSource(res);
    })
  }
  public  intiDataSource(data : any){
    this.parseResponseAndIntializeDataSource(data);

 }

 parseResponseAndIntializeDataSource(res: any) {

   const response = res;
   var openGameList = response['table'];
   var responseMessage = response["message"];
   var len = openGameList.length;
   for(let i=0;i<len;i++){
    var s = openGameList[i]["scheduleTime"];
    
    // const d = new Date(s);
    // console.log(d);
    openGameList[i]["scheduleTime"] = this.convertTime(s);
   }
   //console.log("openGameList" , openGameList)
   this.snackBar.open(responseMessage, "", {
    duration: 3000,
    verticalPosition: "top",
    horizontalPosition: "center",
    panelClass: ["custom-success"],
  });
   this.listData = new MatTableDataSource(openGameList);
 
 }
 getRowData(data : any){
    if(data.action==AppConstant.GAME_ACTION_DELETE){
      this.games
      .deletGame(data.id)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        console.log("Response Recieved from Backend : ", res);

        var responseMessage = res["message"];
        if ( responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined) ) {
          this.loadMyGames();
          this._externalService.showSuccessDialog(responseMessage);
        }
        else {
          this._externalService.showErrorDialog(responseMessage);
        }
      });
    }
    else if(data.action==AppConstant.GAME_ACTION_START){
      this.games.StartGame(data.id)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((res) => {
        var responseMessage = res["message"];
        if ( responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined) ) {
          this.loadMyGames();
          this._externalService.showSuccessDialog(responseMessage);
        }
        else {
          this._externalService.showErrorDialog(responseMessage);
        }
      });
    }
    else if(AppConstant.GAME_ACTION_GOTO_GAME_DETAILS==data.action){
      this.router.navigate(['/entergame'], { queryParams: { gameId: data.id } }); 
       //this.router.navigateByUrl('/entergame', { state: { 'gameId': data.id } });
    }
    else if(AppConstant.GAME_ACTION_WAITING==data.action){
      this._externalService.showSuccessDialog("Game will be started at schedule time");
   }
 }
 errorHandler(error: HttpErrorResponse) {
  console.log("error.message", error.error.message);
  this._externalService.showErrorDialog(error.error.message);

  return throwError(error.message || "server error.");
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


}
