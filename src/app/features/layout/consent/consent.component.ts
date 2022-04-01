import { Component, OnInit } from '@angular/core';
import { GdprService } from '@core/service/gdpr.service';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
})
export class ConsentComponent implements OnInit {
  displayBanner: boolean;

  constructor(private gdprService: GdprService) {}

  ngOnInit(): void {
    this.displayBanner = !this.gdprService.gdprConsent();
    this.gdprService.consentChecked.subscribe((consent) => {
      this.displayBanner = !consent;
    });
  }

  accepted() {
    this.gdprService.toggleConsent(true);
    this.displayBanner = false;
  }
}
