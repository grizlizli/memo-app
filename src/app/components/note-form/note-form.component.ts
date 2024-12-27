import { Component, computed, effect, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent {
  private readonly form = new FormGroup({
    title: new FormControl('', { validators: Validators.required }),
    content: new FormControl('', { validators: Validators.compose([Validators.required, Validators.minLength(3)]) }),
  });

  readonly note = input<Note | null>();

  readonly computedForm = computed(() => {
    const note = this.note();

    if (note) {
      this.form.patchValue({
        title: note.title || null,
        content: note.content || null
      })
    }

    return this.form;
  });
}
