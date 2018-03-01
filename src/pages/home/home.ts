import { ChatServiceProvider } from './../../providers/chat/chat.service';
import { Chat } from './../../models/chat.model';
import { ChatPage } from './../chat/chat';
import { WelcomePage } from './../welcome/welcome';
import { AuthServiceProvider } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../models/user.model';
import { UserServiceProvider } from './../../providers/user/user.service';
import { FirebaseListObservable } from 'angularfire2';
import { HttpModule } from '@angular/http';
import firebase from 'firebase';
import 'rxjs/add/operator/first';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  chats: FirebaseListObservable<Chat[]>;
  users: FirebaseListObservable<User[]>;
  view: string = 'chats';

  constructor(public chatService: ChatServiceProvider, public authService: AuthServiceProvider, public userService: UserServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.chats = this.chatService.chats;
    this.users = this.userService.users;
    console.log(this.chats);
  }
  onChatCreate(recipientUser: User): void {
    this.userService.currentUser.first().subscribe(
      (currentUser: User) => this.chatService.getDeepChat(currentUser.$key, recipientUser.$key).
        first().subscribe((chat: Chat) => {
          console.log("username do recipient user", recipientUser);

          if (chat.hasOwnProperty(`$value`)) {
            let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;
            let chat1 = new Chat('', timestamp, recipientUser.name, '');
            this.chatService.create(chat1, currentUser.$key, recipientUser.$key);
            let chat2 = new Chat('', timestamp, currentUser.name, '');
            this.chatService.create(chat1, recipientUser.$key, currentUser.$key);
          }
        })
    )
    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser
    });
  }
  onLogout(): void {
    this.authService.logout();
    this.navCtrl.setRoot(WelcomePage);
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

onChatOpen(chat:Chat) : void{
  let recipientUserId :string = chat.$key;
  this.userService.get(recipientUserId).first().subscribe(
    (user:User) =>{
      this.navCtrl.push(ChatPage,{
        recipientUser : user
      });
    }
  );
}


}


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
