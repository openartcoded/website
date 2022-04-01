import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemzagramPageComponent } from './memzagram-page/memzagram-page.component';
import { MemzagramRoutingModule } from './memzagram-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MemzagramViewerComponent } from './memzagram-viewer/memzagram-viewer.component';
import { ImageLoaderComponent } from './image-loader/image-loader.component';

@NgModule({
  declarations: [MemzagramPageComponent, MemzagramViewerComponent, ImageLoaderComponent],
  imports: [CommonModule, MemzagramRoutingModule, MatPaginatorModule],
})
export class MemzagramModule {}
