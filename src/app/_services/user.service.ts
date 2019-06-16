import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(public afAuth: AngularFireAuth) {}

    getCurrentUser(): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged( user => {
                if (user) {
                    resolve(user);
                } else {
                    reject('User in not loged in');
                }
            });
        });
    }
}
