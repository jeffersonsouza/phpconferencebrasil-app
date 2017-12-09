import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from "../database/database";
import { CONFIG } from "../../app/app.config";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import {LocalNotifications} from "@ionic-native/local-notifications";

@Injectable()
export class TalksServiceProvider {
  data: any;
  userTalks: any = [];

  constructor(
    private http: Http,
    private Storage: Storage,
    private DatabaseProvider: DatabaseProvider,
    private LocalNotifications: LocalNotifications
  ) { }

  getPosts(): Observable<any> {
    return this.http.get('http://localhost/wp-json/wp/v2/posts')
      .map(res => res.json(), this)
      .catch((error: any) => Observable.throw(error.json.error));
  }

  /**
   * Method to get the last talks on our API
   */
  async sync() {
    return await this.http.get(CONFIG.app.endpoint + '/talks')
      .map(res => res.json(), this)
      .catch((error: any) => Observable.throw(error.json.error))
      .retry(3)
      .subscribe(talks => {
        this.Storage.set('talks', talks.data);
        this.data = talks.data;
        this.list();
        return talks.data;
      });
  }


  list(type: any = 'talk', userTalks = {}, sync: boolean = false): Observable<any> {
    if (sync) {
      this.sync();
    }

    return this.load().map((data: any) => {
      let activities = [];

      data.forEach((activity) => {
        let processor = 'proccess' + type[0].toUpperCase() + type.slice(1);
        if (activity.type == type) {

          let favorite = Object.keys(userTalks).some(function(k) {
            return userTalks[k].talk === activity.id;
          });

          activity.userFavorite = favorite;

          // activity.favoriteId = favorite.id;
          activities = this[processor](activities, activity);
        }
      });

      if(type == 'course') return activities;

      return activities.map((day) => {
        return {
          'date': day.date,
          'hours': this.toArray(day.hours)
        };
      });
    });
  }

  get(id: number, userTalks = {}): any {
    let favorite = Object.keys(userTalks).some(function(k) {
      return userTalks[k].talk === id;
    });

    return this.load().map((data: any) => {
      let talk = data.filter(talk => talk.id === id)[0];
      talk.userFavorite = favorite;
      return data.filter(talk => talk.id === id)[0];
    });
  }

  saveFavorite(talk) {
    this.DatabaseProvider.saveFavorite({talk: talk.id, date: talk.date, time: talk.startTime});

    this.LocalNotifications.schedule({
      id: talk.id,
      title: 'Uma palestra da sua grade vai começar',
      text: 'A palestra "' + talk.title + '" começará em 3 minutos na sala ' + talk.room + '.',
      at: new Date(new Date(talk.date + ' ' + talk.startTime).getTime() - 300000), // notification 5 minutes before talk starts
    });
  }

  removeFavorite(talk) {

  }

  private load(): any {
    return Observable.create(observer => {
      this.Storage.get('talks').then((talks) => {
        observer.next(talks ? talks : this.sync());
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  /**
   *
   * @param activities
   * @param activity
   *
   * @return array
   */
  private proccessTalk(activities, activity) {
    let day = parseInt(activity.date.split('-')[2]) - 7;

    activities[day] = activities[day] || [];
    activities[day]['date'] = activity.date;

    activities[day]['hours'] = activities[day]['hours'] || [];
    activities[day]['hours'][activity.startTime] = activities[day]['hours'][activity.startTime] || [];
    activities[day]['hours'][activity.startTime]['hour'] = activity.startTime;

    if(activities[day]['hours'][activity.startTime]['hasFavorite'] == undefined && activity.userFavorite == true) {
      activities[day]['hours'][activity.startTime]['hasFavorite'] = true;
    }

    activities[day]['hours'][activity.startTime]['sessions'] = activities[day]['hours'][activity.startTime]['sessions'] || [];
    activities[day]['hours'][activity.startTime]['sessions'].push(activity);

    return activities;
  }

  /**
   *
   * @param activities
   * @param activity
   *
   * @return array
   */
  private proccessCourse(activities, activity) {
    activities[activity.type] = activities[activity.type] || [];
    activities[activity.type].push(activity);

    return activities;
  }

  private toArray(object) {
    return Object.keys(object).map(function(key) {
      return object[key];
    });
  }
}
