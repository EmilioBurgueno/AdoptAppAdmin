import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DogProfilePage } from '../modals/dog-profile/dog-profile.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  Dogs: Dog[] = [];
  user: any;

  constructor(private dogService: DogService,
              private authService: AuthService,
              private userService: UserService,
              private navCtrl: NavController,
              private modalCtrl: ModalController
              ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user
    })
   this.getDogs();
  }

  getDogs() {
    this.dogService.getDogs().subscribe(dogs => {
      this.Dogs = dogs;
    });
  }

  goToDesc(dogId: String) {
    this.navCtrl.navigateForward(['tabs', 'feed', 'dogprofile', dogId])
  }

  async openModalDogProfile(dogId: string) {
    const modal = await this.modalCtrl.create({
      component: DogProfilePage,
      componentProps: {
        uID: dogId
      }
    });
    return await modal.present();
  }

  toggleLike(dogId: string) {
    if (this.user.favourites.includes(dogId)) {
      this.user.favourites = this.user.favourites.filter((id: string) => id !== dogId)

      this.userService.unfavDog(this.user, dogId).then(() => {
        console.log('disliked');
      }).catch((error) => {
        console.log(error);
      })
    } else {
      this.user.favourites.push(dogId);

      this.userService.favDog(this.user, dogId).then(() => {
        console.log('liked');
      }).catch((error) => {
        console.log(error);
      })
    }
  }

}
