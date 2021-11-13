import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreategameComponent } from '../creategame/creategame.component';
import { GamestatsComponent } from '../gamestats/gamestats.component';
import { MygamesComponent } from '../mygames/mygames.component';
import { OpengamesComponent } from '../opengames/opengames.component';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { EntergameComponent } from '../entergame/entergame.component';
import { HasRoleGuard } from "../has-role.guard";



const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent,
    canActivate: [HasRoleGuard],
    children: [

      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [HasRoleGuard],
        data: {
          title: "Dashboard",
        },
        pathMatch: "full",
      },
      {
        path: "creategame",
        component: CreategameComponent,
        canActivate: [HasRoleGuard],
        data: {
          title: "Create Game",
        },
        pathMatch: "full",
      },
      {
        path: "gamestats",
        component: GamestatsComponent,
        canActivate: [HasRoleGuard],
        data: {
          title: "Game Stats",
        },
        pathMatch: "full",
      },
      {
        path: "mygames",
        component: MygamesComponent,
        canActivate: [HasRoleGuard],
        data: {
          title: "My games",
        },
        pathMatch: "full",
      },
      {
        path: "opengames",
        component: OpengamesComponent,
        canActivate: [HasRoleGuard],
        data: {
          title: "Open Games",
        },
        pathMatch: "full",
      },
      {
        path: "myaccount",
        component: MyaccountComponent,
        canActivate: [HasRoleGuard],
        data: {
          title: "My Account",
        },
        pathMatch: "full",
      },
      {
        path: "entergame",
        component: EntergameComponent,
        canActivate: [HasRoleGuard],
        data: {
          title: "Enter game",
        },
        pathMatch: "full",
      },




      ///nomination
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule { }


