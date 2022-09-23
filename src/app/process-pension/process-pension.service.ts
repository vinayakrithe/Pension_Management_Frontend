import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class ProcessPensionService{

    constructor(private Http:HttpClient,private router: Router){}

    getProcessPension(aadharNo:string){
        let input = aadharNo;
        let url = "https://localhost:44341/api/ProcessPension/PensionDetail";
        return this.Http.post(`${url}/${input}`,input).pipe(
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