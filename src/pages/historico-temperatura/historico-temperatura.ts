import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';



/**
 * Generated class for the HistoricoTemperaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-temperatura',
  templateUrl: 'historico-temperatura.html',
})
export class HistoricoTemperaturaPage {


  public db: firebase.database.Reference;
  public temperaturas;
  public valorMedio;
  public totalAmostras: number = 0;
  public valorMediana: number = 0; 
  public valorModa; 

  constructor(public navCtrl: NavController, public navParams: NavParams, database: AngularFireDatabase) {
  }

  ionViewDidLoad() {

    this.db = firebase.database().ref('temperatura/');
    this.db.on('value', temperaturasList => {
      let temp = [];
      temperaturasList.forEach(temperatura => {
        temp.push(temperatura.val());
        return false;
      });
      this.temperaturas = temp;
      this.grafico(this.temperaturas);

      var soma = 0;
      for (var i = 0; i < this.temperaturas.length; i++) {
        soma = this.temperaturas[i] + soma;
      }
      this.totalAmostras = this.temperaturas.length;
      this.valorMedio = (soma / this.temperaturas.length).toFixed(0);
      if (this.totalAmostras % 2 == 0){
        this.valorMediana = (this.temperaturas[((this.totalAmostras/2)).toFixed(0)] + this.temperaturas[((this.totalAmostras/2)-1).toFixed(0)])/2;  
      }else{
        this.valorMediana = this.temperaturas[((this.totalAmostras/2) -1).toFixed(0)];
      }
    
      this.valorModa = this.mode(this.temperaturas);
  

    });
    
    console.log('ionViewDidLoad HistoricoTemperaturaPage');

  }

  grafico(temperaturas: any) {
    var myChart = HighCharts.chart('container', {

      title: {
        text: ' Histórico Temperaturas'
      },

      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {

      },

      series: [{
        name: 'Temperatura',
        color: "#19A1B3",
        data: temperaturas
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    });

  }

  mode(numbers) {
    
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
 
    return modes;
}




}



