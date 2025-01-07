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
  readonly #errorLoadingNotes = signal<null | string>(null);

  getErrorLoadingNotes(): Signal<string | null> {
    return this.#errorLoadingNotes.asReadonly();
  }

  createNote(note: Partial<Note>) {
    return this.apiService.post('notes', note);
  }

  getNotes(): Signal<Note[]> {
    this.#errorLoadingNotes.set(null);
    // returning a notes signal as a store. migth be overkill :)
    this.apiService.get<Note[]>('notes')
      .subscribe({
        next: (notes: Note[]) => this.#notes.set(notes),
        error: (_error) => this.#errorLoadingNotes.set('Error loading notes.')
      });

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
