import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { Picture } from './model/picture';
import { PictureSet } from './model/picture-set';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

const DATE_REGEX = /^(?<day>\d\d)\.(?<month>\d\d)\.(?<year>\d\d\d\d)$/;
const TITLE_REGEX = /^(?<year>\d\d\d\d)(?<month>\d\d)(?<day>\d\d)\w?\.(?<title>.*)$/;

/**
 * Handles document load and parsing.
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private rootUrl!: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.rootUrl = environment.contentUrl;
  }

  /**
   * Downloads and processes a picture set from a specified folder path.
   *
   * @param category category path (currently ignored)
   * @param path picture set folder path
   * @returns picture set observable
   */
  load(category: string, path: string): Observable<PictureSet> {
    let result = this.toPictureSet(path);
    return this.httpClient.get(`${this.rootUrl}${path}/.content.xml`, { responseType: 'text' }).pipe(
      map<any, PictureSet>(xmlText => {
        let xml = new DOMParser().parseFromString(xmlText, 'text/xml');
        result.intro = xml.getElementsByTagName('description')[0]?.innerHTML;

        let pictures = xml.getElementsByTagName('picture');
        for (let i = 0; i < pictures.length; i++) {
          result.pictures.push(this.toPicture(pictures[i]));
        }

        return result;
      }));
  }

  /**
   * Converts a regex parsed date into an actual date object.
   *
   * @param parsedDate regex groups
   * @returns date
   */
  private toDate(parsedDate: {
    day?: string,
    month?: string,
    year?: string
  }): Date {
    return new Date(Date.parse(`${parsedDate.year}-${parsedDate.month}-${parsedDate.day}`));
  }

  /**
   * Converts a picture XML element into a picture descriptor object.
   *
   * @param e DOM element
   * @returns picture descriptor object
   */
  private toPicture(e: Element): Picture {
    let p: Picture = {
      path: e.getAttribute('name') ?? '',
      title: e.getAttribute('title') ?? '',
      date: this.toDate((DATE_REGEX.exec(e.getAttribute('date') ?? '')?.groups ?? {}) ?? '')
    };

    // read image dimensions, only expect one
    let images = e.getElementsByTagName('image');
    for (let i = 0; i < images.length; i++) {
      p.width = Number(images[i].getAttribute('width'));
      p.height = Number(images[i].getAttribute('height'));
      images[i].remove();
    }

    // remove thumbnails, only expect one
    let thumbnail = e.getElementsByTagName('thumbnail');
    for (let i = 0; i < thumbnail.length; i++) {
      thumbnail[i].remove();
    }

    // copy HTML content, sans removed image tags
    p.description = e.innerHTML;

    return p;
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
      date: this.toDate(result),
      title: (result.title ?? path).replace(/_/g, ' '),
      pictures: []
    };
  }
}
