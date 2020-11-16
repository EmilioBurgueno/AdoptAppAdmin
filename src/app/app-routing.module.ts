import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
      }
    ]
  },
  {
    path: 'tabs',
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
      }
    ]
  },
  {
    path: 'deleteaccount',
    loadChildren: () => import('./settingssub/deleteaccount/deleteaccount.module').then( m => m.DeleteaccountPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./settingssub/delete/delete.module').then( m => m.DeletePageModule)
  },
  // {
  //   path: 'editprofile',
  //   loadChildren: () => import('./settings/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  // },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
