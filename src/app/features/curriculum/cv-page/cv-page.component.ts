import { Component, OnInit } from '@angular/core';
import { SeoService } from '@core/service/seo.service';
import { CvService } from '@core/service/cv.service';
import { ScholarHistory } from '@core/models/scholar-history';
import { Hobby } from '@core/models/hobby';
import { Experience } from '@core/models/experience';
import { Skill } from '@core/models/skill';
import { DownloadCvRequest } from '@core/models/download-cv-request';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CvDownloadFormComponent } from '../cv-download-form/cv-download-form.component';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.scss'],
})
export class CvPageComponent implements OnInit {
  skills: Skill[];
  experiences: Experience[];
  hobbies: Hobby[];
  scholarHistories: ScholarHistory[];
  githubUrl: string;
  linkedinUrl: string;
  introduction: string;
  dialogRef: MatDialogRef<any>;

  showSkills: boolean = true;
  showExperiences: boolean = true;
  showHobbies: boolean = true;
  showScholarHistories: boolean = true;

  constructor(private seoService: SeoService, public dialog: MatDialog, private cvService: CvService) {}

  async ngOnInit() {
    this.cvService.getCurriculum().subscribe((cv) => {
      this.introduction = cv.introduction;
      this.seoService.updateMetas('Nordine Bittich - Curriculum Vitae', this.introduction);
      this.skills = cv.skills;
      this.experiences = cv.experiences;
      this.hobbies = cv.hobbies;
      this.scholarHistories = cv.scholarHistories;
      this.githubUrl = cv?.person?.githubUrl;
      this.linkedinUrl = cv?.person?.linkedinUrl;
    });
  }

  downloadCvRequest() {
    this.dialogRef = this.dialog.open(CvDownloadFormComponent, {});
    this.dialogRef.componentInstance.requestForCv.subscribe((data) => {
      this.download(data);
      this.dialogRef.close();
    });
  }

  download(data: DownloadCvRequest) {
    this.cvService.download(data);
  }
}
