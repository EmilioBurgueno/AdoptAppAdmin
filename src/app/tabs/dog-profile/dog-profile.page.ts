import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EditDogPage } from '../modals/edit-dog/edit-dog.page';
import { ContactDogpoundPage } from '../modals/contact-dogpound/contact-dogpound.page';

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.page.html',
  styleUrls: ['./dog-profile.page.scss'],
})
export class DogProfilePage implements OnInit {

  dog: any;
  detail: any[];

  constructor(private dogService: DogService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private activatedRouter: ActivatedRoute,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  goToDogDetails(dogId: string) {
    this.navCtrl.navigateForward(['tabs', 'dog-profile', 'dog-detail',])
  }

  deleteDog(dogId: string) {
    this.dogService
      .deleteDog(dogId)
      .then(() => {
        console.log(dogId);
        this.presentAlertConfirm('¡Exito!', 'El perfil del perro ha sido eliminado');
      })
      .catch((error) => {
        this.presentAlert('Algo malo ha pasado', error.message);
      });
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Listo']
    });

    await alert.present();
  }

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.navCtrl.navigateRoot(['tabs/feed']);
          }
        }
      ]
    });

    await alert.present();
  }

  async openModalEdit(dog: string) {
    const modal = await this.modalCtrl.create({
      component: EditDogPage,
      componentProps: {
        dID: dog
      }
    });
    return await modal.present();
  }

  async openModalContact() {
    const modal = await this.modalCtrl.create({
      component: ContactDogpoundPage,
    });
    return await modal.present();
  }
}


