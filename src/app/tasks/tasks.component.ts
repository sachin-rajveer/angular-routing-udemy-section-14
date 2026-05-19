import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  userTasks = input.required<Task[]>();
  order = input.required<'asc' | 'desc'>();
}



export const resolveTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const tasksService = inject(TasksService);
  const order = activatedRoute.queryParams['order'];
  const userTasks = tasksService.allTasks()
    .filter(
      (task) => task.userId === activatedRoute.paramMap.get('userId')
    )
    .sort((a, b) => {
      if (order === 'asc') {
        return (a.id > b.id) ? -1 : 1;
      } else {
        return (a.id > b.id) ? 1 : -1;
      }
    }
    );

  return userTasks.length > 0 ? userTasks : [];
}