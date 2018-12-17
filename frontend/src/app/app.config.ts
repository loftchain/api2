import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const API = {
  URL: environment.URL
};

export const APP_CONFIG = new InjectionToken('app.config');

