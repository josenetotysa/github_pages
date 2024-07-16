import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({

      timeOut: 2500,
      closeButton: true,
      easing: 'ease-in',
      preventDuplicates: true,
      progressBar: true

    }),
    provideHttpClient(withFetch()), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};