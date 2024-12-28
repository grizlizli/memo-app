import { Component, input, output } from '@angular/core';
import { Note } from '../../interfaces/note';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notes-list-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './notes-list-item.component.html',
  styleUrl: './notes-list-item.component.scss'
})
export class NotesListItemComponent {
  readonly note = input.required<Note>();
  readonly readMore = output<string>();
  readonly remove = output<string>();
}
