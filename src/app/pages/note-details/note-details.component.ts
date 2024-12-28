import { Component, DestroyRef, inject } from '@angular/core';
import { NoteFormComponent, NoteFormData } from '../../components/note-form/note-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../interfaces/note';
import { NotesService } from '../../services/notes.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [NoteFormComponent, MatSnackBarModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent {
  private readonly notesService = inject(NotesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly id = this.route.snapshot.paramMap.get('id')!;
  readonly note = this.route.snapshot.data['note'] as Note;

  save(note: Partial<NoteFormData>) {
    if (note.content === this.note.content && note.title === this.note.title) {
      this.snackBar.open('No changes made...', 'Ok');
    }
    else {
      this.notesService.updateNoteById(this.id, note as Partial<Note>)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: _note => {
            this.snackBar.open('Note updated successfully!', 'Ok');
            this.router.navigate(['/notes']);
          },
          error: (_error) => {
            this.snackBar.open('Failed to create a note, please retry.', 'Ok');
          }
        })
      }
  }
}
