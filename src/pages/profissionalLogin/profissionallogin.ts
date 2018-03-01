import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'profissionallogin.html',
})
export class ProfissionalLoginPage {
  signinForm :FormGroup;
  constructor(public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
   let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
   this.signinForm = this.formBuilder.group({
    email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegex)])]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  }

onSubmit() : void{
  
}

}