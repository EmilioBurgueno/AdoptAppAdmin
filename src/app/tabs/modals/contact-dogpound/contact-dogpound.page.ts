import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact-dogpound',
  templateUrl: './contact-dogpound.page.html',
  styleUrls: ['./contact-dogpound.page.scss'],
})
export class ContactDogpoundPage implements OnInit {

  loadingIndicator;
  loading = false;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async solicitudFake() {
    await this.presentLoading('Enviando solicitud...');
    this.dismissLoading();
    this.presentAlertConfirm('¡Exito!', 'Tu solicitud de adopción se ha enviado correctamente!');

  }

  async presentLoading(body: string) {
    this.loadingIndicator = await this.loadingCtrl.create({
      message: body
    });
    this.loading = true;
    await this.loadingIndicator.present();
  }

  async dismissLoading() {
    this.loading = false;
    await this.loadingIndicator.dismiss();
  }

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.closeModalContact();
          }
        }
      ]
    });

    await alert.present();
  }

  async closeModalContact() {
    await this.modalCtrl.dismiss();
  }
}
