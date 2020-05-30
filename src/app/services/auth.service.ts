import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private afa: AngularFireAuth,
              private userService: UserService) {
                this.user$ = this.afa.authState.pipe(
                  switchMap(user => {
                    if (user) {
                      return this.userService.getUser(user.uid);
                    } else {
                      return of(null);
                    }
                  })
                );
              }


  login(email: string, password: string): Promise<any> {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): Promise<any> {
    return this.afa.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afa.auth.signOut();
  }

  updateEmail(nEmail: string): Promise<void> {
    return firebase.auth().currentUser.updateEmail(nEmail)
  }

  deleteUser() {
    const user = firebase.auth().currentUser;
    user.delete();
  }

  resetPassword(email: string){
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        console.log("Password updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }
  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        console.log("Email updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }
}
