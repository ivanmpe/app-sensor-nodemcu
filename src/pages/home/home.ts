import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoTemperaturaPage } from '../historico-temperatura/historico-temperatura';
import { HistoricoUmidadePage } from '../historico-umidade/historico-umidade';
//import {NgxMqttClientModule} from 'ngx-mqtt-client';
//import {ConnectionStatus, MqttService, SubscriptionGrant} from 'ngx-mqtt-client';
//import {IClientOptions} from 'mqtt';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import {Paho} from 'ng2-mqtt/mqttws31';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    temperatura: any;
    umidade: string;
    public db: firebase.database.Reference;
    client;
    path = '/mqtt/ivanifce2018'

    constructor(public navCtrl: NavController, database: AngularFireDatabase ) {
      
    }


    ionViewDidLoad() {
        this.client = new Paho.MQTT.Client('test.mosquitto.org', 8080, this.path);
        this.onMessage();
        this.client.connect({onSuccess: this.onConnected.bind(this)});


        this.db = firebase.database().ref('umidade/');
        this.db.on('value', umidadesList => {
            let temp = [];
            umidadesList.forEach(umidade => {
                temp.push(umidade.val());
                return false;
            });
            this.umidade = temp[temp.length - 1];
        });


        this.db = firebase.database().ref('temperatura/');
        this.db.on('value', temperaturaList => {
            let temp = [];
            temperaturaList.forEach(temperatura => {
                temp.push(temperatura.val());
                return false;
            });
            this.temperatura = temp[temp.length - 1];
        });


        console.log('ionViewDidLoad HomePage');
    }

  

    onConnected() {
        console.log("Connected");
        this.client.subscribe("ivanifce2018/sensor/temperatura");
        this.sendMessage('30');
      }
    
      sendMessage(message: string) {
        let packet = new Paho.MQTT.Message(message);
        packet.destinationName = "ivanifce2018/sensor/temperatura";
        this.client.send(packet);
      }
        
      onMessage() {
        this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
          console.log('Temperatura : ' + message.payloadString);
            this.temperatura = message.payloadString
        };
      }
    
      onConnectionLost() {
        this.client.onConnectionLost = (responseObject: Object) => {
          console.log('Connection lost : ' + JSON.stringify(responseObject));
        };
      }



    historicoTemperatura() {
        this.navCtrl.push(HistoricoTemperaturaPage);
    }
    historicoUmidade() {
        this.navCtrl.push(HistoricoUmidadePage);
    }

}
