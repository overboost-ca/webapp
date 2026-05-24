import { inject, provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Activate a hash route if redirected from a legacy location.
 */
export const redirectInitializerProvider = provideAppInitializer(() => {
  const router = inject(Router);

  const params = new URLSearchParams(window.location.search);
  const redirectPath = params.get('redirect');

  if (!redirectPath) {
    return;
  }

  let path = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`;
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  const url = new URL(window.location.href);
  url.searchParams.delete('redirect');
  window.history.replaceState(null, '', url.toString());

  router.navigateByUrl(path);
});
