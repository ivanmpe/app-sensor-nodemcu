import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pinos',
  templateUrl: 'pinos.html',
})
export class PinosPage {

  statusPinoD1: boolean;
  statusPinoD2: boolean;
  statusPinoD3: boolean;
  statusPinoD4: boolean;
  statusPinoD6: boolean;
  statusPinoD7: boolean;
  statusPinoD8: boolean;
  public db: AngularFireDatabase;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, database: AngularFireDatabase) {
    //this.statusPinoD1 = database.list("d1")
    var refItem = database.list("/");
    this.itemRef = database.object('/');
    this.item = this.itemRef.valueChanges();


    refItem.snapshotChanges([])
      .subscribe(filhos => {
        filhos.forEach(filho => {
          if (filho.key == "d1") {
            this.statusPinoD1 = filho.payload.val();
          }
          if (filho.key == "d2") {
            this.statusPinoD2 = filho.payload.val();
          }
          if (filho.key == "d3") {
            this.statusPinoD3 = filho.payload.val();
          }
          if (filho.key == "d4") {
            this.statusPinoD4 = filho.payload.val();
          }
          if (filho.key == "d6") {
            this.statusPinoD6 = filho.payload.val();
          }
          if (filho.key == "d7") {
            this.statusPinoD7 = filho.payload.val();
          }
          if (filho.key == "d8") {
            this.statusPinoD8 = filho.payload.val();
          }


        });
      });

  }



  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  d1() {
    if (this.statusPinoD1) {
      this.itemRef.update({ d1: false });
    } else {
      this.itemRef.update({ d1: true });
    }
  }

  d2() {

    if (this.statusPinoD2) {
      this.itemRef.update({ d2: false });

    } else {
      this.itemRef.update({ d2: true });

    }
  }


  d3() {
    if (this.statusPinoD3) {
      this.itemRef.update({ d3: false });
    } else {
      this.itemRef.update({ d3: true });
    }
  }

  d4() {
    if (this.statusPinoD4) {
      this.itemRef.update({ d4: false });
    } else {
      this.itemRef.update({ d4: true });
    }
  }
  d5() {
    this.presentToast("Em uso com o DHT11.");

  }


  d6() {
    if (this.statusPinoD6) {
      this.itemRef.update({ d6: false });
    } else {
      this.itemRef.update({ d6: true });
    }
  }

  d7() {
    if (this.statusPinoD7) {
      this.itemRef.update({ d7: false });
    } else {
      this.itemRef.update({ d7: true });
    }
  }

  d8() {
    if (this.statusPinoD8) {
      this.itemRef.update({ d8: false });
    } else {
      this.itemRef.update({ d8: true });
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PinosPage');
  }

}
