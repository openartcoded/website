import { Component, OnInit } from '@angular/core';
import { GdprService } from '@core/service/gdpr.service';
import { SeoService } from '@core/service/seo.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  consentChecked: boolean;
  constructor(private gdprService: GdprService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetas('Nordine Bittich - Privacy', 'Privacy Policy');
    this.consentChecked = this.gdprService.gdprConsent();
    this.gdprService.consentChecked.subscribe((consent) => {
      this.consentChecked = consent;
    });
  }

  toggleConsent(checked) {
    this.gdprService.toggleConsent(checked);
    this.consentChecked = checked;
  }
}
