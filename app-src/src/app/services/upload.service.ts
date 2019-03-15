import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";

const url = 'http://localhost:3000/upload';
const uploadLimit = 5;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public files = new Map<string, File>();

  constructor(private http: HttpClient) { }

  public canAddFile() {
    return this.files.size < uploadLimit;
  }

  public addFile(file: File) {
    if (this.files.has(file.name))
      return;

    this.files.set(file.name, file);
  }

  public clearFiles() {
    this.files.clear();
  }

  upload() {
    const status: { [key: string]: { progress: Observable<number> } } = {};

    this.files.forEach((file: File) => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      const progress = new Subject<number>();

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);
        }
        else if (event instanceof HttpResponse) {
          progress.complete();
        }
      });
    });

    return status;
  }

}
