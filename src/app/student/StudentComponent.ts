import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  showAdd!: boolean;
  showUpDate!: boolean;
  studentmodelobj: studentdata = new studentdata;
  allstudentdata:any;
  


  formValue!: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
    })
    this.getdata();
  }

  Add() {
    this.showAdd = true;
    this.showUpDate = false;
  }

  edit(data:any) {
    this.showAdd = false;
    this.showUpDate = true;
    this.studentmodelobj.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['city'].setValue(data.city)
  }

  update(){
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;
    this.api.updatetstudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
      this.formValue.reset();
      this.getdata();
      alert('Record updated sucessfully');
    },
    err=> {
      alert("something went wrong");
    })
  }

  addstudent() {
    this.studentmodelobj.name = this.formValue.value.name;
    this.studentmodelobj.email = this.formValue.value.email;
    this.studentmodelobj.mobile = this.formValue.value.mobile;
    this.studentmodelobj.city = this.formValue.value.city;

    this.api.poststudent(this.studentmodelobj).subscribe(res => {
      console.log(res);
      alert("record added sucessfully");
    },
      err => {
        alert("something went wrong!!!");
      });
  }
  

  getdata(){
    this.api.getstudent()
    .subscribe(res=>{
      this.allstudentdata = res;
    })
  }

  //delete

  deletestud(data:any) {
    if(confirm('Are you sure to delete?'))
    this.api.deletestudent(data.id)
    .subscribe(res=>{
      alert("record deleted successfully")
      this.getdata();
    })
  }



}
