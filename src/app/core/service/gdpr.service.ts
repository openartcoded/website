import { EventEmitter, Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class GdprService {
  public consentChecked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  gdprConsent() {
    let bannerClosed: boolean = this.storage.get('bannerClosed');
    return bannerClosed === true;
  }

  toggleConsent(checked: boolean) {
    if (checked) {
      this.consentChecked.emit(true);
      this.storage.set('bannerClosed', true);
    } else {
      this.consentChecked.emit(false);
      this.storage.remove('bannerClosed');
    }
  }
}
