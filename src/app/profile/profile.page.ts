import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthService,
              private navCtrl: NavController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }


  async deleteAccountAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Account',
      message: 'Do you really want to delete your account?',
      buttons: [
        {
          text:'No',

        },
        {
          text: 'Yes'
        }]
    });

    await alert.present();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot(['']);
    });
  }

}
