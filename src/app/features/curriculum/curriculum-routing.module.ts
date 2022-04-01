import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvPageComponent } from './cv-page/cv-page.component';

const routes: Routes = [
  {
    path: '',
    component: CvPageComponent,
  },
  {
    path: 'cv',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurriculumRoutingModule {}
