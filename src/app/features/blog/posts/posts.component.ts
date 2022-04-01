import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Page } from '@core/models/page';
import { Post, PostSearchCriteria } from '@core/models/post';
import { BlogService } from '@core/service/blog.service';
import { Title } from '@angular/platform-browser';
import { SeoService } from '@core/service/seo.service';
import { FileService } from '@core/service/file.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Page<Post>;
  tags: string[];
  defaultPageSize: number = 3;
  markdownContainerOptions = { showBorder: false };
  searchInput: string;
  selectedTag: string;
  searchCriteria: PostSearchCriteria = {};

  constructor(
    private blogService: BlogService,
    private titleService: Title,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: any,
    protected fileService: FileService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Blog - Nordine Bittich');
    this.seoService.updateMetas(
      'Blog - Nordine Bittich',
      'My thoughts about programming, along with tutorials, and random stuff I want to talk about'
    );
    this.load();
  }

  load(event: number = 0): void {
    this.blogService
      .publicSearch(this.searchCriteria, event, this.defaultPageSize)
      .subscribe((data) => (this.posts = data));
    this.blogService.getTags().subscribe((data) => (this.tags = data));
  }

  get pageNumber() {
    return this?.posts?.pageable?.pageNumber;
  }

  getUrlForCover(post: Post) {
    return this.fileService.getPublicDownloadUrl(post.coverId);
  }

  slugify(title: string) {
    return this.blogService.slugifyTransform(title);
  }

  search(tag?: string) {
    // toggle
    this.selectedTag = this.selectedTag === tag ? null : tag;

    if (!this.searchInput?.length && !this.selectedTag) {
      this.searchCriteria = {};
      this.load();
    }

    let textSearch = this.searchInput?.length >= 3 ? this.searchInput : null;
    if (textSearch || this.selectedTag) {
      this.searchCriteria = {
        title: textSearch,
        content: textSearch,
        tag: this.selectedTag,
      };
      this.load();
    }
  }
}
