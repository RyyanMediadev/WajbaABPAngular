import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { BrancheDetailsComponent } from './branche-details/branche-details.component';

const routes: Routes = [
  { path: '', component: BranchesComponent }, // Matches '/settings/branches'
  { path: ':id', component: BrancheDetailsComponent }, // Matches '/settings/branches/:id'
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
