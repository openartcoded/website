import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '@core/service/contact.service';
import { FormContact } from '@core/models/form-contact';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeoService } from '@core/service/seo.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  showToast: boolean;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private seoService: SeoService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.seoService.updateMetas(
      'Artcoded - Nordine Bittich',
      'Looking for a developer to build your next digital project?'
    );
  }

  submit($event: FormContact) {
    this.contactService.submit($event).subscribe((dt) => {
      this.openSnackBar('Submitted', null);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
