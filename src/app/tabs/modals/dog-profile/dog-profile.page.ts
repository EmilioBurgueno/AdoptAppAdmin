import { Component, OnInit, Input } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { AlertController, NavController, ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EditDogPage } from '../edit-dog/edit-dog.page';
import { ContactDogpoundPage } from '../contact-dogpound/contact-dogpound.page';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.page.html',
  styleUrls: ['./dog-profile.page.scss'],
})
export class DogProfilePage implements OnInit {


  @Input() dID: string;
  dog: any;
  detail: any[];
  user: any;
  dogId: string;

  constructor(private dogService: DogService,
              private authService: AuthService,
              private userService: UserService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private activatedRouter: ActivatedRoute,
              private modalCtrl: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    // this.dogId = this.activatedRouter.snapshot.paramMap.get('dogId');
    // this.getDog(this.dogId);
    const dID = this.navParams.get('dID');
    this.getDog(dID)
    this.authService.user$.subscribe((user) => {
      this.user = user
    })
  }

  deleteDog(dogId: string) {
    this.removePicture();
    this.dogService
      .deleteDog(dogId)
      .then(() => {
        console.log(dogId);
        this.presentAlertConfirm('¡Exito!', 'El perfil del perro ha sido eliminado');
      })
      .catch((error) => {
        this.presentAlert('Algo malo ha pasado', error.message);
      });
  }

  removePicture(): Promise<boolean> {

    this.dogService.removeProfilePicture(this.dog.id.toString()).then(() => {
      console.log('Se ha removido exitosamente.');
    }).catch((error) => {
      console.log('Error');
    });
    return;
  }

  getDog(dogId: string) {
    this.dogService.getDog(dogId).subscribe((dogprofile: any) => {
      if (!dogprofile) {
        this.navCtrl.navigateRoot(['tabs/feed']);
      }
      this.dog = dogprofile;
    });
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

  async openModalEdit(dog: string) {
    const modal = await this.modalCtrl.create({
      component: EditDogPage,
      componentProps: {
        dID: dog
      }
    });
    return await modal.present();
  }

  async openModalContact(dog: string) {
    const modal = await this.modalCtrl.create({
      component: ContactDogpoundPage,
      componentProps: {
        dID: dog
      }
    });
    return await modal.present();
  }

  async goBack(){
    await this.modalCtrl.dismiss();
  }

  toggleLike() {
    if (this.user.favourites.includes(this.dog.id)) {
      this.user.favourites = this.user.favourites.filter((id: string) => id !== this.dog.id)

      this.userService.unfavDog(this.user, this.dog.id).then(() => {
        console.log('disliked');
      }).catch((error) => {
        console.log(error);
      })
    } else {
      this.user.favourites.push(this.dog.id);

      this.userService.favDog(this.user, this.dog.id).then(() => {
        console.log('liked');
      }).catch((error) => {
        console.log(error);
      })
    }
  }
}


