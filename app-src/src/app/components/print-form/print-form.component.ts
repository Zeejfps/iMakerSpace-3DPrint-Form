import {Component, ViewChild} from '@angular/core';
import {MatExpansionPanel} from "@angular/material";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.scss']
})
export class PrintFormComponent {

  @ViewChild('filesPanel') filesPanel : MatExpansionPanel;
  @ViewChild('filesInput') filesInput;

  public files = new Map<string, File>();

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

    if (this.files.has(f.name))
      return;

    this.files.set(f.name, f);

    if (this.files.size == 1) {
      this.filesPanel.expanded = true;
    }
  }

  onClearFilesButtonClicked() {
    this.filesInput.nativeElement.value = null;
    this.files.clear();
    this.filesPanel.expanded = false;
  }

  onAddFileButtonClicked() {
    if (this.files.size >= 5) {
      alert("Maximum number files reached");
      return;
    }
    this.filesInput.nativeElement.click();
  }

  onFormSubmit(form: NgForm) {
    if (form.valid) {
      if (this.files.size == 0) {
        alert("Please add at least one file")
        return;
      }
    }
  }

}
