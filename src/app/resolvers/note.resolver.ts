import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note';
import { inject } from '@angular/core';
import { NotesService } from '../services/notes.service';

export const noteResolver: ResolveFn<Observable<Note>> = (route, _state) => {
  const notesService = inject(NotesService);
  // get the latest version from the server;
  // we could load from the signal state but we could get the previous version of the note with given id
  return notesService.getNoteById(route.paramMap.get('id')!);
};
