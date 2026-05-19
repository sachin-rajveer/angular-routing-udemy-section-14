import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/user.routes";
import { resolveTasks } from "./tasks/tasks.component";

export const appRoutes: Routes = [
        {
            path: '',
            component: NoTaskComponent
        },
        {
            path: 'users/:userId',
            component: UserTasksComponent,
            children: userRoutes,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            data: {
                message: 'Hello!'
            },
            resolve: {
                userName: resolveUserName,
                userTasks: resolveTasks
            }
        },
        {
            path: '**',
            component: NotFoundComponent
        }
    ];