import { Component } from '@angular/core';

@Component({
  selector: 'app-cats-catalog',
  templateUrl: './cats-catalog.component.html',
  styleUrls: ['./cats-catalog.component.scss']
})
export class CatsCatalogComponent {
  public itemsList = [];

  public newListEmit(data: any): void {
    this.itemsList = data;
  }

}
