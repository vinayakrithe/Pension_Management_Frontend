import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  error: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  // onSwitchMode() {
  //   this.isLoginMode = !this.isLoginMode;
  // }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    
    authObs= this.authService.login(username, password);

    authObs.subscribe(
      (resData) => {
        //console.log(resData);
        this.isLoading = false;
        this.router.navigate(["./home"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
