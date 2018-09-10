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
import { Paho } from 'ng2-mqtt/mqttws31';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    temperatura: any;
    umidade: string;
    public db: firebase.database.Reference;
    client;
    host = 'm13.cloudmqtt.com';
    path = '/mqtt/ivanifce2018';
    port = 33728;
    client2;


    options = {
        useSSL: true,
        userName: "xmvxeajy",
        password: "_rdhkvlq9-aB",
        onSuccess: this.onConnected.bind(this)
    }

    constructor(public navCtrl: NavController, database: AngularFireDatabase, public toastCtrl: ToastController) {

    }


    ionViewDidLoad() {
        
        this.client = new Paho.MQTT.Client(this.host, this.port, this.path);
        this.client.connect(this.options);
        this.mqttTemperatura();
        //this.mqttUmidade();

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
       this.client.subscribe("sensor/temperatura");
       this.presentToast('mqtt conectado');
    }

    sendMessage(message: string) {
        let packet = new Paho.MQTT.Message(message);
        packet.destinationName = "sensor/temperatura";
        this.client.send(packet);
    }


    mqttTemperatura() {
            this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
            console.log('Temperatura : ' + message.payloadString);
            this.temperatura = message.payloadString
        };
    }

    /*mqttUmidade() {
        this.client.subscribe("sensor/umidade");
        this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
            console.log('Umidade : ' + message.payloadString);
            this.umidade = message.payloadString
        };
    }*/
    /* onMessage() {
       this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
         console.log('Temperatura : ' + message.payloadString);
           this.temperatura = message.payloadString
       };
     }*/
   
    
    onConnectionLost() {
        this.client.onConnectionLost = (responseObject: Object) => {
            this.presentToast('Connection lost : ' + JSON.stringify(responseObject));

            console.log('Connection lost : ' + JSON.stringify(responseObject));
        };
    }

    presentToast(msg: string) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 1000
        });
        toast.present();
      }

    historicoTemperatura() {
        this.navCtrl.push(HistoricoTemperaturaPage);
    }
    historicoUmidade() {
        this.navCtrl.push(HistoricoUmidadePage);
    }

}
