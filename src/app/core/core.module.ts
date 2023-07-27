import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UrlInterceptor} from "@core/interceptors/main-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  ]
})
export class CoreModule { }
