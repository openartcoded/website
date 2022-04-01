import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../models/file-upload';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';
import { ConfigInitService } from 'src/app/config-init-service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  basePath: string;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private configService: ConfigInitService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.basePath = configService.getConfig()['BACKEND_URL'] + '/api/resource';
    } else {
      this.basePath = configService.getConfig()['SERVER_BACKEND_URL'] + '/api/resource';
    }
  }

  findByPublicId(id: string): Observable<FileUpload> {
    const url = `${this.basePath}/public/find-by-id?id=${id}`;
    return this.http.get<FileUpload>(url, {});
  }

  findByCorrelationIdPublic(id: string): Observable<FileUpload[]> {
    const url = `${this.basePath}/public/find-by-correlation-id?correlationId=${id}`;
    return this.http.get<FileUpload[]>(url, {});
  }

  getPublicDownloadUrl(id: string): string {
    return `${this.basePath}/public/download/${id}`;
  }

  toDownloadLink(link: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http
        .get(link, {
          observe: 'response',
          responseType: 'blob' as 'json',
        })
        .pipe(
          map((response: any) => {
            let body = response.body;
            let dataType = body.type;
            let headers = response.headers;
            let filename =
              headers.get('content-disposition')?.split(';')[1]?.split('=')[1]?.replace(/"/g, '') ||
              '_fileDownload' + new Date().getTime();
            let binaryData = [];
            binaryData.push(body);
            let downloadLink = this.document.createElement('a');
            downloadLink.href = URL.createObjectURL(new Blob(binaryData, { type: dataType }));
            downloadLink.setAttribute('download', filename);
            return downloadLink;
          })
        );
    }
  }
}
