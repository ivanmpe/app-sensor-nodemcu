import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  form_cadastro(f: NgForm) {
    if (!f.valid) {
      return;
    }
    if (f.controls.password.value == f.controls.password2.value) {
      this.afAuth.auth.createUserWithEmailAndPassword(f.controls.email.value, f.controls.password.value).then(ok => {
        this.presentToast('Cadastro realizado com sucesso!');
        this.navCtrl.popToRoot();
      }).catch((e) => {
        this.presentToast(e);
      });
      this.navCtrl.popToRoot();
    } else {
      this.presentToast("As senhas são diferentes! ")
    }

  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }



}
