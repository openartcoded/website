import { Component, Input, OnInit } from '@angular/core';
import { Hobby } from '@core/models/hobby';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss'],
})
export class HobbyComponent implements OnInit {
  @Input()
  hobbies: Hobby[];

  constructor() {}

  ngOnInit(): void {}
}
