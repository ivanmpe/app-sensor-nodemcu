import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoTemperaturaPage } from './historico-temperatura';

@NgModule({
  declarations: [
    HistoricoTemperaturaPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoTemperaturaPage),
  ],
})
export class HistoricoTemperaturaPageModule {}
