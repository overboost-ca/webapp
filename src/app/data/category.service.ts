import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category } from './model/category';

/**
 * Handles document category download and parsing.
 */
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private rootUrl!: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.rootUrl = environment.contentUrl;
  }

  /**
   * Downloads and processes the root categories.
   *
   * @returns category list observable
   */
  fetchAll(): Observable<Category[]> {
    return this.httpClient.get(`${this.rootUrl}.categories.xml`, { responseType: 'text' }).pipe(
      map<any, Category[]>(xmlText =>
        this.toElements(
          new DOMParser().parseFromString(xmlText, 'text/xml').firstElementChild,
          'category',
          (cat) => {
            return {
              name: cat.getAttribute('name') ?? '',
              documents: this.toElements(
                cat,
                'directory',
                (doc) => {
                  return {
                    path: doc.getAttribute('name') ?? '',
                    name: doc.getAttribute('title') ?? ''
                  }
                })
            }
          })
      )
    );
  }

  /**
   * Converts specified children of a DOM element to an object array.
   *
   * @param parent parent element
   * @param tag tag name to query children
   * @param map child mapper function
   * @returns object array
   */
  private toElements<T>(parent: Element | null, tag: string, map: (child: Element) => T): T[] {
    let result: T[] = [];

    if (parent) {
      let children = parent.getElementsByTagName(tag);
      for (let i = 0; i < children.length; i++) {
        result.push(map(children[i]));
      }
    }
    return result;
  }
}
