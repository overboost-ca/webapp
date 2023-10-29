import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PictureSet } from '../../data/model/picture-set';

@Component({
  selector: 'ovr-content-page',
  templateUrl: 'content-page.component.html',
  styleUrls: ['content-page.component.scss']
})
export class ContentPageComponent {
  content!: PictureSet;

  constructor(
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(data => {
      this.content = data['content'];
      document.getElementById("main")?.scrollTo(0, 0);
    })
  }
}
