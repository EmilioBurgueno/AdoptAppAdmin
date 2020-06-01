import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dog } from 'src/models/dog.model';
import { ModalController, AlertController, NavParams, LoadingController, ActionSheetController } from '@ionic/angular';
import { DogService } from 'src/app/services/dog.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.page.html',
  styleUrls: ['./edit-dog.page.scss'],
})
export class EditDogPage implements OnInit {

  @Input() dID: string;

  editDogForm: FormGroup;
  dog: Dog;
  loadingIndicator;
  loading = false;

  dogProfile: any;
  displayPhoto: any;
  file: any;


  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private dogService: DogService,
              private sanitizer: DomSanitizer,
              private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    const dID = this.navParams.get('dID');
    this.getDog(dID)
    this.initForm();
  }

  getDog(dId: string) {
    this.dogService.getDog(dId).subscribe((dog) => {
      this.dog = dog as Dog;
      this.patchForm();
    });
  }

  async updateDog() {
    await this.presentLoading('Guardando el perfil...');
    if (this.editDogForm.valid) {
      const updatedDog = {
        ...this.editDogForm.value
      };

      try {
        await this.dogService.updateDog(this.dog.id.toString(), updatedDog);
        this.dismissLoading();
        this.presentAlertConfirm('¡Exito!', 'El perfil ha sido modificado exitosamente.');
        this.closeModal();
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
      sex: this.dog.sex,
      size: this.dog.size,
      breed: this.dog.breed,
      age: this.dog.age,
      fplace: this.dog.fplace,
      found: this.dog.found,
      description: this.dog.description,
      collar: this.dog.collar,
      status: this.dog.status,
      profilepic: this.dog.profilepic
    });
  }

  initForm() {
    this.editDogForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      fplace: new FormControl(null, [Validators.required]),
      found: new FormControl(null, [Validators.required]),
      description: new FormControl(null,),
      collar: new FormControl(null,),
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

  async getPicture(source: CameraSource): Promise<boolean> {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });

    const imageBlob = this.base64toBlob(image.base64String);
    const file = new File([imageBlob], 'test.jpeg', { type: 'image/jpeg' });

    await this.presentLoading('Changing your profile picture...');

    this.dogService.uploadDogImage(this.dog.id, file).then(() => {
      console.log(this.dog.profilepic)
      this.dismissLoading();
      this.presentAlert('Done!', 'Your profile picture has been changed successfully.');
    console.log(this.dog.profilepic)
    }).catch((error) => {
      this.dismissLoading();
      this.presentAlert('Error', error.message);
    });

    return;
  }

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

  async removePicture(): Promise<boolean> {
    await this.presentLoading('Removing your profile picture...');

    if (this.dogProfile.profilepic) {
      this.dogService.removeProfilePicture(this.dogProfile.id).then(() => {
        this.dismissLoading();
        this.presentAlert('Done!', 'Your profile picture has been removed successfully.');
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('Error', error.message);
      });
    } else {
      this.dismissLoading();
      this.presentAlert('Error', `You don't have a profile picture yet.`);
    }

    return;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Change Profile Photo',
      buttons: [
        {
          text: 'Remove Current Photo',
          handler: () => this.removePicture()
        },
        {
          text: 'Take Photo',
          handler: () => this.getPicture(CameraSource.Camera)
        },
        {
          text: 'Choose from Library',
          handler: () => this.getPicture(CameraSource.Photos)
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

}
