import { UserServiceProvider } from './../../providers/user/user.service';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';

/**
 * Generated class for the UserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
currentUser:User;
canEdit:boolean=false;
  constructor(public authService:AuthServiceProvider  ,public userService:UserServiceProvider   ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.userService.currentUser.subscribe(
      (user:User)=>{
        this.currentUser = user;
      }
    )
    console.log('ionViewDidLoad UserProfilePage');
  }

}
