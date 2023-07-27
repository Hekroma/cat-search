import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsCatalogComponent } from './cats-catalog.component';

describe('CatsCatalogComponent', () => {
  let component: CatsCatalogComponent;
  let fixture: ComponentFixture<CatsCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatsCatalogComponent]
    });
    fixture = TestBed.createComponent(CatsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
