import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
export interface contactForm {
  name: string,
  phoneno:number | '',
  email:string | '',
  password:string | '',
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataArray: contactForm[] = [];
  isEdit = false
  constructor(
    private router:Router) { }


  ngOnInit() {
  }
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    phoneno: new FormControl("", [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])


    
  })

  getapidata(){
    let req:any = {
      'name': this.contactForm.controls['name'].value,
      'phoneno': this.contactForm.controls['phoneno'].value,}
  }
  gotodashboard(){
    this.router.navigate(['/def'])
  }

}
