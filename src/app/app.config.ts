import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { InjectionToken, FactoryProvider } from '@angular/core';

export const IS_PRODUCTION = new InjectionToken<boolean>('isProduction');
registerLocaleData(localePt, 'pt-BR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};

export const isProdProvider: FactoryProvider = {
  provide: IS_PRODUCTION,
  useFactory: () => {
    const host = window.location.hostname;
    return host !== 'localhost' && host !== '127.0.0.1';
  }
};
