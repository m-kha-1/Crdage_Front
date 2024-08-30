
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { ProductionsComponent } from './productions/productions.component';
import { ProductionIdtasksComponent } from './production-idtasks/production-idtasks.component';

import { TaskDetailsComponent } from './task-details/task-details.component';

export const routes: Routes = [
    {path:'',component: LoginComponent},
 
    {path:'productions', component: ProductionsComponent},

    {path:'productionsIdTasks', component:ProductionIdtasksComponent },

    {path:'taskdetails', component:TaskDetailsComponent},
    

];



// export const routes: Routes = [
//     {path:'login',component: LoginComponent},
//     {path:'new', component: NewComponent},
//     {path:'productions', component: ProductionsComponent},
//     {path:'productionsIdTasks', component:ProductionIdtasksComponent },
//     {path:'add', component:AddformComponent },
//     {path:'taskdetails', component:TaskDetailsComponent},
    

// ];
