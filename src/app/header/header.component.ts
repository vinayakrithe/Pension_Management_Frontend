import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private userSub:Subscription;
  isAuthenticated= false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  onLogin(){
    this.router.navigate(["./auth"]);
  }
}
