import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DownloadCvRequest } from '@core/models/download-cv-request';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GdprService } from '@core/service/gdpr.service';

@Component({
  selector: 'app-cv-download-form',
  templateUrl: './cv-download-form.component.html',
  styleUrls: ['./cv-download-form.component.scss'],
})
export class CvDownloadFormComponent implements OnInit {
  public editorForm: FormGroup;
  didNotConsent: boolean;
  @Output()
  requestForCv: EventEmitter<DownloadCvRequest> = new EventEmitter<DownloadCvRequest>();

  constructor(private gdprService: GdprService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editorForm = this.createFormGroup();
    this.didNotConsent = !this.gdprService.gdprConsent();
    this.gdprService.consentChecked.subscribe((consent) => {
      this.didNotConsent = !consent;
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      htmlContent: new FormControl(null, [Validators.maxLength(1024)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.maxLength(15)]),
      dailyRate: new FormControl(null, []),
      availability: new FormControl(null, []),
    });
  }

  get email(): string {
    return this.editorForm.get('email').value;
  }

  get dailyRate(): boolean {
    return this.editorForm.get('dailyRate').value;
  }

  get availability(): boolean {
    return this.editorForm.get('availability').value;
  }

  get phoneNumber(): string {
    return this.editorForm.get('phoneNumber').value;
  }

  get htmlContent(): string {
    return this.editorForm.get('htmlContent').value;
  }

  send() {
    this.requestForCv.emit({
      email: this.email,
      availability: this.availability,
      dailyRate: this.dailyRate,
      phoneNumber: this.phoneNumber,
      htmlContent: this.htmlContent,
    } as DownloadCvRequest);
    this.editorForm.reset();
  }

}
