import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { EditProfilePage } from '../modals/edit-profile/edit-profile.page';
import { Dog } from 'src/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { DogProfilePage } from '../modals/dog-profile/dog-profile.page';
import { DeleteProfilePage } from '../modals/delete-profile/delete-profile.page';

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
    this.navCtrl.navigateForward(['tabs', 'feed', 'dogprofile', dogId])
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

  async openModalDelete() {
    const modal = await this.modalCtrl.create({
      component: DeleteProfilePage,
      componentProps: {
        uID: this.user.id
      }
    });
    return await modal.present();
  }
}
