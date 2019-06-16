import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Injectable()
export class BootGuard implements CanActivate {

    constructor(
        public userService: UserService,
        private router: Router
        ) {}

    canActivate(): Promise<boolean> {
       return new Promise( (resolve) => {
           this.userService.getCurrentUser()
            .then( user => {
                this.router.navigate(['/home']);
            }, err => {
                resolve(true);
            });
       });
    }
}
