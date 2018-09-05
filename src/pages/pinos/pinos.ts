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

  d1(){
    if(this.statusPinoD1){
      this.statusPinoD1 = false
    } else {
      this.statusPinoD1 = true;
    }
  }

  d2(){
    if(this.statusPinoD2){
      this.statusPinoD2 = false
    } else {
      this.statusPinoD2 = true;
    }
  }


  d3(){
    if(this.statusPinoD3){
      this.statusPinoD3 = false
    } else {
      this.statusPinoD3 = true;
    }
  }
  d4(){
    if(this.statusPinoD4){
      this.statusPinoD4 = false
    } else {
      this.statusPinoD4 = true;
    }
  }
  d5(){}
  d6(){}
  d7(){}
  d8(){}
  d9(){}
  d10(){}





  ionViewDidLoad() {
    console.log('ionViewDidLoad PinosPage');
  }

}
