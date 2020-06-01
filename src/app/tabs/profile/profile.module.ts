import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { EditCredentialsPage } from '../modals/edit-credentials/edit-credentials.page';
import { DogProfilePage } from '../modals/dog-profile/dog-profile.page';
import { DogProfilePageModule } from '../modals/dog-profile/dog-profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    DogProfilePageModule
  ],
  declarations: [ProfilePage, EditCredentialsPage],
  entryComponents: [EditCredentialsPage]
})
export class ProfilePageModule {}
