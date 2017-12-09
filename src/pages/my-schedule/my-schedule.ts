import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {TalksServiceProvider} from "../../providers/talks-service/talks-service";
import {DatabaseProvider} from "../../providers/database/database";
import {TalkDetailPage} from "../talk-detail/talk-detail";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-my-schedule',
  templateUrl: 'my-schedule.html',
})
export class MySchedulePage {
  weekDays: any = [
    {day: 'Quinta', color: 'reverse', date: '2017-12-07'},
    {day: 'Sexta', color: 'primary', date: '2017-12-02'},
    {day: 'Sábado', color: 'primary', date: '2017-12-09'}
  ];

  talks: any;
  user: any;

  @ViewChild(Slides) slides: Slides;

  constructor(
    private TalksServiceProvider: TalksServiceProvider,
    private DatabaseProvider: DatabaseProvider,
    private NavController: NavController,
    private AuthProvider: AuthProvider
  ) {

  }

  ionViewDidLoad() {
    this.DatabaseProvider.listFavorites().valueChanges().subscribe(
      data => {
        this.talks = this.TalksServiceProvider.list('talk', data);
      }
    );

    this.user = this.AuthProvider.currentUser;
  }

  goToTalk(id) {
    this.NavController.push(TalkDetailPage, {talk: id});
  }

  setActiveDay(index) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(index, 500);
    this.slides.lockSwipes(true);

    this.weekDays.map((day, i) => {
      day.color = (index == i) ? 'reverse' : 'primary';
    });

  }
}
