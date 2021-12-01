import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { CategoryService } from '../../data/category.service';
import { Category } from '../../data/model/category';

const CONTENT_ROOT = 'saab';

/** Tree element to match the category list */
interface TreeNode {
  name: string,
  documents?: TreeNode[]
}

/**
 * Displays the root list of categories.
 */
@Component({
  selector: 'ovr-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  contentRoot = CONTENT_ROOT;
  dataSource = new MatTreeNestedDataSource<TreeNode>();
  treeControl = new NestedTreeControl<TreeNode>(cat => cat.documents);

  constructor(
    private categoryService: CategoryService
  ) { }

  hasChildren = (n: number, node: TreeNode) => !!node.documents;

  ngOnInit(): void {
    this.categoryService.fetchAll()
      .subscribe(result => {
        this.dataSource.data = result as TreeNode[];
      });
  }

}
