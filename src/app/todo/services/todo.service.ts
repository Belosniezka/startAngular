import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const mockTodos: Todo[] = [
  {
    userId: 2,
    id: 2,
    title: 'Blalala',
    completed: true,
  },
];

@Injectable()
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  public getTodos(page: number = 1): Observable<Todo[]> {
    if (page < 1) {
      page = 1;
    }
    return this.httpClient
      .get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?_page=${page}`)
      .pipe(delay(300));
  }

  public getMockTodos(page: number = 1): Observable<Todo[]> {
    return of(mockTodos);
  }
}
