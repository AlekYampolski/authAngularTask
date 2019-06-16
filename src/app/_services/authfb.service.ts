import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class AuthfbService {

    constructor(
        public afAuth: AngularFireAuth,
        public db: AngularFirestore,
        ) { }

    createUserDoc(id, email, username): void {
        this.db.collection('users').doc(id).set({
            username,
            email
        })
        .then(() => console.log('success')).catch(err => console.log(err));
    }

    doRegister(email, password, username): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then( res => {
                    res.user.updateProfile({
                        displayName: username
                    })
                    .then(() => {
                        resolve(res);
                    this.createUserDoc(res.user.uid, email, username);
                    }, err => reject(err));
                }, err => {
                    reject(err);
                });
        });
    }

   logOut(): Promise<void> {
       return this.afAuth.auth.signOut();
   }

    signInEmail(email: string, password: string): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then( res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }
}
