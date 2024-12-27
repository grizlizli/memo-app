import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly apiService = inject(ApiService);

  readonly #notes = signal<Note[]>([]);

  getNotes(): Signal<Note[]> {
    this.apiService.get<Note[]>('notes')
      .subscribe((notes: Note[]) => this.#notes.set(notes));

    return this.#notes.asReadonly();
  }

  getNoteById(id: string) {
    return this.apiService.get<Note>(`notes/${id}`);
  }

}
