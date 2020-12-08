import { Component, Input, OnInit } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { NavController, AlertController, LoadingController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-dog-profile',
  templateUrl: './create-dog-profile.page.html',
  styleUrls: ['./create-dog-profile.page.scss'],
})
export class CreateDogProfilePage implements OnInit {
  @Input() uID: string;

  dog: any;
  displayPhoto: any;
  file: any;
  user: any;
  //userId: string;
  createDogForm: FormGroup;
  loadingIndicator;
  loading = false;


  constructor(private dogService: DogService,
              private navCtrl: NavController,
              private router: Router,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private navParams: NavParams,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    //this.uID = this.activatedRoute.snapshot.paramMap.get('uID');
    //const uID = this.navParams.get('uID');
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    //this.getUser(this.uID);
    this.initForm();
  }

  initForm() {
    this.createDogForm = new FormGroup({
      name: new FormControl(null),
      sex: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      color: new FormControl (null,[Validators.required]),
      fplace: new FormControl(null, [Validators.required]),
      found: new FormControl(null, [Validators.required]),
      coat: new FormControl(null),
      behaviourSenior: new FormControl(null),
      behaviourKids: new FormControl(null),
      behaviourDogs: new FormControl(null),
      behaviourCats: new FormControl(null),
      description: new FormControl(null),
      collar: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      profilepic: new FormControl(null)
    });
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user as User;
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
      const color = this.createDogForm.controls.color.value;
      const fplace = this.createDogForm.controls.fplace.value;
      const found = this.createDogForm.controls.found.value;
      const description = this.createDogForm.controls.description.value;
      const collar = this.createDogForm.controls.collar.value;
      const coat = this.createDogForm.controls.coat.value;
      const behaviourSenior = this.createDogForm.controls.behaviourSenior.value;
      const behaviourKids = this.createDogForm.controls.behaviourKids.value;
      const behaviourDogs = this.createDogForm.controls.behaviourDogs.value;
      const behaviourCats = this.createDogForm.controls.behaviourCats.value;
      const status = this.createDogForm.controls.status.value;
      const profilepic = this.createDogForm.controls.profilepic.value;

      console.log(this.user);
      //const IdDogPound = this.user.id;
      const idDogPound = this.user.id;
      try {
        const dog = {
          name,
          sex,
          size,
          breed,
          age,
          color,
          fplace,
          found,
          description,
          collar,
          coat,
          behaviourSenior,
          behaviourKids,
          behaviourDogs,
          behaviourCats,
          status,
          profilepic,
          idDogPound
        };

        await this.dogService.createDog(dog, this.file);
        this.dismissLoading();
        this.presentAlertConfirm('Felicidades!', 'El perro esta listo para ser adoptado!');
        this.createDogForm.reset();
        this.resetView();
        console.log(this.dog);
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
            this.navCtrl.navigateRoot(['tabs/feed']);
          }
        }
      ]
    });

    await alert.present();
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    });

    const base64 = `data:image/${image.format};base64, ${image.base64String}`;
    this.displayPhoto = this.sanitizer.bypassSecurityTrustResourceUrl(base64);

    const imageBlob = this.base64toBlob(image.base64String);
    this.file = new File([imageBlob], 'test.jpeg', { type: 'image/jpeg' });

    this.createDogForm.get('profilepic').setValue('Foto tomada!');

    this.createDogForm.get('profilepic').updateValueAndValidity();

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

  resetView(): void {
    this.file = undefined;
    this.displayPhoto = undefined;
  }


}
