import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Post, PostSearchCriteria } from '@core/models/post';
import { Page } from '@core/models/page';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ConfigInitService } from 'src/app/config-init-service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  basePath: string;
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private configService: ConfigInitService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(platformId)) {
      this.basePath = configService.getConfig()['BACKEND_URL'];
    } else {
      this.basePath = configService.getConfig()['SERVER_BACKEND_URL'];
    }
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.basePath}/api/blog/tags`);
  }

  slugifyTransform(input: string): string {
    return input
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  publicSearch(criteria: PostSearchCriteria, page, pageSize): Observable<Page<Post>> {
    return this.http.post<Page<Post>>(
      `${this.basePath}/api/blog/public-search?page=${page}&size=${pageSize}&sort=updatedDate,DESC`,
      criteria
    );
  }

  getPublicPostById(id: string, title: string): Observable<Post> {
    return this.http.get<Post>(`${this.basePath}/api/blog/post/${title}/${id}`);
  }

  getLatest(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.basePath}/api/blog/latest`);
  }

  generatePdf(post: Post) {
    if (isPlatformBrowser(this.platformId)) {
      this.http
        .get(`${this.basePath}/api/blog/generate-pdf?id=${post.id}`, {
          observe: 'response',
          responseType: 'blob' as 'json',
        })
        .subscribe((response: any) => {
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
