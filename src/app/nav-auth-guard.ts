import { CanDeactivateFn } from '@angular/router';
import { AddProject } from './add-project/add-project';

export const navAuthGuard: CanDeactivateFn<AddProject> = (component, currentRoute, currentState, nextState) => {
  return component.checkUnSavedChanges();
};
