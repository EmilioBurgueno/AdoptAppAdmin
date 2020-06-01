import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { EditProfilePage } from '../modals/edit-profile/edit-profile.page';
import { Dog } from 'src/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { DogProfilePage } from '../modals/dog-profile/dog-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;
  favourites: Dog[] = [];

  constructor(private authService: AuthService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private dogService: DogService) { }

  async ngOnInit() {
    await this.authService.user$.subscribe((user) => {
      this.user = user
    })
    setTimeout(() => this.getFavourites(), 5000)
  }

  getFavourites() {
    const favDogs = this.user.favourites;
    favDogs.forEach(favDog => {
      this.dogService.getDog(favDog).subscribe((dog: any) => {
        this.favourites.push(dog);
      })
    });
  }

  goToDesc(dogId: String) {
    this.navCtrl.navigateForward(['tabs', 'feed', dogId])
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

  async openModalDogProfile(dog: string) {
    const modal = await this.modalCtrl.create({
      component: DogProfilePage,
      componentProps: {
        uID: dog
      }
    });
    return await modal.present();
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
