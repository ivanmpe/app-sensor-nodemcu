import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PinosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pinos',
  templateUrl: 'pinos.html',
})
export class PinosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  statusPinoD1: boolean = true;
  statusPinoD2: boolean = true;
  statusPinoD3: boolean = true;
  statusPinoD4: boolean = true;
  statusPinoD5: boolean = true;
  statusPinoD6: boolean = true;
  statusPinoD7: boolean = true;
  statusPinoD8: boolean = true;
  statusPinoD9: boolean = true;
  statusPinoD10: boolean = true;



  ionViewDidLoad() {
    console.log('ionViewDidLoad PinosPage');
  }

}
