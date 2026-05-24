import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent, shouldAllowToLeave } from "../tasks/new-task/new-task.component";

export const userRoutes: Routes = [
                {
                    path: '',
                    redirectTo: 'tasks',
                    pathMatch: 'full'
                },
                {
                    path: 'tasks/new', //http://<your-domain>/users/<uid>/tasks/new
                    component: NewTaskComponent,
                    canDeactivate: [shouldAllowToLeave]
                },
                {
                    path: 'tasks', //http://<your-domain>/users/<uid>/tasks
                    component: TasksComponent
                },
            ];