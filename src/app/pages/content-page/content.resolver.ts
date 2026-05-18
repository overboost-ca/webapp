import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DocumentService } from '../../data/document.service';
import { PictureSet } from '../../data/model/picture-set';

/**
 * Resolves and loads content for the document viewer.
 */
@Injectable({
  providedIn: 'root'
})
export class ContentResolver  {
  constructor(
    private documentService: DocumentService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PictureSet> {
    return this.documentService.load(
      route.paramMap.get('category') ?? '',
      route.paramMap.get('document') ?? '');
  }
}
