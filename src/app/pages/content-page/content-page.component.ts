import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PictureSet } from '../../data/model/picture-set';

@Component({
  selector: 'ovr-content-page',
  template: `
      <h1>{{ content?.title }}</h1>
  `,
  styles: [
  ]
})
export class ContentPageComponent implements OnInit {
  content!: PictureSet;

  constructor(
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(data => {
      this.content = data['content'];
      console.log(this.content);
    })
  }

  ngOnInit(): void {
  }

}
