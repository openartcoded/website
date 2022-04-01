import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './features/layout/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/curriculum/curriculum.module').then((m) => m.CurriculumModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'policy',
    loadChildren: () => import('./features/policy/policy.module').then((m) => m.PolicyModule),
  },
  {
    path: 'gallery',
    loadChildren: () => import('./features/memzagram/memzagram.module').then((m) => m.MemzagramModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'yasgui',
    loadChildren: () => import('./features/yasgui/yasgui.module').then((m) => m.YasguiModule),
  },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking', // this should be kept as is for keycloak
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
