import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import {
  BehaviorSubject,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit, OnDestroy {
  public todos$: Observable<Todo[]> = of([]);

  public page = 1;

  private todosArraySubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);

  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public todosArray$: Observable<Todo[]> =
    this.todosArraySubject.asObservable();

  public todosArray2$: Observable<Todo[]> = this.pageSubject.pipe(
    switchMap((pageNumber) => this.todoService.getTodos(pageNumber)),
  );

  public pageSubscription: Subscription | null = null;

  constructor(
    private todoService: TodoService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.setTodos();
    // this.getTodos();
    // this.setPageSubscription();
  }

  ngOnDestroy(): void {
    // this.pageSubscription?.unsubscribe();
  }

  public nextPage(): void {
    this.page = this.page + 1;
    this.setTodos();
    // this.getTodos();
    this.pageSubject.next(this.pageSubject.value + 1);
  }

  public previousPage(): void {
    this.page = this.page - 1;
    this.setTodos();
    // this.getTodos();
    this.pageSubject.next(this.pageSubject.value - 1);
  }

  private setTodos(): void {
    this.todos$ = this.todoService.getTodos(this.page);
  }

  // public getTodos(): void {
  //   this.todoService
  //     .getTodos(this.page)
  //     .subscribe((res: Todo[]) => this.todosArraySubject.next(res));
  // }

  // private setPageSubscription(): void {
  //   // this.pageSubscription =
  //   this.pageSubject
  //     .pipe(
  //       tap((res) => console.log(res)),
  //       switchMap((pageNumber) => this.todoService.getTodos(pageNumber)), // return of([]) // of([]).subscribe => []
  //       tap((res) => console.log(res)),
  //       takeUntilDestroyed(this.destroyRef),
  //     )
  //     .subscribe((res: Todo[]) => {
  //       this.todosArraySubject.next(res);
  //     });
  // }
}
