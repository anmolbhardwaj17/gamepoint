import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardfooter',
  templateUrl: './dashboardfooter.component.html',
  styleUrls: ['./dashboardfooter.component.scss']
})
export class DashboardfooterComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public navigateToFaqs(): void {
    this.router.navigate(["/faqs"]);
    scroll(0,0);
  }

}
