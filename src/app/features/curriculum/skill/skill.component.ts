import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Skill } from '@core/models/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  @Input()
  skills: Skill[];
  filteredSkills: Skill[];

  filterSkill: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filteredSkills = this.skills;
  }

  filter() {
    if (this?.filterSkill?.length < 2) {
      this.filteredSkills = this.skills;
    } else {
      let fsk = this.filterSkill.toUpperCase();
      this.filteredSkills = this.skills.filter(
        (skill) => skill.name.toUpperCase().includes(fsk) || skill.tags.find((tag) => tag.toUpperCase().includes(fsk))
      );
    }
  }

  selectColor(tag: string): boolean {
    return this.filterSkill?.length >= 2 && tag?.toUpperCase().includes(this.filterSkill?.toUpperCase());
  }
}
