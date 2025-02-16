import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  standalone: false,
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent implements OnInit {
  public page$: Observable<number> = this.activatedRoute.queryParams.pipe(
    map((res) => {
      const page = res['page'] ?? 1;
      return isNaN(Number(page)) ? 1 : Number(page);
    }),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.setQuerySubscription();
  }

  public setQuerySubscription(): void {
    this.activatedRoute.queryParams
      .pipe(
        map((res) => {
          const page = res['page'] ?? 1;
          return isNaN(Number(page)) ? 1 : Number(page);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((params) => {
        console.log(params);
      });
  }
}
