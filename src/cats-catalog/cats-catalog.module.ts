import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsCatalogComponent } from './cats-catalog.component';
import {RouterModule, Routes} from "@angular/router";
import {FiltersModule} from "@shared/modules/filters/filters.module";
import {ItemCardModule} from "@shared/modules/item-card/item-card.module";

const routes: Routes = [
  {
    path: '',
    component: CatsCatalogComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    CatsCatalogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FiltersModule,
    ItemCardModule,
  ]
})
export class CatsCatalogModule { }
