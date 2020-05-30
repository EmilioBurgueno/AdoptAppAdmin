import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact-dogpound',
  templateUrl: './contact-dogpound.page.html',
  styleUrls: ['./contact-dogpound.page.scss'],
})
export class ContactDogpoundPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModalContact() {
    await this.modalCtrl.dismiss();
  }
}
