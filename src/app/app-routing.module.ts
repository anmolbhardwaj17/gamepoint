import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './faqs/faqs.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HasRoleGuard } from './has-role.guard';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "login",  pathMatch: "full", component: TestComponent },
  {
    path:'faqs',
    component: FaqsComponent
  },
  {
    path:'test',
    component: TestComponent
  },
  {
    path:'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("./welcome/welcome.module").then((m) => m.WelcomeModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
