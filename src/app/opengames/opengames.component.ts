import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opengames',
  templateUrl: './opengames.component.html',
  styleUrls: ['./opengames.component.scss']
})
export class OpengamesComponent implements OnInit {

  openGamesElements: any = [
    {userId: 'abc', console: 'PS4', gameName:'FIFA 21', action: 'Join', entryFee:'300'},
    {userId: '123', console: 'PS5', gameName:'PES 21', action: 'Join', entryFee:'250'},
    {userId: 'xyz', console: 'XBOX', gameName:'FIFA 21', action: 'Join', entryFee:'200'},
  ];

  openGamesHeadElements = ['User ID', 'Console', 'Game', 'Entry Amount','Action'];

  constructor() { }

  ngOnInit(): void {
  }

}
