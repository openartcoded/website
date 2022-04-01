import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DownloadCvRequest } from '@core/models/download-cv-request';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ConfigInitService } from 'src/app/config-init-service';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  basePath: string;
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private configService: ConfigInitService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.basePath = configService.getConfig()['BACKEND_URL'];
    } else {
      this.basePath = configService.getConfig()['SERVER_BACKEND_URL'];
    }
  }

  public getCurriculum(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/api/cv`);
  }

  public download(dcr: DownloadCvRequest): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http
        .post(`${this.basePath}/api/cv/download`, dcr, {
          observe: 'response',
          responseType: 'blob' as 'json',
        })
        .subscribe((response: HttpResponse<Blob>) => {
          let body = response.body;
          let dataType = body.type;
          let headers = response.headers;
          let filename =
            headers?.get('content-disposition')?.split(';')[1]?.split('=')[1]?.replace(/"/g, '') ||
            '_fileDownlod' + new Date().getTime();
          let binaryData = [];
          binaryData.push(body);
          let downloadLink = this.document.createElement('a');
          downloadLink.href = URL.createObjectURL(new Blob(binaryData, { type: dataType }));
          downloadLink.setAttribute('download', filename);
          this.document.body.appendChild(downloadLink);
          downloadLink.click();
        });
    }
  }

}
