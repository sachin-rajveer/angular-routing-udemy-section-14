import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();

  order = signal<'asc' | 'desc'>('desc');

  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (param) => {
        this.order.set(param['order']);
        
        // = param['order'];
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());


  }


  userTasks = computed(() => this.tasksService.allTasks()
    .filter((task) => task.userId === this.userId())
    .sort((a, b) => {
      if (this.order() === 'asc') {
        return (a.id > b.id) ? -1 : 1;
      } else {
        return (a.id > b.id) ? 1 : -1;
      }
    })
  );
}
