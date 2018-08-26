import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UmidadePage } from './umidade';

@NgModule({
  declarations: [
    UmidadePage,
  ],
  imports: [
    IonicPageModule.forChild(UmidadePage),
  ],
})
export class UmidadePageModule {}
