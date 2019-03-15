import {Component, OnInit, ViewChild} from '@angular/core';
import {CanColor, MatButton, MatDialogRef} from "@angular/material";
import {UploadService} from "../../services/upload.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  progress = new Map<string, number>();
  done: boolean;

  @ViewChild('closeButton') closeButton : MatButton;

  constructor(
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.done = false;
    const progressMap = this.uploadService.upload();

    let allProgressObservables = [];
    progressMap.forEach((value, key) => {
      value.subscribe((v) => {
        this.progress[key] = v;
      });
      allProgressObservables.push(value);
    });

    forkJoin(allProgressObservables).subscribe(end => {
      //this.dialogRef.close();
      this.done = true;
    });
  }
}
