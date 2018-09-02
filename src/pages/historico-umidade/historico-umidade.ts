import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';

/**
 * Generated class for the HistoricoUmidadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-umidade',
  templateUrl: 'historico-umidade.html',
})
export class HistoricoUmidadePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    var myChart = HighCharts.chart('container', {

      title: {
        text: 'Histórico de Umidade'
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
        name: 'Umidade',
        color: "#19A1B3",
        data: [ 60, 50, 38, 62, 51, 45, 48, 45, 62, 51, 45, 48, 45] 
        
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

    console.log('ionViewDidLoad HistoricoUmidadePage');
  }

}
