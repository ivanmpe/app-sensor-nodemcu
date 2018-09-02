import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoTemperaturaPage} from '../historico-temperatura/historico-temperatura';
import { HistoricoUmidadePage} from '../historico-umidade/historico-umidade';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    var temperatura = 30;
    var umidade = 60;
  }
  
  historicoTemperatura(){
    this.navCtrl.push(HistoricoTemperaturaPage);
  }
  historicoUmidade(){
    this.navCtrl.push(HistoricoUmidadePage);

  }

}
