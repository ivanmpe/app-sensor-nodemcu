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
  public totalAmostras;

  constructor(public navCtrl: NavController, public navParams: NavParams, database: AngularFireDatabase) {



    /*    this.db = firebase.database().ref('temperatura/');
          this.db.on('value', despesasList => {
            let sal = [];
            despesasList.forEach( temperatura => {
              this.temperaturas.push(temperatura.val());
              return false;
            });
              
          });
       /*
        this.dbTemperaturas= database.list("temperatura").valueChanges();
        var refItem = database.list("temperatura");
        refItem.snapshotChanges([])
            .subscribe( filhos => {
              filhos.forEach( filho => {
                this.temperaturas.push(filho.payload.val());
               });
            });*/

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



}



