import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatExpansionPanel} from "@angular/material";
import {NgForm} from "@angular/forms";
import {UploadDialogComponent} from "../upload-dialog/upload-dialog.component";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.scss']
})
export class PrintFormComponent {

  @ViewChild('filesPanel') filesPanel : MatExpansionPanel;
  @ViewChild('filesInput') filesInput;

  constructor(
    private uploadDialog: MatDialog,
    private uploadServce: UploadService
  ) {}

  getFileSize(file) {
    return (file.size/1024).toFixed(2);
  }

  onFileAdded() {
    const fileList = this.filesInput.nativeElement.files;
    if (fileList.length == 0)
      return;

    const f = fileList[0] as File;
    if (f == null)
      return;

    this.uploadServce.addFile(f);

    if (this.uploadServce.files.size == 1) {
      this.filesPanel.expanded = true;
    }
  }

  onClearFilesButtonClicked() {
    this.filesInput.nativeElement.value = null;
    this.uploadServce.clearFiles();
    this.filesPanel.expanded = false;
  }

  onAddFileButtonClicked() {
    if (!this.uploadServce.canAddFile()) {
      alert("Maximum number files reached");
      return;
    }
    this.filesInput.nativeElement.click();
  }

  onFormSubmit(form: NgForm) {
    if (form.valid) {
      if (this.uploadServce.files.size == 0) {
        alert("Please add at least one file")
        return;
      }
      this.uploadDialog.open(UploadDialogComponent, {});
    }

  }

}
