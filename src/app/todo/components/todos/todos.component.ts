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
export class TodosComponent {
  private todosArraySubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);

  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public todosArray$: Observable<Todo[]> =
    this.todosArraySubject.asObservable();

  public todosArray2$: Observable<Todo[]> = this.pageSubject.pipe(
    switchMap((pageNumber) => this.todoService.getTodos(pageNumber)),
  );

  constructor(
    private todoService: TodoService,
    private destroyRef: DestroyRef,
  ) {}

  public nextPage(): void {
    this.pageSubject.next(this.pageSubject.value + 1);
  }

  public previousPage(): void {
    this.pageSubject.next(this.pageSubject.value - 1);
  }
}
