import { Component } from '@angular/core';
import { NoteFormComponent } from '../../components/note-form/note-form.component';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [NoteFormComponent],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss'
})
export class CreateNoteComponent {

}
