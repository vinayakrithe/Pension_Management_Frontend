import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.modal";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
    id:number,
    email:string,
    username: string,
    password:string,
    token: string,
    expirationDate:Date
}

@Injectable({ providedIn: "root" })
export class AuthService{
    user = new BehaviorSubject<User|null>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}
    
    login(username: string, password: string) {
        return this.http
          .post<AuthResponseData>(
            "https://localhost:44361/api/Users/authenticate",
            {
              username: username,
              password: password,
            }
          )
          .pipe(
            catchError(this.handleError),
            tap((resData) => {
              console.log(resData);
              this.handleAuthentication(
                resData.id,
                resData.email,
                resData.username,
                resData.token,
                resData.expirationDate
              );
            })
          );
    }

    logout() {
      this.user.next(null);
      this.router.navigate(["./home"]);
      localStorage.removeItem("userData");
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration);
    }

    autoLogin() {
      let userData: {
        id:number;
        email: string;
        username:string;
        _token: string;
        _tokenExpirationDate: string;
      }
      if(localStorage.getItem("userData")!=null){
        userData =  JSON.parse(localStorage.getItem("userData"));
      }
      else {
        userData=null;
      }
      if (!userData) {
        return;
      }
  
      const loadedUser = new User(
        userData.id,
        userData.email,
        userData.username,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
  
      if (loadedUser.Gettoken) {
        //calling get method
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }

    private handleAuthentication(
        id:number,
        email:string,
        username: string,
        token: string,
        tokenExpirationDate: Date
      ) {
        // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(id,email,username, token, new Date(tokenExpirationDate));
        console.log(user);
        this.user.next(user); //emit user to whole app
        const expiresIn = new Date(tokenExpirationDate).getTime() - new Date().getTime();
        console.log(expiresIn);
        this.autoLogout(expiresIn);
        
        
        localStorage.setItem("userData", JSON.stringify(user));
      }
    
      private handleError(errorRes: HttpErrorResponse) {

        let errorMessage = "An unknown error occured";
        if(errorRes.error.message){
            return throwError(()=>errorRes.error.message);
        }
        // else {
        //     return throwError(()=>errorMessage);
        // }
        return throwError(()=>errorMessage);
      }
}