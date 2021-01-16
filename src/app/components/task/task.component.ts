import { TaskModel } from './../../classes/task';
import { MatTableDataSource } from '@angular/material/table';

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TaskService } from 'src/app/services/task.service';
import {ThemePalette} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['title', 'updatedAt','isCompleted','action'];
  dataSource! : MatTableDataSource<TaskModel>;


  //slide toggle
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;






  constructor(
    private taskService:TaskService,
    private _snackBar: MatSnackBar

    ) {}

  ngOnInit(){
    this .fetchAllTaskList();
  }

  ngAfterViewInit() {
  }


  /**
   * fetchAllTaskList
   */
  public fetchAllTaskList() {
    this.taskService.getTasks.subscribe(
      tasks=> {
           if (!tasks) {
             return;
           }

            this.dataSource = new MatTableDataSource<TaskModel>(tasks);
            this.dataSource.paginator = this.paginator;
      }
    );
  }
  /**
   * render
   */
  public render() {
    this.fetchAllTaskList();
  }


  public changeStatus(task:TaskModel){

    this.taskService.changeStatus(task).subscribe(
      message =>{

           this._snackBar.open(message, 'close', {
            duration: 2000,
          });


      }
    )

  }

  public deleteTask(task:TaskModel) {

      this.taskService.deleteTask(task)
    .subscribe(
      resp=>{
         this.fetchAllTaskList();
        this._snackBar.open(resp.msg,"close",{
          duration:1000,
        });
      }
    )
  }

}

