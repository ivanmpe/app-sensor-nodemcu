import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import firebase from 'firebase';

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


  public db: firebase.database.Reference;
  public umidades = [];
  public valorMedio;
  public totalAmostras;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {

    this.db = firebase.database().ref('umidade/');
    this.db.on('value', umidadesList => {
      let temp = [];
      umidadesList.forEach(umidade => {
        temp.push(umidade.val());
        return false;
      });
      this.umidades = temp;
      this.graficoUmidade(this.umidades);
      var soma=0;
      for (var i=0; i< this.umidades.length; i++){
          soma = this.umidades[i] + soma;
      }  
      this.totalAmostras = this.umidades.length;
      this.valorMedio = (soma/this.umidades.length).toFixed(0);
    });


    console.log('ionViewDidLoad HistoricoUmidadePage');
  }

  graficoUmidade( umidades: any)
  {
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
        data: umidades
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
