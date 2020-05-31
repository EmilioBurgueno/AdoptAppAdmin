import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-credentials',
  templateUrl: './edit-credentials.page.html',
  styleUrls: ['./edit-credentials.page.scss'],
})
export class EditCredentialsPage implements OnInit {

  editUserForm: FormGroup;
  user: User;
  loadingIndicator;
  loading = false;
  public showCurrentPassword: boolean = false;
  public showPassword: boolean = false;
  public showConfirmedPassword: boolean = false;

  constructor(private modalCtrl: ModalController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editUserForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      cPassword: new FormControl(null, [Validators.required]),
      nPassword: new FormControl(null),
      ncPassword: new FormControl(null)
    });
  }

  async updateEmail() {
    await this.presentLoading('Haciendo cambios...');
    if (this.editUserForm.valid) {
      await this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {

          this.authService.changeEmail(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.email.value);
          this.dismissLoading();
          this.presentAlertConfirm('¡Exito!', 'Tu email ha sido cambiado correctamente.');
          this.closeModal();
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('¡Lo sentimos!', 'Ha ocurrido un error.');
      });
    } else {
      this.dismissLoading();
      this.presentAlert('¡Error!', 'Tu contraseña actual no es correcta.');
    }
  }

  async updatePassword() {
    await this.presentLoading('Haciendo cambios...');
    await this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {

      // if (this.editUserForm.controls.nPassword.value === this.editUserForm.controls.ncPassword.value) {
      //   try {
      //     this.authService.changePassword(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.nPassword.value);
      //     this.closeModal();
      //   } catch (error) {
      //     console.log('Se ha producido un error. Intente mas tarde!');
      //   }

      // } else {
      //   console.log('Tus contraseñas no coinciden.');
      // }

      if (this.editUserForm.controls.nPassword.value !== this.editUserForm.controls.ncPassword.value) {
        this.dismissLoading();
        this.presentAlert('¡Error!', 'Tus contraseñas no coinciden.');

      } else if (this.editUserForm.controls.nPassword.value.length < 6) {
        this.dismissLoading();
        this.presentAlert('¡Error!', 'Tu contraseña tiene que tener al menos 6 caracteres.');

      } else {
        try {
          this.authService.changePassword(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.nPassword.value);
          this.dismissLoading();
          this.presentAlertConfirm('¡Exito!', 'Tu contraseña ha sido cambiada correctamente.');
          this.closeModal();
        } catch (error) {
          console.log('Se ha producido un error. Intente mas tarde!');
        }
      }
    }).catch((error) => {
      console.log(error);
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
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  public onCurrentPasswordToggle(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
  public onConfirmPasswordToggle(): void {
    this.showConfirmedPassword = ! this.showConfirmedPassword;
  }
}
