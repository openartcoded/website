import { Component, OnInit } from '@angular/core';
import { Post } from '@core/models/post';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '@core/service/file.service';
import { BlogService } from '@core/service/blog.service';
import { SeoService } from '@core/service/seo.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private activateRoute: ActivatedRoute,
    private fileService: FileService,
    private seoService: SeoService,
    private blogService: BlogService
  ) {}

  generatePdf() {
    this.blogService.generatePdf(this.post);
  }

  getCoverUrl() {
    if (this.post.coverId) {
      return this.fileService.getPublicDownloadUrl(this.post.coverId);
    }
    return '/assets/img/no-cover.jpg';
  }

  ngOnInit(): void {
    let id = this.activateRoute.snapshot.params.id;
    let title = this.activateRoute.snapshot.params.title;
    this.blogService.getPublicPostById(id, title).subscribe((p) => {
      this.post = p;
      this.seoService.updateMetas(
        this.post.title,
        this.post.description,
        new Date(this.post.creationDate),
        'Nordine Bittich',
        this.post.coverId
      );
    });
  }
}
