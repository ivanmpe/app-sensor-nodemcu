import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoTemperaturaPage} from '../historico-temperatura/historico-temperatura';
import { HistoricoUmidadePage} from '../historico-umidade/historico-umidade';
//import {NgxMqttClientModule} from 'ngx-mqtt-client';
//import {ConnectionStatus, MqttService, SubscriptionGrant} from 'ngx-mqtt-client';
//import {IClientOptions} from 'mqtt';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//  messages: Array<sensores> = [];

  //status: Array<string> = [];


  temperatura: any  ;
  umidade: string ;
  public db:firebase.database.Reference;
 
 
  //constructor(public navCtrl: NavController, private mqttService: MqttService) {
   constructor(public navCtrl: NavController, database: AngularFireDatabase) {
   
   
    
   }

  ionViewDidLoad() {
        
    this.db = firebase.database().ref('umidade/');
    this.db.on('value', umidadesList => {
      let temp = [];
      umidadesList.forEach(umidade => {
        temp.push(umidade.val());
        return false;
      });
      this.umidade = temp[temp.length-1];
    });


    this.db = firebase.database().ref('temperatura/');
    this.db.on('value', temperaturaList => {
      let temp = [];
      temperaturaList.forEach(temperatura => {
        temp.push(temperatura.val());
        return false;
      });
      this.temperatura = temp[temp.length-1];
    });


      console.log('ionViewDidLoad HomePage');
  }


  historicoTemperatura(){
    this.navCtrl.push(HistoricoTemperaturaPage);
  }
  historicoUmidade(){
    this.navCtrl.push(HistoricoUmidadePage);
  }
/*
 connect(config: IClientOptions): void {
       this.mqttService.connect(config);
    }
 */
    /**
     * Subscribes to fooBar topic.
     * The first emitted value will be a {@see SubscriptionGrant} to confirm your subscription was successful.
     * After that the subscription will only emit new value if someone publishes into the fooBar topic.
     * */
  /*
     subscribe(): void {
        this.mqttService.subscribeTo<sensores>('sensores')
            .subscribe({
                next: (msg: SubscriptionGrant | sensores) => {
                    if (msg instanceof SubscriptionGrant) {
                        this.status.push('Subscribed to fooBar topic!');
                       console.log(msg);
                    } else {
                        this.messages.push(msg);
                    }
                },
                error: (error: Error) => {

                    this.status.push(`Something went wrong: ${error.message}`);
                   
                }
            });
    }
  */
    /**
     * Sends message to fooBar topic.
     */
  
  /*
     sendMsg(): void {
        this.mqttService.publishTo<sensores>('sensores', {temperatura: '80', umidade: '60'}).subscribe({
            next: () => {
                this.status.push('Mensagem enviada para sensores');
            },
            error: (error: Error) => {
                this.status.push(`Something went wrong: ${error.message}`);
            }
        });
    }
*/ 
    /**
     * Unsubscribe from fooBar topic.
     */
 /*   unsubscribe(): void {
        this.mqttService.unsubscribeFrom('sensores').subscribe({
            next: () => {
                this.status.push('Unsubscribe from fooBar topic');
            },
            error: (error: Error) => {
                this.status.push(`Something went wrong: ${error.message}`);
            }
        });
    }
 */
    /**
     * The purpose of this is, when the user leave the app we should cleanup our subscriptions
     * and close the connection with the broker
   */

   }
