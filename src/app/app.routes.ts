import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const appRoutes: Routes = [
        {
            path: '',
            component: NoTaskComponent
        },
        {
            path: 'users/:userId',
            component: UserTasksComponent,
            children: [
                {
                    path: 'tasks', //http://<your-domain>/users/<uid>/tasks
                    component: TasksComponent
                },
                {
                    path: 'tasks/new', //http://<your-domain>/users/<uid>/tasks/new
                    component: NewTaskComponent
                }
            ]
        },
        {
            path: '**',
            component: NotFoundComponent
        }
    ];