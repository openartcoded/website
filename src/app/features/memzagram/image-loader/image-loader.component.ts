import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent implements OnInit {
  isLoading: boolean;
  @Input()
  cssClass: string;
  @Input()
  imageUrl: string;
  @Input()
  alt: string;
  @Output()
  imageClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  hideLoader() {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.isLoading = true;
  }

  onImageClicked() {
    this.imageClicked.emit();
  }
}
