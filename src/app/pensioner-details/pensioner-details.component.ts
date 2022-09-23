import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PensionerDetail } from '../shared/pensionerDetails.model';
import { PensionerDetailsService } from './pensioner-details.service';

@Component({
  selector: 'app-pensioner-details',
  templateUrl: './pensioner-details.component.html',
  styleUrls: ['./pensioner-details.component.css']
})
export class PensionerDetailsComponent implements OnInit {
  public aadharnum:string = "";
  pensionerDetail!: PensionerDetail;
  pensionDetailChecked:boolean = false;
  error: string = "";
  isLoading=false;
  date=null;
  month=null;
  year=null;

  constructor(private pensionerDetailsService:PensionerDetailsService,private router: Router) { }

  ngOnInit(): void {
  }

  getPensionDetails(){
    this.isLoading=true;
    this.pensionerDetailsService.getPensionerDetails(this.aadharnum).subscribe(
      (data:any)=>{
          if(data != null){
            this.pensionerDetail = data;
            //console.log(this.pensionerDetail);
            //console.log(this.pensionerDetail.aadharNumber);
            // store the token in the localStorage 
            this.pensionDetailChecked = true;
            this.error="";
            this.isLoading=false;
            this.date=new Date(this.pensionerDetail.dateOfBirth).getDate();
            this.month=new Date(this.pensionerDetail.dateOfBirth).getMonth();
            this.year=new Date(this.pensionerDetail.dateOfBirth).getFullYear();
          }else{
            console.log("check your credentials !!")
          }
      },
      (errorMessage) => {
        this.pensionDetailChecked = false;
        //console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading=false;
      }
    )
  }
}
