import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
  RouteReuseStrategy,
  RouterModule,
  Routes
} from '@angular/router';

import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ContentResolver } from './pages/content-page/content.resolver';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'content/:category/:document',
    component: ContentPageComponent,
    resolve: { content: ContentResolver }
  }
];


/**
 * Preserves the homepage route to keep the expanded tree state.
 */
export class PreserveHomeRouteReuseStrategy extends BaseRouteReuseStrategy {
  storedRoute: DetachedRouteHandle | null = null;

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.isHome(route) && !!this.storedRoute;
  }

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isHome(route);
  }

  override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (this.isHome(route)) {
      this.storedRoute = handle;
    }
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.isHome(route) ? this.storedRoute : null;
  }

  private isHome(route: ActivatedRouteSnapshot): boolean {
    return route.component == HomePageComponent;
  }
}


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: PreserveHomeRouteReuseStrategy }
  ]
})
export class AppRoutingModule { }
