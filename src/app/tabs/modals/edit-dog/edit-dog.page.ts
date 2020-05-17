import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dog } from 'src/models/dog.model';
import { ModalController, AlertController, NavParams, LoadingController } from '@ionic/angular';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.page.html',
  styleUrls: ['./edit-dog.page.scss'],
})
export class EditDogPage implements OnInit {

  @Input() nID: string;

  editDogForm: FormGroup;
  loadingIndicator;
  loading = false;
  dog: Dog;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private dogService: DogService) { }

  ngOnInit() {
    const nID = this.navParams.get('nID');
    this.getDog(nID);
    this.initForm();
  }

  getDog(dogId: string) {
    this.dogService.getDog(dogId).subscribe((dog) => {
      this.dog = dog as Dog;
      this.patchForm();
    })
  }

  async updateDog() {
    await this.presentLoading('Creando el perfil...');
    if (this.editDogForm.valid) {
      const updatedDog = {
        ...this.editDogForm.value
      };

      try {
        await this.dogService.updateDog(this.dog.id.toString(), updatedDog);
        this.dismissLoading();
        this.presentAlertConfirm('¡Exito!', 'El perfil ha sido modificado exitosamente.');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Algo malo ha pasado', error.message);
      }
    } else {
      this.dismissLoading();
      this.presentAlert('Algo malo ha pasado', 'Por favor llena todos los campos correctamente.');
    }
  }

  patchForm() {
    this.editDogForm.patchValue({
      name: this.dog.name,
      size: this.dog.size,
      breed: this.dog.breed,
      age: this.dog.age,
      fplace: this.dog.fplace,
      found: this.dog.found,
      descripcion: this.dog.description,
      collar: this.dog.collar,
      status: this.dog.status,
      profilepic: this.dog.profilepic
    });
  }

  initForm() {
    this.editDogForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      fplace: new FormControl(null, [Validators.required]),
      found: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      collar: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      profilepic: new FormControl(null, [Validators.required])
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
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
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

}
