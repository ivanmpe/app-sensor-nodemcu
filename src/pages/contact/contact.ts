import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MudarSenhaPage } from '../mudar-senha/mudar-senha';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { App} from 'ionic-angular';
import { LoginPage } from '../login/login';
import {AboutPage} from '../about/about';




@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private app: App) {

  }

  mudarSenha(){
    this.navCtrl.push(MudarSenhaPage);
  }

  about(){
    this.navCtrl.push(AboutPage);
  }

  logout(){
    this.afAuth.auth.signOut();
    this.app.getRootNav().setRoot(LoginPage)
  }

}
