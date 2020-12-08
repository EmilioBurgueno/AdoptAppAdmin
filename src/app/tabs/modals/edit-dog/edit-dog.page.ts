import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dog } from 'src/models/dog.model';
import { ModalController, AlertController, NavParams, LoadingController, ActionSheetController } from '@ionic/angular';
import { DogService } from 'src/app/services/dog.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';


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
              private actionSheetCtrl: ActionSheetController,
              private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.initForm();
    const dID = this.navParams.get('dID');
    this.getDog(dID);
  }

  getDog(dId: string) {
    this.dogService.getDog(dId).subscribe((dog) => {
      this.dog = dog as Dog;
      this.displayPhoto = this.dog.profilepic;
      this.patchForm();
    });
  }

  async updateDog() {
    await this.presentLoading('Guardando el perfil...');
    //console.log(this.editDogForm);
    if (this.editDogForm.valid) {
      const updatedDog = {
        status: this.dog.status,
        idDogPound: this.dog.idDogPound,
        ...this.editDogForm.value
      };
      console.log(updatedDog);
      try {
        await this.dogService.updateDog(this.dog.id.toString(), updatedDog, this.file);
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
      coat: this.dog.coat,
      fplace: this.dog.fplace,
      found: this.dog.found,
      behaviourSenior: this.dog.behaviourSenior,
      behaviourKids: this.dog.behaviourKids,
      behaviourDogs: this.dog.behaviourDogs,
      behaviourCats: this.dog.behaviourCats,
      color: this.dog.color,
      description: this.dog.description,
      collar: this.dog.collar,
      profilepic: this.dog.profilepic
    });
    //console.log(this.dog);
  }

  initForm() {
    this.editDogForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      coat: new FormControl(null, [Validators.required]),
      fplace: new FormControl(null, [Validators.required]),
      found: new FormControl(null, [Validators.required]),
      behaviourSenior: new FormControl(null, [Validators.required]),
      behaviourKids: new FormControl(null, [Validators.required]),
      behaviourDogs: new FormControl(null, [Validators.required]),
      behaviourCats: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      description: new FormControl(null, ),
      collar: new FormControl(null, ),
      profilepic: new FormControl(null)
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

  async takePicture(source: CameraSource): Promise<boolean> {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });
    //console.log('1');
    const base64 = `data:image/${image.format};base64, ${image.base64String}`;
    this.displayPhoto = this.sanitizer.bypassSecurityTrustResourceUrl(base64);
    //console.log('2');
    const imageBlob = this.base64toBlob(image.base64String);
    this.file = new File([imageBlob], 'test.jpeg', { type: 'image/jpeg' });
    this.editDogForm.get('profilepic').setValue('Foto Tomada!');
    this.editDogForm.get('profilepic').updateValueAndValidity();
    //console.log('3');
    return;
  }

  base64toBlob(dataURI: string) {
    //console.log('4');
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });

    //console.log('5');
    return blob;
  }

  resetView(): void {
    this.file = undefined;
    this.displayPhoto = undefined;
  }

  async removePicture(): Promise<boolean> {
    await this.presentLoading('Removiendo tu Foto de Perfil...');
    //console.log('1');
    if (this.dog.profilepic) {
      //console.log(this.dog.profilepic);
      //console.log(this.dog.id);
      //console.log('posible problema1');
      this.dogService.removeProfilePicture(this.dog.id.toString()).then(() => {
        //console.log('posible problema2');
        this.dismissLoading();
        this.presentAlert('Hecho!', 'Tu foto de perfil ha sido removida con exito!');
        //console.log('2');
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('Error', error.message);
        //console.log('3');
      });
    } else {
      this.dismissLoading();
      this.presentAlert('Error', `No tienes foto de perfil.`);
      //console.log('4');
    }

    return;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiar Foto de Perfil',
      buttons: [
        {
          text: 'Remover Foto Actual',
          handler: () => this.removePicture()
        },
        {
          text: 'Tomar Foto',
          handler: () => this.takePicture(CameraSource.Camera)
        },
        {
          text: 'Elegir de Galeria',
          handler: () => this.takePicture(CameraSource.Photos)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
}
