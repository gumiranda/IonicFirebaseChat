import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth/auth.service';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

/*  <button ion-button icon-only (click) ="onLogout()">
<ion-icon name="exit"></ion-icon>
</button>
*/
 @Input() title: string;

  constructor(public alertCtrl: AlertController, public authService: AuthServiceProvider,
    public app: App, public menuCtrl: MenuController) {
  super(alertCtrl,authService,app,menuCtrl);
  }

}
