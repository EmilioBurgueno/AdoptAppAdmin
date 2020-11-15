import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any;

  constructor( private userService: UserService,
               private authService: AuthService,
               private modalCtrl: ModalController,
               private navCtrl: NavController
  ) { }

  async ngOnInit() {
    await this.authService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  gotoEditProfile(){
    this.navCtrl.navigateForward(['tabs','settings','editprofile']);
  }

  gotoSeeProfile(){
    this.navCtrl.navigateForward(['tabs','settings','seeprofile']);
  }

  gotoChangePass(){
    this.navCtrl.navigateForward(['tabs','settings','changepass']);
  }

  gotoLogout(){
    this.navCtrl.navigateForward(['tabs','settings','logout']);
  }

}
