import { Component, effect, inject, Signal } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { NotesListItemComponent } from '../../components/notes-list-item/notes-list-item.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NotesListItemComponent, RouterLink],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  private readonly notesService = inject(NotesService);
  private readonly router = inject(Router);
  readonly notes: Signal<Note[]> = this.notesService.getNotes();

  navigateToNoteDetailsPage(id: string) {
    this.router.navigate([`/notes/${id}`]);
  }
}
