import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { GameService } from '../service/game.service';
import { DialogService } from '../shared/dialog.service';
import { Router } from '@angular/router';
import { throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { map, filter, catchError } from "rxjs/operators"
import { ExternalService } from '../service/external.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  listData: MatTableDataSource<any>;
  leaderBoardListData: MatTableDataSource<any>;
  displayedColumnsOpengames: string[] = ['userId', 'consoleName', 'gameName', 'entryAmount', 'scheduleTime','action'];
  dataSourceOpengames = new MatTableDataSource<Opengames>(OPENGAMES_DATA);

  displayedColumnsLeaderboard: string[] = ['userId', 'totalEarnings', 'winningStreak' , 'matchesPlayed'];
  dataSourceLeaderboard = new MatTableDataSource<Leaderboard>(LEADERBOARD_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSourceLeaderboard.paginator = this.paginator;
  }


  constructor(
    private gameService: GameService,
    private dialogService: DialogService,
    private router: Router,
    private _externalService: ExternalService,
   
    ) { }

  ngOnInit(): void {
    this.gameService.getOpenGames().subscribe(res=>{
      this.intiDataSource(res);

    })
    this.gameService.getLeaderBoard().subscribe(res=>{
      this.intiLeaderDataSource(res);
    })

  }

  public  intiDataSource(data : any){
     this.parseResponseAndIntializeDataSource(data);

  }
  public  intiLeaderDataSource(data : any){
    this.parseResponseAndIntializeLeaderBoardDataSource(data);

 }


 parseResponseAndIntializeLeaderBoardDataSource(res: any) {

  //this.listData=null as any;
  const response = res;
  var leaderBoard = response['table'];

  console.log("leaderBoard" , leaderBoard)
  this.leaderBoardListData = new MatTableDataSource(leaderBoard);


}
  parseResponseAndIntializeDataSource(res: any) {

    //this.listData=null as any;
    const response = res;
    var openGameList = response['table'];

    var len = openGameList.length;
   for(let i=0;i<len;i++){
    var s = openGameList[i]["scheduleTime"];

    // const d = new Date(s);
    // console.log(d);
    openGameList[i]["scheduleTime"] = this.convertTime(s);
   }

    console.log("openGameList" , openGameList)
    this.listData = new MatTableDataSource(openGameList);

    //yes dialog box
    // this.dialogService.openYesDialog('Message will appear here')
    // .afterClosed().subscribe(res => {
    //   if(res){

    //   }else{

    //   }
    // });

    //yes and no dialog box
    // this.dialogService.openConfirmDialog('Message will appear here')
    // .afterClosed().subscribe(res => {
    //   if(res){

    //   }else{

    //   }
    // });

  }
  public getRowData(roData : any){
   
    this.gameService.joinGame(roData.id)
    .pipe(catchError(this.errorHandler.bind(this)))
    .subscribe((res) => {
      let responseMessage = res["message"];
      if (responseMessage != undefined &&(res["httpCode"] == null || res["httpCode"] == undefined)) {
        // this.gameService.getOpenGames().subscribe(res=>{
        //   this.intiDataSource(res);
        // }) 
        this.openDialogBox(responseMessage);
      }
    });   
  }
  openDialogBox(message : any){
    
    this.dialogService.openYesDialog(message, 'success-dialog-container')
    .afterClosed().subscribe(res => {
      if(res){
        this.navigateToMyGames();
      }
    });
   
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
  public navigateToMyGames(): void {
    this.router.navigate(["/mygames"]);
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

const OPENGAMES_DATA: Opengames[] = [
  {userId: 'abc', console: 'PS4', gameName:'FIFA 21', action: 'Join', entryFee:'300'},
    {userId: '123', console: 'PS5', gameName:'PES 21', action: 'Join', entryFee:'250'},
    {userId: 'xyz', console: 'XBOX', gameName:'FIFA 21', action: 'Join', entryFee:'200'},
    {userId: 'xyz', console: 'XBOX', gameName:'FIFA 21', action: 'Join', entryFee:'200'},
    {userId: 'xyz', console: 'XBOX', gameName:'FIFA 21', action: 'Join', entryFee:'200'},
    {userId: 'xyz', console: 'XBOX', gameName:'FIFA 21', action: 'Join', entryFee:'200'},
];

const LEADERBOARD_DATA: Leaderboard[] = [
  {userId: 'abc', session:'300', amountWon:'10000'},
  {userId: '123', session:'250', amountWon:'8000'},
  {userId: 'xyz', session:'200', amountWon:'5000'},
  {userId: 'abc', session:'300', amountWon:'10000'},
  {userId: '123', session:'250', amountWon:'8000'},
  {userId: 'xyz', session:'200', amountWon:'5000'},
  {userId: 'abc', session:'300', amountWon:'10000'},
  {userId: '123', session:'250', amountWon:'8000'},
  {userId: 'xyz', session:'200', amountWon:'5000'},
  {userId: 'abc', session:'300', amountWon:'10000'},
  {userId: '123', session:'250', amountWon:'8000'},
  {userId: 'xyz', session:'200', amountWon:'5000'},
];

