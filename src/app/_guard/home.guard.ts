import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Injectable()
export class HomeGuard implements CanActivate {

    constructor(
        public userService: UserService,
        private router: Router
        ) {}

    canActivate(): Promise<boolean> {
       return new Promise( (resolve, rejecte) => {
           this.userService.getCurrentUser()
            .then( user => {
                resolve(true);
            }, err => {
                this.router.navigate(['/dashboard']);
                resolve(false);
            });
       });
    }
}
