import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { NavController, ModalController } from '@ionic/angular';
import { DogProfilePage } from '../modals/dog-profile/dog-profile.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  Dogs: Dog[] = [];

  constructor(private dogService: DogService,
              private navCtrl: NavController,
              private modalCtrl: ModalController
              ) {}

  ngOnInit() {
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
}
