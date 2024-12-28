import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Note } from '../interfaces/note';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly apiService = inject(ApiService);

  readonly #notes = signal<Note[]>([]);

  createNote(note: Partial<Note>) {
    return this.apiService.post('notes', note);
  }

  getNotes(): Signal<Note[]> {
    this.apiService.get<Note[]>('notes')
      .subscribe((notes: Note[]) => this.#notes.set(notes));

    return this.#notes.asReadonly();
  }

  getNoteById(id: string) {
    return this.apiService.get<Note>(`notes/${id}`);
  }

  updateNoteById(id: string, payload: Partial<Note>) {
    return this.apiService.patch<Note>(`notes/${id}`, payload);
  }

  deleteNote(id: string) {
    return this.apiService.delete<Note>(`notes/${id}`)
      .pipe(
        tap(() => {
          this.#notes.update((notes) => notes.filter(n => n.id !== id));
        })
      );
  }
}
