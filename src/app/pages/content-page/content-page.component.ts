import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PictureSet } from '../../data/model/picture-set';

@Component({
  selector: 'ovr-content-page',
  templateUrl: 'content-page.component.html',
  styleUrls: ['content-page.component.scss']
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
