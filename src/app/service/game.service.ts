import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  ServerUrl = environment.baseUrl;

    constructor(private httpClient: HttpClient) {
       
    }

    public createGame(data : any):Observable<any>{
      const url = this.ServerUrl + "gamepoint/v1/games/";
      let  authtoken = localStorage.getItem("USER_TOKEN") as any;
      authtoken = "Bearer" +authtoken;
      var createGameRequest = JSON.stringify(data); 
      return this.httpClient.put<any>(
        url,
        createGameRequest,
        this.createAuthorizationHeader()
      );
    }

    public getOpenGames(){
      const url = this.ServerUrl + "gamepoint/v1/games/openGames/";
      return this.httpClient.get<any>(url, this.createAuthorizationHeader());
    }

    public getLandingPageStats(){
      const url = this.ServerUrl + "gamepoint/v1/cumulativeStats/";
      return this.httpClient.get<any>(url, this.createAuthorizationHeader());
    }

    public getOpenGamesForLandingPage(){
      const url = this.ServerUrl + "gamepoint/v1/openGames/";
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      };
      return this.httpClient.get<any>(url, httpOptions);
    }

    public getConsoleTypes():Observable<any>{
      const url = this.ServerUrl + "gamepoint/v1/static/consoleTypes/";
      return this.httpClient.get<any>(url, this.createAuthorizationHeader());
    }
    public getGameTypes():Observable<any>{
      const url = this.ServerUrl + "gamepoint/v1/static/gameTypes/";
      return this.httpClient.get<any>(url, this.createAuthorizationHeader());
    }

    public getCompleteGameStats():Observable<any>{
      const url = this.ServerUrl + "gamepoint/v1/account/stats/";
      return this.httpClient.get<any>(url, this.createAuthorizationHeader());
    }

    public updateConsole(data : any):Observable<any>{

      const url = this.ServerUrl + "gamepoint/v1/account/console/";
      var updateConsoleRequest = JSON.stringify(data); 
      return this.httpClient.post<any>(
        url,
        updateConsoleRequest,
        this.createAuthorizationHeader()
      );

    }
    public updateContact(data : any):Observable<any>{

      const url = this.ServerUrl + "gamepoint/v1/account/contactNo/";
      var updateContactRequest = JSON.stringify(data); 
      return this.httpClient.post<any>(
        url,
        updateContactRequest,
        this.createAuthorizationHeader()
      );

    }
    public joinGame(id : any):Observable<any>{
      console.log("id of Game action " , id)
      let url = this.ServerUrl + `gamepoint/v1/games/${id}/join/`;
      return this.httpClient.post<any>(
        url,
        '',
        this.createAuthorizationHeader()
      );
    }
    public getMyGames():Observable<any> {
      let url = this.ServerUrl + "gamepoint/v1/games/myGames/";
      return this.httpClient.get<any>(
        url,
        this.createAuthorizationHeader()
      );
    }
    public getGameStats():Observable<any>{

      let url = this.ServerUrl + "gamepoint/v1/games/myCompletedGames/";
      return this.httpClient.get<any>(
        url,
        this.createAuthorizationHeader()
      );

    }
    public deletGame(id : any):Observable<any>{
      console.log("id of Game action " , id)
      let url = this.ServerUrl + `gamepoint/v1/games/${id}/`;
      return this.httpClient.delete<any>(
        url,
        this.createAuthorizationHeader()
      );
    }
    public StartGame(id : any):Observable<any>{
      console.log("id of Game action " , id)
      let url = this.ServerUrl + `gamepoint/v1/games/${id}/start/`;
      return this.httpClient.post<any>(
        url,
        '',
        this.createAuthorizationHeader()
      );
    }
    public getGameDetails(id : any):Observable<any>{
      console.log("id of Game Details " , id)
      let url = this.ServerUrl + `gamepoint/v1/games/${id}/playDetails/`;
      return this.httpClient.get<any>(
        url,
        
        this.createAuthorizationHeader()
      );
    }
    public submitGameDetails(id : any, formData : any):Observable<any>{
      console.log("id of Game Details " , id)
      let url = this.ServerUrl + `gamepoint/v1/games/${id}/submit/`;
      return this.httpClient.post<any>(
        url,
        JSON.stringify(formData),
        this.createAuthorizationHeader()
      );
    }
    public getGameDetailsPage(id : any):Observable<any>{
      console.log("id of Game Details " , id)
      const requestParam: any = { id: id };
      let url = this.ServerUrl + `gamepoint/v1/games/playDetails/`;
      var header = this.createAuthorizationHeaderWithQueryParam();
      return this.httpClient.get<any>(url, { headers: header, params: requestParam });
    }
    public getLeaderBoard():Observable<any>{
       
      let url = this.ServerUrl + "gamepoint/v1/leaderBoard/ ";
      return this.httpClient.get<any>(
        url,
      );

    }
   
   
    public createAuthorizationHeader() {
      const authtoken = localStorage.getItem("USER_TOKEN") as any;
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken}`,
        }),
      };
      return httpOptions;
    }
  
    public createAuthorizationHeaderWithQueryParam(): HttpHeaders {
      
      const authtoken = localStorage.getItem("USER_TOKEN") as any;
      var token = `Bearer ${authtoken}`
      const httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type' , 'application/json')
      .set('Authorization' , token );
      //add time header here
      return httpHeaders;
  
    } 
}
