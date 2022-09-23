import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PensionerDetail } from '../shared/pensionerDetails.model';
import { ProcessPensionService } from './process-pension.service';

@Component({
  selector: 'app-process-pension',
  templateUrl: './process-pension.component.html',
  styleUrls: ['./process-pension.component.css']
})
export class ProcessPensionComponent implements OnInit {
  public aadharnum:string = "";
  pensionProcessed: boolean = false;
  pensionerDetail!: PensionerDetail;
  error: string = "";
  isLoading:boolean=false;
  date=null;
  month=null;
  year=null;

  constructor(private processPensionService:ProcessPensionService,private router: Router) { }

  ngOnInit(): void {
  }
  getPensionDetails(){
    this.isLoading=true;
    this.processPensionService.getProcessPension(this.aadharnum).subscribe(
      (data:any)=>{
          if(data != null){
            this.pensionerDetail = data;
            console.log(this.pensionerDetail);
            this.pensionProcessed = true;
            this.isLoading=false;
            this.error="";
            this.date=new Date(this.pensionerDetail.dateOfBirth).getDate();
            this.month=new Date(this.pensionerDetail.dateOfBirth).getMonth();
            this.year=new Date(this.pensionerDetail.dateOfBirth).getFullYear();
          }else{
            console.log("check your credentials !!")
          }
      },
      (errorMessage) => {
        this.pensionProcessed = false;
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
  }
}
