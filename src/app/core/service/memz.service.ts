import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '@core/models/page';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Memz } from '@core/models/memz';
import { ConfigInitService } from 'src/app/config-init-service';

@Injectable({
  providedIn: 'root',
})
export class MemzService {
  basePath: string;
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private configService: ConfigInitService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.basePath = configService.getConfig()['BACKEND_URL']
    } else {
      this.basePath = configService.getConfig()['SERVER_BACKEND_URL'];
    }
  }

  findAll(page, pageSize): Observable<Page<Memz>> {
    return this.http.get<Page<Memz>>(
      `${this.basePath}/api/memzagram/public?page=${page}&size=${pageSize}&sort=updatedDate,DESC`,
      {}
    );
  }

  stat(id: string): Observable<any> {
    return this.http.post<void>(`${this.basePath}/api/memzagram/_stat?id=${id}`, {});
  }
}
