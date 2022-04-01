import { Component, OnInit } from '@angular/core';
import { SeoService } from '@core/service/seo.service';
import { MemzService } from '@core/service/memz.service';
import { Page } from '@core/models/page';
import { Memz } from '@core/models/memz';
import { FileService } from '@core/service/file.service';
import { MatDialog } from '@angular/material/dialog';
import { MemzagramViewerComponent } from '../memzagram-viewer/memzagram-viewer.component';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-memzagram-page',
  templateUrl: './memzagram-page.component.html',
  styleUrls: ['./memzagram-page.component.scss'],
})
export class MemzagramPageComponent implements OnInit {
  items: Page<Memz>;
  defaultPageSize: number = 9;

  constructor(
    private seoService: SeoService,
    private fileService: FileService,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private memzService: MemzService
  ) {}

  ngOnInit(): void {
    this.seoService.updateMetas('Nordine Bittich - Gallery', "Some random pictures I'd like to share");
    this.load();
  }

  load(event: number = 0): void {
    this.memzService
      .findAll(event, this.defaultPageSize)
      .pipe(
        tap((page) => {
          page.content.forEach((memz) => {
            this.fileService
              .toDownloadLink(this.fileService.getPublicDownloadUrl(memz.thumbnailUploadId))
              .subscribe((imageLink) => {
                memz.thumbnailLink = this.domSanitizer.bypassSecurityTrustUrl(imageLink.href);
              });
            memz.imageLink = this.fileService.getPublicDownloadUrl(memz.imageUploadId);
          });
        })
      )
      .subscribe((data) => {
        this.items = data;
        setTimeout(() => {
          this.items.content.forEach((memz) => {
            this.fileService
              .toDownloadLink(this.fileService.getPublicDownloadUrl(memz.imageUploadId))
              .subscribe((imageLink) => {
                memz.imageLink = this.domSanitizer.bypassSecurityTrustUrl(imageLink.href);
              });
          });
        }, 250);
      });
  }

  get pageNumber() {
    return this?.items?.pageable?.pageNumber;
  }

  getImageUrl(memz: Memz) {
    return this.fileService.getPublicDownloadUrl(memz.imageUploadId);
  }

  async openDetail(memz: Memz) {
    this.memzService.stat(memz.id).subscribe((value) => {});
    this.dialog.open(MemzagramViewerComponent, {
      data: memz,
      panelClass: 'mat-transparent-dialog-container',
      hasBackdrop: true,
    });
  }
}
