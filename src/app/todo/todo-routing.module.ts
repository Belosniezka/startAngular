import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class TodoRoutingModule {}
