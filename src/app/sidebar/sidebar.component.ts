import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  


  constructor() { }


    ngOnInit() {
      if(screen.width <= 455){
        $('#sidebar').toggleClass('active');

      $('.closeSidebar').click(toggle);
    function toggle(){
      $('#sidebar').toggleClass('active');
      };
      }
      

    }



}


