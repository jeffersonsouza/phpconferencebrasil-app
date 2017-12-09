import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {


  constructor(public AngularFireAuth: AngularFireAuth) { }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.AngularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password
      ).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.AngularFireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(authData => {
        this.AngularFireAuth.auth.currentUser.updateProfile({displayName: credentials.name, photoURL: credentials.photoUrl});
        observer.next(authData);
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  logout() {
    this.AngularFireAuth.auth.signOut();
  }

  isAuthenticated(){
    return (this.AngularFireAuth.auth.currentUser) ? true : false;
  }

  get currentUser(): any {
    return this.AngularFireAuth.auth.currentUser ? this.AngularFireAuth.auth.currentUser : null;
  }

}
