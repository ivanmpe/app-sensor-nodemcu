import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinosPage } from './pinos';

@NgModule({
  declarations: [
    PinosPage,
  ],
  imports: [
    IonicPageModule.forChild(PinosPage),
  ],
})
export class PinosPageModule {}
