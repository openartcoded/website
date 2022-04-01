import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemzagramPageComponent } from './memzagram-page/memzagram-page.component';

const routes: Routes = [
  {
    path: '',
    component: MemzagramPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemzagramRoutingModule {}
