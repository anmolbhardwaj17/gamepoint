import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from '../app-routing.module';


import { WelcomeRoutingModule } from "./welcome-routing.module";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreategameComponent } from '../creategame/creategame.component';
import { GamestatsComponent } from '../gamestats/gamestats.component';
import { MygamesComponent } from '../mygames/mygames.component';
import { OpengamesComponent } from '../opengames/opengames.component';
import { DashboardfooterComponent } from '../dashboardfooter/dashboardfooter.component';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { EntergameComponent } from '../entergame/entergame.component';
import { CustomDialogBoxComponent } from "../custom-dialog-box/custom-dialog-box.component";
import { CustomDialogBoxYesComponent } from "../custom-dialog-box-yes/custom-dialog-box-yes.component";



@NgModule({
  imports: [
    WelcomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    MatTableModule,
    AppRoutingModule
  ],
  declarations: [
    WelcomeComponent,
    SidebarComponent,
    DashboardfooterComponent,
    DashboardComponent,
    CreategameComponent,
    GamestatsComponent,
    MygamesComponent,
    OpengamesComponent,
    MyaccountComponent,
    EntergameComponent
  ],
  exports: [
    WelcomeComponent,
    SidebarComponent,
    DashboardfooterComponent,
    DashboardComponent,
    CreategameComponent,
    GamestatsComponent,
    MygamesComponent,
    OpengamesComponent,
    MyaccountComponent,
    EntergameComponent,
  ],

  providers: [
   
  ],
  schemas:[
    NO_ERRORS_SCHEMA
  ],
  entryComponents:[CustomDialogBoxComponent, CustomDialogBoxYesComponent],
})
export class WelcomeModule {}
