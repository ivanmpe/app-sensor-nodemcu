import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoTemperaturaPage } from '../historico-temperatura/historico-temperatura';
import { HistoricoUmidadePage } from '../historico-umidade/historico-umidade';
import { AngularFireDatabase } from 'angularfire2/database';
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
    path = '/mqtt';
    port = 33728;



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
        this.onMessage();

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

    subscribe()
    {
        var topic = "sensor/temperatura";
        var topic1 = "sensor/umidade";
        var qos = 0;
    
        this.client.subscribe(topic,{qos: qos});
        this.client.subscribe(topic1,{qos:qos});
    } 

    onConnected() {
        this.subscribe();
        this.presentToast('MQTT conectado com sucesso. ');
    }

    sendMessage(message: string) {
        let packet = new Paho.MQTT.Message(message);
        packet.destinationName = "sensor/temperatura";
        this.client.send(packet);
    }


     onMessage() {
        
       this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
         console.log("Message Arrived: " + message.payloadString);
         console.log("Topic: " + message.destinationName);
         console.log("QoS: " + message.qos);
         console.log("Retained: " + message.retained);
      
         if(message.destinationName == 'sensor/temperatura'){
            this.temperatura = message.payloadString
         }else if( message.destinationName == 'sensor/umidade'){
            this.umidade = message.payloadString
         }
       };
     }


    onConnectionLost() {
        this.client.onConnectionLost = (responseObject: Object) => {
            this.presentToast('Connection lost : ' + JSON.stringify(responseObject));
            console.log('Connection lost : ' + JSON.stringify(responseObject));
        };
        this.presentToast('MQTT Desconectado. ');
    }

    presentToast(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
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
