
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfbService } from '../_services/authfb.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthfbService, UserService]
})
export class HomeComponent implements OnInit {
  currentUser: any;
  constructor(
    public authService: AuthfbService,
    private router: Router,
    public userC: UserService
    ) {
      userC.getCurrentUser().then( res => {
        this.currentUser = res.displayName;
      });
    }

  logOut() {
    this.authService.logOut().then( () => {
      this.router.navigate(['/dashboard']);
    });
    return ;
  }
  ngOnInit() {

  }

}
