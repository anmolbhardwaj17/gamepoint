import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { map, filter, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../service/game.service';
import { ExternalService } from '../service/external.service';

export interface Pastgames {
  userId: string;
  console:string;
  gameName:string;
  result:string;
  entryFee:string;
  amountWon: string;
}

const PASTGAMES_DATA: Pastgames[] = [
  {userId: 'abc', console: 'PS4', gameName:'FIFA 21', result: 'Won', entryFee:'300', amountWon:'480'},
    {userId: '123', console: 'PS5', gameName:'PES 21', result: 'Lost', entryFee:'250', amountWon:'-250'},
    {userId: 'xyz', console: 'XBOX', gameName:'FIFA 21', result: 'Deleted', entryFee:'200', amountWon:'0'},
];

@Component({
  selector: 'app-gamestats',
  templateUrl: './gamestats.component.html',
  styleUrls: ['./gamestats.component.scss']
})
export class GamestatsComponent implements OnInit {

  public matchesPlayed : string  = "---";
  public totalEarnings : string  = "---";
  public winningStreak : string  = "---";
  public totalSpent : string ="---";
  public totalValue : string ="---";
  public conflictCount : string ="---";

  
  listData: MatTableDataSource<any>;
  displayedColumnsPastgames: string[] = ['userId', 'consoleName', 'gameName', 'result', 'entryAmount', 'scheduleTime', 'amountWon'];
  constructor(private gamesService:GameService , private snackBar: MatSnackBar, private gameService: GameService,
    private _externalService: ExternalService) {

   }

  ngOnInit(): void {
    this.loadGameStats();

    this.gameService.getCompleteGameStats().subscribe(res=>{
      this.intiDataSourceComplete(res);
    })
    
   
  }

  public  intiDataSourceComplete(data : any){
    this.parseResponseAndIntializeDataSourceComplete(data);

 }

 parseResponseAndIntializeDataSourceComplete(res: any) {
   
   //this.listData=null as any;
   const response = res;
   this.matchesPlayed = response["matchesPlayed"];
   this.totalEarnings = response["totalEarnings"];
   this.winningStreak = response["winningStreak"];
   this.conflictCount = response["conflictCount"];
   this.totalSpent = response["totalSpent"];
   this.totalValue = response["totalValue"];
   console.log(response);
  console.log("here");
 
 }

  public loadGameStats(){
        
    this.gamesService.getGameStats().pipe(catchError(this.errorHandler)).subscribe((res) => {
        var responseMessage = res["message"];
        if (responseMessage != undefined && (res["httpCode"] == null || res["httpCode"] == undefined))
         {
          
          this.intiDataSource(res);
          this.snackBar.open(responseMessage, "", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["custom-success"],
          });
        } else {
          this._externalService.showErrorDialog(responseMessage);
        }
      });

  }

  

  errorHandler(error: HttpErrorResponse) {
    console.log("error.message", error.error.message);
    this._externalService.showErrorDialog(error.error.message);

    return throwError(error.message || "server error.");
  }
  public  intiDataSource(data : any){
    this.parseResponseAndIntializeDataSource(data);

 }

 parseResponseAndIntializeDataSource(res: any) {

   const response = res;
   var openGameList = response['table'];

   var len = openGameList.length;
   for(let i=0;i<len;i++){
    var s = openGameList[i]["scheduleTime"];
    
    // const d = new Date(s);
    // console.log(d);
    openGameList[i]["scheduleTime"] = this.convertTime(s);
   }
   
    //console.log(d);
   this.listData = new MatTableDataSource(openGameList);
 
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


public moreCoins(): void {
  this._externalService.showSuccessDialog(" Email “Need more coins” at <support@gamespoint.co.in>");
}

 public disButton(): boolean {
  var bool:boolean;
  if(parseInt(this.totalValue) <= 100){
    return false;
  }
  else{
    return true;
  }
}
      

}
