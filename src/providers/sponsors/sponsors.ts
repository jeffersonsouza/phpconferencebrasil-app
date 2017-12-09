import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from "../../app/app.config";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class SponsorsProvider {

  constructor(private http: Http, private Storage: Storage) { }

  sync() {
    return this.http.get(CONFIG.app.endpoint + '/sponsors')
      .map(res => res.json(), this)
      .catch((error: any) => Observable.throw(error.json.error))
      .retry(3)
      .subscribe(sponsors => {
        this.Storage.set('sponsors', sponsors.data);
        this.list();
      });
  }

  list(): Observable<any> {
    return this.load().map((data: any) => {
      let sponsors = [];

      data.forEach((sponsor) => {
        sponsors[sponsor.priority] = sponsors[sponsor.priority] || [];
        sponsors[sponsor.priority]['name'] = sponsor.kind;
        sponsors[sponsor.priority]['sponsors'] = sponsors[sponsor.priority]['sponsors'] || [];
        sponsors[sponsor.priority]['sponsors'].push(sponsor);
      });

      return sponsors;
    });
  }

  private load(): any {
    return Observable.create(observer => {
      this.Storage.get('sponsors').then((sponsors) => {
        observer.next(sponsors ? sponsors : this.sync());
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

}
