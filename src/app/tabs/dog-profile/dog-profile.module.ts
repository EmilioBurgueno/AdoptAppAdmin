import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogProfilePageRoutingModule } from './dog-profile-routing.module';

import { DogProfilePage } from './dog-profile.page';
import { EditDogPage } from '../modals/edit-dog/edit-dog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DogProfilePageRoutingModule
  ],
  declarations: [DogProfilePage, EditDogPage],
  entryComponents: [EditDogPage]
})
export class DogProfilePageModule {}
