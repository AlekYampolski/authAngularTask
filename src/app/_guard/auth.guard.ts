import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';

import { UserService } from '../_services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public userService: UserService,
        private router: Router
        ) {}

    canActivate(): Promise<boolean> {
       return new Promise( (resolve) => {
           this.userService.getCurrentUser()
            .then( user => {
                resolve(false);
            }, err => {
                resolve(true);
            });
       });
    }
}
