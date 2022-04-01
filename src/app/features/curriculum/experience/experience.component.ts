import { Component, Input, OnInit } from '@angular/core';
import { Experience } from '@core/models/experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  @Input()
  experiences: Experience[];

  filteredExperiences: Experience[];
  filterExperience: string;

  constructor() {}

  ngOnInit(): void {
    this.filteredExperiences = this.experiences;
  }

  filter() {
    if (this?.filterExperience?.length < 2) {
      this.filteredExperiences = this.experiences;
    } else {
      let fxp = this.filterExperience.toUpperCase();
      this.filteredExperiences = this.experiences.filter(
        (xp) =>
          xp.title.toUpperCase().includes(fxp) ||
          xp.company.toUpperCase().includes(fxp) ||
          xp.description.find((des) => des.toUpperCase().includes(fxp))
      );
    }
  }
}
