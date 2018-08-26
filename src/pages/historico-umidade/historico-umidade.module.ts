import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoUmidadePage } from './historico-umidade';

@NgModule({
  declarations: [
    HistoricoUmidadePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoUmidadePage),
  ],
})
export class HistoricoUmidadePageModule {}
