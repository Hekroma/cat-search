import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ItemCardComponent
  ],
})
export class ItemCardModule { }
