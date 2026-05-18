import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { CategoryService } from './category.service';
import { DocumentService } from './document.service';

@NgModule({ declarations: [], imports: [CommonModule], providers: [CategoryService, DocumentService, provideHttpClient(withInterceptorsFromDi())] })
export class DataModule { }
