import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { BlogRoutingModule } from './blog-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule } from 'ngx-markdown';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [PostsComponent, PostDetailComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MarkdownModule,
    MatDividerModule,
  ],
})
export class BlogModule {}
