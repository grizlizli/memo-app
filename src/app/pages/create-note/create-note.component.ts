import { Component, DestroyRef, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoteFormComponent, NoteFormData } from '../../components/note-form/note-form.component';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';
import { Note } from '../../interfaces/note';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [NoteFormComponent, MatSnackBarModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss'
})
export class CreateNoteComponent {
  private readonly notesService = inject(NotesService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  save(note: Partial<NoteFormData>) {
    this.notesService.createNote(note as Partial<Note>)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: _note => {
          this.snackBar.open('Note created successfully!', 'Ok');
          this.router.navigate(['/notes']);
        },
        error: _error => {
          this.snackBar.open('Failed to create a note, please retry.', 'Ok');
        }
      });
  }
}
