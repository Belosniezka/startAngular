import { Component, Input, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { Observable, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  @Input() page$: Observable<number> = of(1);
  @Input() page: number | null = 1;

  public todos$: Observable<Todo[]> = of([]);

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.setTodos();
  }

  public nextPage(): void {
    void this.router.navigate([], {
      queryParams: { page: (this.page ?? 1) + 1 },
    });
  }

  public previousPage(): void {
    void this.router.navigate([], {
      queryParams: { page: (this.page ?? 1) - 1 },
    });
  }

  private setTodos(): void {
    this.todos$ = this.page$.pipe(
      switchMap((pageNumber) => this.todoService.getTodos(pageNumber)),
    );
  }
}
