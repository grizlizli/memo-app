import { Component, inject } from '@angular/core';
import { NoteFormComponent } from '../../components/note-form/note-form.component';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [NoteFormComponent],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent {
  private readonly route = inject(ActivatedRoute);

  readonly note = this.route.snapshot.data['note'] as Note;
}
