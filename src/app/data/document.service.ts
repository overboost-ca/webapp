import { DocTypeToken } from '@angular/compiler/src/ml_parser/tokens';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PictureSet } from './model/picture-set';

const TITLE_REGEX = /^(?<year>\d\d\d\d)(?<month>\d\d)(?<day>\d\d)\w?\.(?<title>.*)$/;

/**
 * Handles document load and parsing.
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  /**
   * Downloads and processes a picture set from a specified folder path.
   *
   * @param category category path (currently ignored)
   * @param path picture set folder path
   * @returns picture set observable
   */
  load(category: string, path: string): Observable<PictureSet> {
    let result = this.toPictureSet(path);

    return of(result);
  }

  /**
   * Converts a document path into an empty picture set.
   *
   * @param path document folder name
   * @returns blank picture set with a date and title populated
   */
  private toPictureSet(path: string): PictureSet {
    let result: {
      year?: string,
      month?: string,
      day?: string,
      title?: string
    } = TITLE_REGEX.exec(path)?.groups ?? {};

    return {
      date: new Date(Date.parse(`${result.year}-${result.month}-${result.day}`)),
      title: (result.title ?? path).replace(/_/g, ' ')
    };
  }
}
