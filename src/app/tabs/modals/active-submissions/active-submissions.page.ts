import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';
import { ModalController } from '@ionic/angular';
import { DogProfilePage } from '../dog-profile/dog-profile.page';
import { AuthService } from 'src/app/services/auth.service';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-active-submissions',
  templateUrl: './active-submissions.page.html',
  styleUrls: ['./active-submissions.page.scss'],
})
export class ActiveSubmissionsPage implements OnInit {
  
  Dogs: Dog[] = [];
  user: any;
  actives: Dog[] = [];

  constructor(private modalCtrl: ModalController,
    private dogService: DogService,
    private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.user$.subscribe((user) => {
      this.user = user
    })
    setTimeout(() => this.getFavourites(), 5000)
  }

  getFavourites() {
    const favDogs = this.user.actives;
    favDogs.forEach(favDog => {
      this.dogService.getDog(favDog).subscribe((dog: any) => {
        this.actives.push(dog);
      })
    });
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
