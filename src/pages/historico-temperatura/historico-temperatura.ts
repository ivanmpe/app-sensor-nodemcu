import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
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

  dbTemperaturas: Observable<any>;
  temperaturas:  Array<number> = [0] ;


  constructor(public navCtrl: NavController, public navParams: NavParams,  database : AngularFireDatabase) {



   
    this.dbTemperaturas= database.list("temperatura").valueChanges();
    var refItem = database.list("temperatura");
    refItem.snapshotChanges([])
        .subscribe( filhos => {
          filhos.forEach( filho => {
            this.temperaturas.push(filho.payload.val());
           });
        });
                   
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
        data: this.temperaturas  
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
