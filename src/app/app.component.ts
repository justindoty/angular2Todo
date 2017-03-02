import { Component } from '@angular/core';
import {TodoService} from './services/todo.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [TodoService]
})
export class AppComponent {
  title = 'Angular2 Todo App';
}
