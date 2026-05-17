import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";

export const appRoutes: Routes = [
        {
            path: 'tasks',
            component: TasksComponent
        }
    ];