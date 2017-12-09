import { TalkDetailPage } from './../pages/talk-detail/talk-detail';
import { CoursePage } from './../pages/course/course';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { TalksPage } from '../pages/talks/talks';
import { CoursesPage } from '../pages/courses/courses';
import { MapPage } from '../pages/map/map';
import { AboutPage } from '../pages/about/about';
import { IntroPage } from "../pages/intro/intro";
import { SignupPage } from "../pages/signup/signup";
import { LoginPage } from "../pages/login/login";
import { TalksServiceProvider } from '../providers/talks-service/talks-service';
import { AuthProvider } from '../providers/auth/auth';
import { CONFIG } from './app.config';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule, FirebaseAppProvider} from 'angularfire2';
import {AngularFireAuth} from "angularfire2/auth";
import { SponsorsProvider } from '../providers/sponsors/sponsors';
import { DatabaseProvider } from '../providers/database/database';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {PipesModule} from "../pipes/pipes.module";
import {MySchedulePage} from "../pages/my-schedule/my-schedule";
import {RecoverPasswordPage} from "../pages/recover-password/recover-password";
import {SpeakersPage} from "../pages/speakers/speakers";
import {SpeakerPage} from "../pages/speaker/speaker";
import {LocalNotifications} from "@ionic-native/local-notifications";

@NgModule({
  declarations: [
    MyApp,
    TalksPage,
    TalkDetailPage,
    CoursesPage,
    CoursePage,
    MapPage,
    AboutPage,
    IntroPage,
    SignupPage,
    LoginPage,
    MySchedulePage,
    RecoverPasswordPage,
    SpeakersPage,
    SpeakerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__phpconference'
    }),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(CONFIG.firebase),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TalksPage,
    TalkDetailPage,
    CoursesPage,
    CoursePage,
    MapPage,
    AboutPage,
    IntroPage,
    SignupPage,
    LoginPage,
    MySchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAppProvider,
    AngularFireAuth,
    TalksServiceProvider,
    AuthProvider,
    SponsorsProvider,
    DatabaseProvider,
    LocalNotifications
  ]
})
export class AppModule {}
