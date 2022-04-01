import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YasguiComponent } from './yasgui/yasgui.component';

const routes: Routes = [
  {
    path: '',
    component: YasguiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YasguiRoutingModule {}
