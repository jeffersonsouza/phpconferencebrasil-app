import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, Slides, ToastController} from 'ionic-angular';

import { TalksServiceProvider } from '../../providers/talks-service/talks-service';
import {TalkDetailPage} from "../talk-detail/talk-detail";
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {DatabaseProvider} from "../../providers/database/database";

@Component({
  selector: 'page-talks',
  templateUrl: 'talks.html',
  providers: [TalksServiceProvider, Slides, AuthProvider, DatabaseProvider]
})
export class TalksPage {
  talks: any;

  weekDays: any = [
    {day: 'Quinta', color: 'reverse', date: '2017-12-07'},
    {day: 'Sexta', color: 'primary', date: '2017-12-02'},
    {day: 'Sábado', color: 'primary', date: '2017-12-09'}
  ];

  @ViewChild(Slides) slides: Slides;

  constructor(
    private TalksServiceProvider: TalksServiceProvider,
    private ToastController: ToastController,
    private NavController: NavController,
    private AuthProvider: AuthProvider,
    private ModalController: ModalController,
    private DatabaseProvider: DatabaseProvider

  ) { }

  ionViewDidLoad() {
    // lock slides from swipe
    this.slides.lockSwipes(true);

    if(this.AuthProvider.isAuthenticated()){
      this.DatabaseProvider.listFavorites().valueChanges().subscribe(
        data => {
          this.talks = this.TalksServiceProvider.list('talk', data);
        }
      );
    } else {
      this.talks = this.TalksServiceProvider.list('talk');
    }
  }

  goToTalk(id) {
    this.NavController.push(TalkDetailPage, {talk: id});
  }

  favoriteTalk( talk, slidingTalk ) {

    if(this.AuthProvider.isAuthenticated()) {
      this.TalksServiceProvider.saveFavorite(talk);

      // show a simple toast with success
      let toast = this.ToastController.create({
        message: 'Item adicionado a sua grade com sucesso',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 3000
      });
      toast.present();

    } else {
      let modal = this.ModalController.create(LoginPage);
      modal.present();
      modal.onDidDismiss( win => {
        this.NavController.setRoot(TalksPage);
      });

      let toast = this.ToastController.create({
        message: 'É necessário estar logado para adicionar palestras',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 5000
      });
      toast.present();
    }

    // close item swipe
    slidingTalk.close();
  }

  unfavoriteTalk(talk, slidingTalk) {
    this.TalksServiceProvider.saveFavorite(talk);

    // show a simple toast with success
    let toast = this.ToastController.create({
      message: 'Item adicionado a sua grade com sucesso',
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    toast.present();

    // close item swipe
    slidingTalk.close();
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
