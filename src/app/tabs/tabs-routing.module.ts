import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
          },
          
        ]
      },
      {
        path: 'create-dog-profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./create-dog-profile/create-dog-profile.module').then( m => m.CreateDogProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full'
  },
  {
    path: 'contact-dogpound',
    loadChildren: () => import('./modals/contact-dogpound/contact-dogpound.module').then( m => m.ContactDogpoundPageModule)
  },
  {
    path: 'edit-credentials',
    loadChildren: () => import('./modals/edit-credentials/edit-credentials.module').then( m => m.EditCredentialsPageModule)
  },
  {
    path: 'active-submissions',
    loadChildren: () => import('./modals/active-submissions/active-submissions.module').then( m => m.ActiveSubmissionsPageModule)
  },
  {
    path: 'delete-profile',
    loadChildren: () => import('./modals/delete-profile/delete-profile.module').then( m => m.DeleteProfilePageModule)
  },
  {
    path: 'dogprofile:id',
      loadChildren: () => import('./modals/dog-profile/dog-profile.module').then( m => m.DogProfilePageModule)
  }// Emilio ??? Me preguntaste algo no? Ahh NO
  // },
  // {
  //   path: 'edit-profile',
  //   loadChildren: () => import('./modals/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
