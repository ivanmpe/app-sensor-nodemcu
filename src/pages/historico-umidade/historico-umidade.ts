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
  public valorMediana: number = 0;
  public valorModa;



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
      if (this.totalAmostras % 2 == 0){
        this.valorMediana = (this.umidades[((this.totalAmostras/2)).toFixed(0)] + this.umidades[((this.totalAmostras/2)-1).toFixed(0)])/2;  
      }else{
        this.valorMediana = this.umidades[((this.totalAmostras/2) -1).toFixed(0)];
      }
      this.valorModa = this.mode(this.umidades);
      
    });


    console.log('ionViewDidLoad HistoricoUmidadePage');
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
