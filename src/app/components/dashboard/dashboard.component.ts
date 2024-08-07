import { Component } from '@angular/core';
import { CRUDService } from '../../services/crud.service';
import { Task } from '../../Model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  taskObj : Task = new Task();
  taskArr : Task[] =[];

  TaskValue : string ='';
  editTaskValue : string ='';
  constructor(private crudService:CRUDService){}

  ngOnInit(): void{
    this.taskObj = new Task();
    this.taskArr =[];
    this.TaskValue='';
    this.editTaskValue='';
    this.getAllTasks();
  }

  getAllTasks(){
    this.crudService.getAllTasks().subscribe(
      res =>{
      this.taskArr=res;
      // console.log(res)
    },err =>{
      alert("unable to get list of tasks");
    })
  }

  addTask(){
    if (this.TaskValue.trim() === '') {
      alert('Task name cannot be empty');
      return;
    }

    // this.taskObj.task_name = this.TaskValue;
    // console.log(this.taskObj)
    const newTask = new Task();
    newTask.task_name = this.TaskValue;
    this.crudService.addTask(newTask).subscribe(
      res =>{
      this.ngOnInit();
      this.TaskValue = '';
    },err =>{
      alert('Failed to add task');
      console.log(err);
    })
  }

  editTask(){
    // this.taskObj.task_name = this. editTaskValue;
    if (!this.taskObj.id) {
      alert("Task ID is missing. Please select a task to edit.");
      return;
    }
    this.taskObj.task_name = this. editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res =>{
      this.ngOnInit();
      console.log(res)
    },err =>{
      console.log(err)
      alert("failed to update the task");
    })
  }

  deleteTask(etask:Task){
   if(etask.id !== undefined){
    this.crudService.deleteTask(etask.id).subscribe(res =>{
      this.ngOnInit();
      console.log(res)
    },err =>{
      console.log(err)
      alert("failed to delete the task");
    })
   }
  }


  call(etask : Task){
    this.taskObj= {...etask};
    this.editTaskValue = etask.task_name;
  }
}
