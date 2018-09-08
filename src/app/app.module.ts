import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CadastroPage } from '../pages/cadastro/cadastro';
import { PinosPage } from '../pages/pinos/pinos';
import { LoginPage } from '../pages/login/login';
import { MudarSenhaPage } from '../pages/mudar-senha/mudar-senha';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HistoricoTemperaturaPage } from '../pages/historico-temperatura/historico-temperatura';
import { HistoricoUmidadePage } from '../pages/historico-umidade/historico-umidade';
import * as highcharts from 'Highcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';
//import {NgxMqttClientModule} from 'ngx-mqtt-client';
import { TemperaturasProvider } from '../providers/temperaturas/temperaturas';
import { UmidadesProvider } from '../providers/umidades/umidades';

import { Observable } from 'rxjs/Observable';





const config = {
  apiKey: "AIzaSyCluIVH6ZZPhMHlXWSzPeS33P3OCo2hiKg",
  authDomain: "fir-esp8266-25146.firebaseapp.com",
  databaseURL: "https://fir-esp8266-25146.firebaseio.com",
  projectId: "fir-esp8266-25146",
  storageBucket: "fir-esp8266-25146.appspot.com",
  messagingSenderId: "454487278619"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CadastroPage,
    PinosPage,
    LoginPage,
    MudarSenhaPage,
    HistoricoTemperaturaPage,
    HistoricoUmidadePage
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "outerStrokeWidth": 10,
      "innerStrokeColor": "#19a1b3",
      "outerStrokeColor": "#15a964",
      "innerStrokeWidth": 5,
      "titleFontSize": "26",
      "subtitleFontSize": "14",
      "showUnits": false,
      "showBackground": false
    }),
    IonicModule.forRoot(MyApp),
    //   NgxMqttClientModule.withOptions({
    //          host: 'test.mosquitto.org',
    //        protocol: 'ws',
    //      port: 8080,
    //  path: '/mqtt/ivanifce2018'
    //}), 
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CadastroPage,
    PinosPage,
    MudarSenhaPage,
    LoginPage,
    HistoricoTemperaturaPage,
    HistoricoUmidadePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TemperaturasProvider,
    UmidadesProvider
  ]
})
export class AppModule { }
