import { Injectable } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PwaService {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    this.swUpdate.versionUpdates.subscribe((evt) => {
      const snack = this.snackbar.open('Update Available', 'Reload', {
        duration: 6000,
      });
      snack.onAction().subscribe(() => {
        window.location.reload();
      });
    });
  }
}
