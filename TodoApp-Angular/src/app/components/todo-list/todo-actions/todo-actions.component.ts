import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-todo-actions',
  templateUrl: './todo-actions.component.html',
  styleUrls: ['./todo-actions.component.css']
})
export class TodoActionsComponent implements OnInit {
  @Output() completed = new EventEmitter<{selected: boolean}>()
  @Output() notCompleted = new EventEmitter<{selected: boolean}>()

  constructor() { }

  ngOnInit() {
  }

  onComplectedClick(optInput: HTMLInputElement) {
    console.log(optInput.checked)
    this.completed.emit({
      selected: optInput.checked
    })
  }

  onNotCompletedClick(optInput: HTMLInputElement) {
    this.notCompleted.emit({
      selected: optInput.checked
    })
  }

}
