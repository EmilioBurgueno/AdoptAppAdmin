import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.model';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  @Input() uID: string;

  editUserForms: FormGroup;

  user: User;

  loadingIndicator;
  loading = false;

  constructor( private alertCtrl: AlertController,
               private userService: UserService,
               private navParams: NavParams,
               private loadingCtrl: LoadingController,
              private navCtrl: NavController
  ) { }

  ngOnInit() {
    const uID = this.navParams.get('uID');
    console.log("Here 1?");
    this.getUser(uID);
    console.log("Here 2?");
    console.log("Here 3?");
    this.initForm();
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user as User;
      this.patchForm();
    })
  }

  async updateUser() {
    await this.presentLoading('Creando tu cuenta...');
    if (this.editUserForms.valid) {
      const updatedUser = {
        email: this.user.email,
        ...this.editUserForms.value
      };

      try {
        await this.userService.updateUser(this.user.id.toString(), updatedUser)
        this.dismissLoading();
        this.presentAlertConfirm('¡Exito!', 'Tu perfil ha sido modificado exitosamente.');
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
    this.editUserForms.patchValue({
      nameDogPound: this.user.nameDogPound,
      address: this.user.address,
      phone: this.user.phone
    })
  }

  initForm() {
    this.editUserForms = new FormGroup({
      nameDogPound: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
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
            this.goBack();
          }
        }
      ]
    });

    await alert.present();
  }

  goBack(){
    this.navCtrl.navigateBack;
  }

}
