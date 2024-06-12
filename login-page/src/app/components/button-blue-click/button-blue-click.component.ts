import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-blue-click',
  standalone: true,
  imports: [],
  templateUrl: './button-blue-click.component.html',
  styleUrl: './button-blue-click.component.scss'
})
export class ButtonBlueClickComponent {

  @Output() onClick = new EventEmitter<any>();

  onClickButton(event: any) {
      this.onClick.emit(event);
  }
}