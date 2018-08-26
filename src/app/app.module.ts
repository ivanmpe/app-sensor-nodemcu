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
//import {InfoProdutoPage} from '../pages/info-produto/info-produto';
//import { ProdutoService } from '../providers/produto/produto.service';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { TemperaturaPage } from '../pages/temperatura/temperatura';
import { UmidadePage } from '../pages/umidade/umidade';
import { PinosPage } from '../pages/pinos/pinos';
import { LoginPage } from '../pages/login/login';
import{ MudarSenhaPage} from '../pages/mudar-senha/mudar-senha';

import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';


var config = {
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
    TemperaturaPage, 
    UmidadePage,
    PinosPage,
    LoginPage, 
    MudarSenhaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    TemperaturaPage, 
    UmidadePage,
    PinosPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
