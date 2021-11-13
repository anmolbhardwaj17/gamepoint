import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import * as $ from "jquery";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { map, filter, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ExternalService } from "../service/external.service";
import { GameService } from "../service/game.service";
import { NewPassword } from "../pojo/NewPassword";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;

  fuser:  NewPassword = new  NewPassword();

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private _externalService: ExternalService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {

    this.forgotPasswordForm = new FormGroup({
      newPassword: new FormControl("", [Validators.required]),
      confirmNewPassword: new FormControl("", [Validators.required]),
    });
    
    
    
  }
  get newPasswordValue() {
    return this.forgotPasswordForm.get("newPassword");
  }

  get confirmNewPasswordValue() {
    return this.forgotPasswordForm.get("confirmNewPassword");
  }

  public forgotPassword(){ 
    this.sendForgotPasswordEmail()
  }
  public sendForgotPasswordEmail() {
    alert("done");
  }
  

}
