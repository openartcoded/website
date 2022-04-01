import { Component, Inject, OnInit } from '@angular/core';
import { Memz } from '@core/models/memz';
import { FileService } from '@core/service/file.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-memzagram-viewer',
  templateUrl: './memzagram-viewer.component.html',
  styleUrls: ['./memzagram-viewer.component.scss'],
})
export class MemzagramViewerComponent implements OnInit {
  constructor(
    private fileService: FileService,
    public dialogRef: MatDialogRef<MemzagramViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Memz
  ) {}

  ngOnInit(): void {}
}
