import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatProgressBarModule, MatSelectModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from '@angular/material/input';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatListModule} from "@angular/material";
import {MatExpansionModule} from "@angular/material";
import {MatIconModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material";
import { PrintFormComponent } from './components/print-form/print-form.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {UploadService} from "./services/upload.service";

@NgModule({
  declarations: [
    AppComponent,
    PrintFormComponent,
    UploadDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressBarModule,
  ],
  providers: [UploadService],
  bootstrap: [AppComponent],
  entryComponents: [UploadDialogComponent]
})
export class AppModule {
}
