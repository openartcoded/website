import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { FormContact } from '@core/models/form-contact';
import { ConfigInitService } from 'src/app/config-init-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  basePath: string;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private configService: ConfigInitService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.basePath = configService.getConfig()['BACKEND_URL'];
    } else {
      this.basePath = configService.getConfig()['SERVER_BACKEND_URL'];
    }
  }

  public findAll(): Observable<FormContact[]> {
    return this.http.post<FormContact[]>(`${this.basePath}/api/form-contact/find-all`, {});
  }

  submit(formContact: FormContact): Observable<any> {
    return this.http.post<any>(`${this.basePath}/api/form-contact/submit`, formContact);
  }
}
