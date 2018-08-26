import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TemperaturaPage } from '../temperatura/temperatura';
import { UmidadePage} from '../umidade/umidade';
import { PinosPage } from '../pinos/pinos';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TemperaturaPage;
  tab2Root = UmidadePage;
  tab3Root = PinosPage;
  tab4Root = ContactPage;


  constructor() {

  }
}
