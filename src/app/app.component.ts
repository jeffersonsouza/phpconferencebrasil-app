import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TalksPage } from '../pages/talks/talks';
import { CoursesPage } from '../pages/courses/courses';
import { AboutPage } from './../pages/about/about';
import { AuthProvider } from "../providers/auth/auth";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../pages/login/login";
import {TalksServiceProvider} from "../providers/talks-service/talks-service";
import {SponsorsProvider} from "../providers/sponsors/sponsors";
import {MySchedulePage} from "../pages/my-schedule/my-schedule";

@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider, TalksServiceProvider, SponsorsProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  user: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private AuthProvider: AuthProvider,
    private AngularFireAuth: AngularFireAuth,
    private TalksProvider: TalksServiceProvider,
    private SponsorsProvider: SponsorsProvider,
    private ToastController: ToastController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Palestras', component: TalksPage, icon: 'megaphone' },
      { title: 'Cursos', component: CoursesPage, icon: 'school' },
      { title: 'Sobre', component: AboutPage, icon: 'information-circle' },
    ];

    this.AngularFireAuth.authState.subscribe(user => {
      this.user = user;
      this.rootPage = TalksPage;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.TalksProvider.sync();
      this.SponsorsProvider.sync();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.AuthProvider.logout();

    // show a simple toast with success
    let toast = this.ToastController.create({
      message: 'Logout feito com sucesso',
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });

    toast.present();

    this.nav.setRoot(TalksPage);
  }

  login() {
    this.nav.push(LoginPage);
  }

  goToSchedule() {
    this.nav.setRoot(MySchedulePage);
  }
}
