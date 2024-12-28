import { Component, DestroyRef, effect, inject, Signal } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { NotesListItemComponent } from '../../components/notes-list-item/notes-list-item.component';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NotesListItemComponent, RouterLink, MatSnackBarModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  private readonly notesService = inject(NotesService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  readonly notes: Signal<Note[]> = this.notesService.getNotes();

  navigateToNoteDetailsPage(id: string) {
    this.router.navigate([`/notes/${id}`]);
  }

  removeNote(id: string) {
    this.notesService.deleteNote(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.snackBar.open('Note successfully removed!', 'Ok');
    });
  }
}
