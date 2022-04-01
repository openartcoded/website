import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, SecurityContext } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from './features/layout/layout.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MarkdownModule } from 'ngx-markdown';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { PwaService } from '@core/service/pwa.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfigInitService } from './config-init-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatSidenavModule,
    FlexLayoutModule,
    ScrollingModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
    MatIconModule,
    ReactiveFormsModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    LayoutModule,
    ServiceWorkerModule.register('safety-worker.js', { enabled: environment.production }), // to re enable: replace safety-worker.js by ngsw-worker.js
  ],
  providers: [
    PwaService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    ConfigInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigInitService) => {
        return async () => {
          await configService.load();
          return configService.getConfig();
        };
      },
      multi: true,
      deps: [ConfigInitService],
    },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
