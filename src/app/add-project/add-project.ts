import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css'
})
export class AddProject {
  projectForm:FormGroup;
  saved:boolean=false;
  constructor(private fb:FormBuilder){
    this.projectForm=this.fb.group({
      projectName:['',Validators.required],
      description:[''],
      image:[''],
      tags:[''],
      links:this.fb.group({
        github:[''],
        website:[''],
      })
    });
  }
  ngOnInit() {
    this.projectForm.valueChanges.subscribe(() => {
      this.saved = false;
    });
  }
  onSubmit(){
      console.log(this.projectForm.controls['projectName'].value);
  }
  onReset(){
    this.projectForm.reset();
  }
  onSave(){
    this.saved=true;
  }
  checkUnSavedChanges():boolean{
    if(!this.projectForm.dirty||this.saved){
      return true;
    }
    else return confirm("You have unsaved Changes. Click ok to proceed");
  }
}
