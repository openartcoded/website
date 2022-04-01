import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YasguiComponent } from './yasgui/yasgui.component';
import { YasguiRoutingModule } from './yasgui-routing.module';

@NgModule({
  declarations: [YasguiComponent],
  imports: [CommonModule, YasguiRoutingModule],
})
export class YasguiModule {}
