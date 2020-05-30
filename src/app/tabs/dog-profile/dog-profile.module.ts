import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogProfilePageRoutingModule } from './dog-profile-routing.module';

import { DogProfilePage } from './dog-profile.page';
import { EditDogPage } from '../modals/edit-dog/edit-dog.page';
import { ContactDogpoundPage } from '../modals/contact-dogpound/contact-dogpound.page';
import { ContactDogpoundPageModule } from '../modals/contact-dogpound/contact-dogpound.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DogProfilePageRoutingModule,
    ContactDogpoundPageModule
  ],
  declarations: [DogProfilePage, EditDogPage],
  entryComponents: [EditDogPage, ContactDogpoundPage]
})
export class DogProfilePageModule {}
