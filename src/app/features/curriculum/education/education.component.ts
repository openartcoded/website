import { Component, Input, OnInit } from '@angular/core';
import { ScholarHistory } from '@core/models/scholar-history';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  @Input()
  scholarHistories: ScholarHistory[];

  constructor() {}

  ngOnInit(): void {}
}
