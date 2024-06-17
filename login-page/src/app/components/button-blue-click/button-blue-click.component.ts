import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-blue-click',
  standalone: true,
  imports: [],
  templateUrl: './button-blue-click.component.html',
  styleUrl: './button-blue-click.component.scss'
})
export class ButtonBlueClickComponent {
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}