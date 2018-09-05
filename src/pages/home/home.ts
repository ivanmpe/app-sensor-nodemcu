import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoTemperaturaPage} from '../historico-temperatura/historico-temperatura';
import { HistoricoUmidadePage} from '../historico-umidade/historico-umidade';
//import {NgxMqttClientModule} from 'ngx-mqtt-client';
//import {ConnectionStatus, MqttService, SubscriptionGrant} from 'ngx-mqtt-client';
//import {IClientOptions} from 'mqtt';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


export interface sensores {
  temperatura: string;
  umidade: string;
}




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: Array<sensores> = [];

  status: Array<string> = [];


  temperatura: string = "31" ;
  umidade: string = "60";
  refBD: AngularFireDatabase;
  temperaturas: Observable<any>;


  constructor(public navCtrl: NavController,private mqttService: MqttService) {
//  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth,  database : AngularFireDatabase) {
   //  this.temperaturas = database.list("temperaturas/").valueChanges();
   }

  ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
  }


  historicoTemperatura(){
    this.navCtrl.push(HistoricoTemperaturaPage);
  }
  historicoUmidade(){
    this.navCtrl.push(HistoricoUmidadePage);
  }

 connect(config: IClientOptions): void {
       this.mqttService.connect(config);
    }
 
    /**
     * Subscribes to fooBar topic.
     * The first emitted value will be a {@see SubscriptionGrant} to confirm your subscription was successful.
     * After that the subscription will only emit new value if someone publishes into the fooBar topic.
     * */
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
  
    /**
     * Sends message to fooBar topic.
     */
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
 
    /**
     * Unsubscribe from fooBar topic.
     */
    unsubscribe(): void {
        this.mqttService.unsubscribeFrom('sensores').subscribe({
            next: () => {
                this.status.push('Unsubscribe from fooBar topic');
            },
            error: (error: Error) => {
                this.status.push(`Something went wrong: ${error.message}`);
            }
        });
    }
 
    /**
     * The purpose of this is, when the user leave the app we should cleanup our subscriptions
     * and close the connection with the broker
   */

   }
