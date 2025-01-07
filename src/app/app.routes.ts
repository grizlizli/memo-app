import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { noteResolver } from './resolvers/note.resolver';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [{
  path: 'auth/login',
  loadComponent: () => LoginComponent,
}, {
  path: 'notes',
  loadComponent: () => NotesListComponent,
  canActivate: [authGuard]
}, {
  path: 'notes/new',
  loadComponent: () => CreateNoteComponent,
  canActivate: [authGuard]
}, {
  path: 'notes/:id',
  loadComponent: () => NoteDetailsComponent,
  canActivate: [authGuard],
  resolve: {
    note: noteResolver
  }
}, {
  path: '**',
  redirectTo: '/notes'
}];
