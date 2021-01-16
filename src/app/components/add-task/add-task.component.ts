import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../classes/task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public title:string='';
  public isCompleted:boolean=false;

  @Output() addTaskEvent= new EventEmitter<boolean>();

  constructor(
    private dialog:MatDialog    ) { }

  ngOnInit(): void {
  }

  openTasdkDialog(){
   const dialogRef= this.dialog.open(AddTaskDialogComponent, {
    width:"500px",
     data:{title:this.title,isCompleted:this.isCompleted}
   });

   dialogRef.afterClosed().subscribe(result=>{
     console.log('dialog closed');
      if (result===true) {
        this.addTaskEvent.emit(true);
      }

   });


  }



}


@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-model.component.html',
})
export class AddTaskDialogComponent  {
  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModel,
    private taskService:TaskService,
    private snackBar:MatSnackBar ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    public addTask(task:TaskModel) {
      this.taskService.addTask(task).subscribe(
        resp=>{
          this.dialogRef.close(true);
          this.snackBar.open(resp.msg,"close",{
            duration:1000,
          });

        }
      )
    }

}

