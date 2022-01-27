import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { StorageComponent } from './storage/storage.component';

const routes: Routes = [
  { path: '', component: StorageComponent },
  { path: 'scanner', component: ScannerComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
