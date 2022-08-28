import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { employeemodel } from './employeedash.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-employeedash',
  templateUrl: './employeedash.component.html',
  styleUrls: ['./employeedash.component.css']
})

export class EmployeedashComponent implements OnInit {


  employeemodelobj: employeemodel = new employeemodel();
  employeedata !: any;
  formvalue!: FormGroup;
  showadd!: boolean;
  showupdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getallemployee()
  }

  clickaddemployee() {
    this.formvalue.reset();
    this.showadd = true;
    this.showupdate = false;
  }

  postemployeedetails() {
    this.employeemodelobj.firstname = this.formvalue.value.firstname
    this.employeemodelobj.lastname = this.formvalue.value.lastname
    this.employeemodelobj.email = this.formvalue.value.email
    this.employeemodelobj.mobile = this.formvalue.value.mobile
    this.employeemodelobj.salary = this.formvalue.value.salary

    this.api.postemployee(this.employeemodelobj)
      .subscribe({
        next: (res) => {
          console.log(res)
          alert("Employee added succesfully")
          let ref = document.getElementById('cancel')
          ref?.click()
          this.formvalue.reset()
          this.getallemployee()
        },
        error: (err) => { console.error(err), alert("there was a error adding the data") },
        complete: () => console.info('complete')
      })
  }

  getallemployee() {
    this.api.getemployee().subscribe({
      next: (res) => {
        this.employeedata = res;
      }
    })
  }


  deleteemployee(row: any) {
    this.api.deleteemployee(row.id).subscribe({
      next: (res) => {
        alert("Employee has been deleted");
        this.getallemployee();
      }
    })
  }

  onEditempployee(row: any) {
    this.showadd = false;
    this.showupdate = true;
    this.employeemodelobj.id = row.id;
    this.formvalue.controls['firstname'].setValue(row.firstname);
    this.formvalue.controls['lastname'].setValue(row.lastname);
    this.formvalue.controls['email'].setValue(row.email);
    this.formvalue.controls['mobile'].setValue(row.mobile);
    this.formvalue.controls['salary'].setValue(row.salary);
  }

  updateemployee() {
    this.employeemodelobj.firstname = this.formvalue.value.firstname
    this.employeemodelobj.lastname = this.formvalue.value.lastname
    this.employeemodelobj.email = this.formvalue.value.email
    this.employeemodelobj.mobile = this.formvalue.value.mobile
    this.employeemodelobj.salary = this.formvalue.value.salary

    this.api.updateemployee(this.employeemodelobj, this.employeemodelobj.id).subscribe({
      next: (res) => {
        alert("Updated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formvalue.reset()
        this.getallemployee()
      }

    })
  }


}



function subscribe(arg0: (res: any) => void) {
  throw new Error('Function not implemented.');
}

