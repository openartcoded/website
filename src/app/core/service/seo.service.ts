import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FileService } from '@core/service/file.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private fileService: FileService,
    @Inject(DOCUMENT) private document: any,
    private metaService: Meta
  ) {}

  updateMetas(
    title: string,
    description: string,
    creationDate: Date = new Date(),
    author: string = 'Nordine Bittich',
    coverId?: string
  ) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({
      name: 'description',
      content: description,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: title,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: this.getMetaImageUrl(coverId),
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: description,
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: title,
    });
    this.metaService.updateTag({
      property: 'twitter:image',
      content: this.getMetaImageUrl(coverId),
    });
    this.metaService.updateTag({
      name: 'publish_date',
      property: 'og:publish_date',
      content: creationDate.toISOString(),
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: this.document.location.href,
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: this.document.location.href,
    });
    this.metaService.updateTag({
      name: 'author',
      content: author,
    });
  }

  getMetaImageUrl(id?: string) {
    if (id) {
      return this.fileService.getPublicDownloadUrl(id);
    }
    return this.document.location.origin + '/assets/img/logo_transparent.png';
  }
}
