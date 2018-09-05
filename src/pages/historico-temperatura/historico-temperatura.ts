import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';




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

  temperaturas: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,  database : AngularFireDatabase) {
     this.temperaturas = database.list("temperaturas/").valueChanges();
  }

  ionViewDidLoad() {


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
        data: [ 34, 10, 38, 28, 31, 31, 33, 35, 34, 30, 38, 28, 31, 31, 33, 35]
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

    
    console.log('ionViewDidLoad HistoricoTemperaturaPage');

  }

}
