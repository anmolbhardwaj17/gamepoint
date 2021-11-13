import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../service/external.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public userName="";
  public userId ="";
  constructor(  private _externalService: ExternalService,) { }

  ngOnInit(): void {

    let userDetails = this._externalService.getCurrentLogedInUser();
   this.userName = localStorage.getItem("USER_NAME")as any;
   this.userId = localStorage.getItem("USER_ID")as any


    $('#sidebarCollapse').click(toggle);
    function toggle(){
      $('#sidebar').toggleClass('active');
      $('#right-content').toggleClass('active');
      };
  }

}
