import { CanMatchFn, RedirectCommand, ResolveFn, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/user.routes";
import { resolveTasks } from "./tasks/tasks.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 1) {
        return true;
    }

    console.log('canMatch returning redirect command');
    return new RedirectCommand(router.parseUrl('/unauthorized'));

}

export const appRoutes: Routes = [
        {
            path: '',
            component: NoTaskComponent,
            title: 'No Tasks!'
        },
        {
            path: 'users/:userId',
            component: UserTasksComponent,
            canMatch: [dummyCanMatch],
            children: userRoutes,
            runGuardsAndResolvers: 'always',
            data: {
                message: 'Hello!'
            },
            resolve: {
                userName: resolveUserName,
                userTasks: resolveTasks
            },
            title: resolveTitle
        },
        {
            path: '**',
            component: NotFoundComponent
        }
    ];