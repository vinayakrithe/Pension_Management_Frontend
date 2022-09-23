import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class PensionerDetailsService{

    constructor(private Http:HttpClient,private router: Router){}

    getPensionerDetails(aadharNo:string){
        let input = aadharNo;
        let url = "https://localhost:44338/api/PensionerDetails/GetPensionerDetail";
        return this.Http.get(`${url}/${input}`).pipe(
            catchError(this.handleError));
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