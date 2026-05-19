import { Component, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userName = input.required<string>();
  message = input.required<string>();
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: data => {
        console.log(data);
      }
    })
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerSnapshot: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((user) => user.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;

}


export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + "\'s Tasks";   
}