import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { EditProfilePage } from '../modals/edit-profile/edit-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(private authService: AuthService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService) { }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user
    })
  }


  async deleteAccountAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete your account?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.userService.deleteUser(this.user);
            this.authService.deleteUser();
          }
        }]
    });

    await alert.present();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot(['']);
    });
  }

  async openModalEdit(user: string) {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        uID: user
      }
    });
    return await modal.present();
  }

}
