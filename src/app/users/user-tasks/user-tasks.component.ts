import { Component, computed, DestroyRef, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {

  userName = '';
  userId = input.required<string>();

  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name)

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
      const subscription = this.activatedRoute.paramMap.subscribe({
        next: (paramMap) => {
          
          this.userName = this.usersService.users.find( (u) => u.id === paramMap.get('userId')
          )?.name || '';

        }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

  }

}
