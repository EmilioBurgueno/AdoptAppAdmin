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
      //profilepic: this.dog.profilepic
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
      //profilepic: new FormControl(null, [Validators.required])
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

  // async getPicture(source: CameraSource): Promise<boolean> {
  //   const image = await Plugins.Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64,
  //     source
  //   });

  //   const base64 = `data:image/${image.format};base64, ${image.base64String}`;
  //   this.displayPhoto = this.sanitizer.bypassSecurityTrustResourceUrl(base64);

  //   const imageBlob = this.base64toBlob(image.base64String);
  //   const file = new File([imageBlob], 'test.jpeg', { type: 'image/jpeg' });

  //   this.editDogForm.get("profilepic").setValue("Foto tomada!");
  //   this.editDogForm.get("profilepic").updateValueAndValidity();

  //   await this.presentLoading('Cambiando la foto de perfil del perro...');

  //   this.dogService.uploadDogImage(this.dog.id, file).then(() => {
  //     //this.afStorage.ref(`dogs/${this.dog.id}/profilepic.jpeg`).getDownloadURL().toPromise();
  //     //this.dog.profilepic = this.afStorage.ref(`dogs/${this.dog.id}/profilepic.jpeg`).getDownloadURL().toPromise();
  //     console.log(this.afStorage.ref(`dogs/${this.dog.id}/profilepic.jpeg`).getDownloadURL().toPromise());
  //     this.dismissLoading();
  //     this.presentAlert('Hecho!', 'La foto de perfil del perro ha sido cambiada con exito.');
  //     console.log(this.dog.profilepic)});
  //   // }).catch((error) => {
  //   //   this.dismissLoading();
  //   //   console.log(error);
  //   //   //this.presentAlert('Error', error.message);
  //   // });

  //   return;
  // }

  // base64toBlob(dataURI: string) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: 'image/jpeg' });

  //   return blob;
  // }

  // removePicture(): Promise<boolean> {

  //   this.dogService.removeProfilePicture(this.dog.id.toString()).then(() => {
  //     console.log('Se ha removido exitosamente.');
  //   }).catch((error) => {
  //     console.log('Error');
  //   });


  //   return;
  // }

  // async presentActionSheet() {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Cambiar Foto de Perfil',
  //     buttons: [
  //       {
  //         text: 'Remover Foto Actual',
  //         handler: () => this.removePicture()
  //       },
  //       {
  //         text: 'Tomar Foto',
  //         handler: () => this.getPicture(CameraSource.Camera)
  //       },
  //       {
  //         text: 'Escoger de Galeria',
  //         handler: () => this.getPicture(CameraSource.Photos)
  //       },
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

}
