import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ApiUrl } from './api-url';
import { ResourceService } from './resource.service';

// import {ResourceStoreService} from './resource.store';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: []
})
export class ResourceModule {
  static forRoot(apiUrl: string) {
    return {
      ngModule: ResourceModule,
      providers: [{provide: ApiUrl, useValue: apiUrl},
        ResourceService,
        // ResourceStoreService
      ]
    };
  }
}