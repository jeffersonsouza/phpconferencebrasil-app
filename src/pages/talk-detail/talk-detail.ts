import { Component } from '@angular/core';
import {ModalController, NavParams, ToastController} from 'ionic-angular';
import {TalksServiceProvider} from "../../providers/talks-service/talks-service";
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {DatabaseProvider} from "../../providers/database/database";

@Component({
  selector: 'page-talk-detail',
  templateUrl: 'talk-detail.html',
  providers: [TalksServiceProvider, AuthProvider, DatabaseProvider]
})
export class TalkDetailPage {
  talk: any;

  constructor(
    private NavParams: NavParams,
    private TalksServiceProvider: TalksServiceProvider,
    private AuthProvider: AuthProvider,
    private ModalController: ModalController,
    private ToastController: ToastController
  ) {}

  ionViewDidLoad() {

    this.TalksServiceProvider.get(this.NavParams.get('talk')).subscribe(
      data => {
        this.talk = data;
      }
    );

  }

  favoriteTalk( talk ) {

    console.log(talk);

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

      let toast = this.ToastController.create({
        message: 'É necessário estar logado para adicionar palestras',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 5000
      });
      toast.present();
    }
  }

}
