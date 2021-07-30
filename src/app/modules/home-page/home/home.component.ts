import { Component, OnInit } from '@angular/core';
import {TaskModel} from '../../../services/task/model/task-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskList: TaskModel[] = [];

  form: FormGroup;


  constructor(
    private  formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.form = this.formBuilder.group({
      task : new FormControl('', Validators.required)
    });
  }

  addTask() {
    if (this.form.invalid) {
      return;
    }
    const id = Guid.create().toString();
    const task = {
      id,
      description : this.form.controls.task.value,
      isDone: false
    };
    this.form.controls.task.patchValue('');
    this.taskList = [...this.taskList, task];
  }


  changeStatus(id: string) {
    this.taskList.find(x => x.id === id ).isDone = true;
  }

  removeItem(id: string) {
    this.taskList.splice(this.taskList.findIndex(x => x.id === id), 1);
  }
}
