import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {AuthProvider} from "../auth/auth";

@Injectable()
export class DatabaseProvider {
  list: any;

  constructor(private AngularFireDatabase: AngularFireDatabase, private AuthProvider: AuthProvider) {

  }

  saveFavorite(talk) {
    const newFavoriteRef = this.AngularFireDatabase.list('/usertalks/' + this.AuthProvider.currentUser.uid + '/').push({});
    talk.id = newFavoriteRef.key;
    newFavoriteRef.set(talk);
  }

  removeFavorite(talk) {
    // work in progress
  }

  listFavorites(): AngularFireList<any[]> {
    if(this.AuthProvider.currentUser) {
      return this.AngularFireDatabase.list('/usertalks/' + this.AuthProvider.currentUser.uid);
    }
  }

}
