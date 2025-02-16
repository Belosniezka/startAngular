import {NgModule} from '@angular/core';
import {TodosComponent} from './components/todos/todos.component';
import {TodoService} from './services/todo.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import {TodoRoutingModule} from './todo-routing.module';
import { TodoComponent } from './components/todo/todo.component';


@NgModule({
  imports: [AsyncPipe, CommonModule,TodoRoutingModule],
  exports: [],
  declarations: [TodosComponent, TodoPageComponent, TodoComponent],
  providers: [TodoService],
})
export class TodoModule {
}
