import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConsentComponent } from './consent/consent.component';
@NgModule({
  declarations: [SidenavComponent, ErrorPageComponent, ConsentComponent],
  exports: [SidenavComponent, ErrorPageComponent, ConsentComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    RouterModule,
    MatDialogModule,
  ],
})
export class LayoutModule {}
