import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FaqsComponent } from './faqs/faqs.component';
import { CountUpModule } from 'ngx-countup';
import { AngularCountdownDateTimeModule } from 'angular-countdown-date-time';
import { WelcomeModule } from "./welcome/welcome.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomDialogBoxComponent } from './custom-dialog-box/custom-dialog-box.component';
import { AppHttpInterceptorService } from './service/app-http-interceptor.service';
import { ExternalService } from './service/external.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FaqsComponent,
    TestComponent,
    FooterComponent,
    CustomDialogBoxComponent,
    ForgotpasswordComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    MatIconModule,
    CountUpModule,
    MatIconModule,
    WelcomeModule,
    AngularCountdownDateTimeModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
   
  ExternalService, {
    provide: HTTP_INTERCEPTORS,
     useClass: AppHttpInterceptorService,
     multi: true,
   },
],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
