import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';

export const routes: Routes = [{
  path: 'auth/login',
  loadComponent: () => LoginComponent
}, {
  path: 'notes',
  loadComponent: () => NotesListComponent
}, {
  path: 'notes/new',
  loadComponent: () => CreateNoteComponent
}, {
  path: 'notes/:id',
  loadComponent: () => NoteDetailsComponent
}, {
  path: '**',
  redirectTo: '/notes'
}];
