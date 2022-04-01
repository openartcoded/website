import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvPageComponent } from './cv-page/cv-page.component';
import { CurriculumRoutingModule } from './curriculum-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { HobbyComponent } from './hobby/hobby.component';
import { SkillComponent } from './skill/skill.component';
import { MatIconModule } from '@angular/material/icon';
import { CvDownloadFormComponent } from './cv-download-form/cv-download-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    CvPageComponent,
    EducationComponent,
    ExperienceComponent,
    HobbyComponent,
    SkillComponent,
    CvDownloadFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurriculumRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
  ],
})
export class CurriculumModule {}
