import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CatalogService } from "@core/services/catalog.service";
import { FormControl, FormGroup } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, Observable, Subject, switchMap, throwError } from "rxjs";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from "@angular/router";
import { cloneDeep, isEqual } from "lodash";


@UntilDestroy()
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() private readonly newListEmit: EventEmitter<any> = new EventEmitter<any>();
  public form!: FormGroup;
  public counts: string[] = Array.from({ length: 10 }, (_, index) => ((index + 1) * 10).toString());
  public breedsList$: Observable<any[]> = this.catalogService.getBreedsList();
  private formChanges$: Subject<any> = new Subject<any>();

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      breed_ids: new FormControl(),
      limit: new FormControl()
    });

    this.route.queryParams
      .pipe(
        untilDestroyed(this),
        switchMap((res: any) => {
          const queryParams = cloneDeep(res); 
          if(!queryParams.limit) {
            queryParams.limit = '10';
          }

          const params = {} as any;
          // convert query params of breed_ids from string to arr
          Object.keys(queryParams).forEach((key) => {
            const value = queryParams[key];

            if (key == 'breed_ids') {
              params.breed_ids = value.split(',')
            } else {
              params[key] = value
            }
          });

          this.form.patchValue(params); // update form value
          
          return this.catalogService.getCatalogItemsList(queryParams).pipe(
            catchError(err => {
              console.log(err)
              return [];
            })
          );
        })
      )
      .subscribe(res => this.newListEmit.emit(res));



    this.formChanges$
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(isEqual),
        debounceTime(300)
      )
      .subscribe(_ => {
        const params = this.form.value;
        if (params.breed_ids) {
          params.breed_ids = params.breed_ids.join(',');
        }
        
        this.catalogService.setQueryParams(this.form.value);
      })
  }

  public onSelectionChange(event: any): void {
    this.formChanges$.next(event);
  }

  public resetFilters(): void {
    this.form.reset();
    this.catalogService.setQueryParams();
    
  }

  ngOnDestroy(): void {
  }
}
