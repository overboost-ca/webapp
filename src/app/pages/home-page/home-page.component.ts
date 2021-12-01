import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../data/category.service';

/**
 * Displays the root list of categories.
 */
@Component({
  selector: 'ovr-home-page',
  template: `
    <p>
      home-page works!
    </p>
  `,
  styles: [
  ]
})
export class HomePageComponent implements OnInit {

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.fetchAll()
      .subscribe(result => {
        console.log(result)
      });
  }

}
