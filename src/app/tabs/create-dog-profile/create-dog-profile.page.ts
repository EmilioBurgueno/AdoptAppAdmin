import { Component, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import {Plugins, CameraResultType , CameraSource} from '@capacitor/core';

@Component({
  selector: 'app-create-dog-profile',
  templateUrl: './create-dog-profile.page.html',
  styleUrls: ['./create-dog-profile.page.scss'],
})
export class CreateDogProfilePage implements OnInit {

  createDogForm: FormGroup;
  loadingIndicator;
  loading = false;

  constructor(private dogService: DogService,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.createDogForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
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

  async onSubmit(): Promise<void> {
    await this.presentLoading('Creando perfil...');

    if (this.createDogForm.valid) {
      const name = this.createDogForm.controls.name.value;
      const sex = this.createDogForm.controls.sex.value;
      const size = this.createDogForm.controls.size.value;
      const breed = this.createDogForm.controls.breed.value;
      const age = this.createDogForm.controls.age.value;
      const fplace = this.createDogForm.controls.fplace.value;
      const found = this.createDogForm.controls.found.value;
      const description = this.createDogForm.controls.description.value;
      const collar = this.createDogForm.controls.collar.value;
      const status = this.createDogForm.controls.status.value;
      const profilepic = this.createDogForm.controls.profilepic.value;

      try {
        const dog = {
          name,
          sex,
          size,
          breed,
          age,
          fplace,
          found,
          description,
          collar,
          status,
          profilepic
        };

        await this.dogService.createDog(dog);
        this.dismissLoading();
        this.presentAlertConfirm('Felicidades!', 'El perfil ha sido creado exitosamente.');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Algo malo ha pasado', error.message);
      }

    } else {
      this.dismissLoading();
      this.presentAlert('Algo malo ha pasado', 'Por favor llena todos los campos correctamente.');
    }
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
            this.navCtrl.navigateRoot(['']);
          }
        }
      ]
    });

    await alert.present();
  }

  // async takePicture() {
  //   const image = await Plugins.Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64,
  //     source: CameraSource.Prompt
  //   });

  //   const base64 = `data:image/${image.format};base64, ${image.base64String}`;
  //   this.displayPhoto = this.sanitizer.bypassSecurityTrustResourceUrl(base64);

  //   const imageBlob = this.base64toBlob(image.base64String);
  //   this.file = new File([imageBlob], 'test.jpeg', { type: 'image/jpeg' });
  // }

  base64toBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });

    return blob;
  }


}
