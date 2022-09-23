export class PensionerDetail {
    public aadharNumber: string;
    public name: string;
    public dateOfBirth: Date;
    public  pan:string ;
    public  salaryEarned :number;
    public  allowances :number;
    public  pensionType:string;
    public  bankName:string ;
    public  accountNumber:string ;
    public  bankType:string ;
    public pensionAmount:number;
    public bankServiceCharge:number;
    /**
     *
     */
    constructor(AadharNumber: string,Name: string,DateOfBirth: Date,PAN:string,
                        SalaryEarned :number,Allowances :number,PensionType:string,BankName:string ,
                                AccountNumber:string,BankType:string,PensionAmount:number,BankServiceCharge: number) {

        this.aadharNumber = AadharNumber;
        this.name = Name;
        this.dateOfBirth = DateOfBirth;
        this.pan = PAN;
        this.salaryEarned = SalaryEarned;
        this.allowances = Allowances;
        this.pensionType = PensionType;
        this.bankName = BankName;
        this.accountNumber = AccountNumber;
        this.bankType = BankType;  
        this.pensionAmount = PensionAmount;
        this.bankServiceCharge = BankServiceCharge;  
    }
    
  }