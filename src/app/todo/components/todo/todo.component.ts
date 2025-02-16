import {Component, Input} from '@angular/core';
import {Todo} from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input({required: true}) todo!: Todo
}
