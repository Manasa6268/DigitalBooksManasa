import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserCredentials } from 'src/app/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
export class LoginComponent implements OnInit {
    loginForm!: FormGroup
    loading = false;
    submitted = false;
   
    returnUrl: string='';
    message:string="";
    token:string="";
    cred:UserCredentials={
        userName: '',
        password: ''
    };
    UserId:number=0;
    tokenPayload:any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
       
        private jwtHelper:JwtHelperService,
        private toaster:ToastrService,

    ) {
       
        this.initForm();
     
    }
    initForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          
        });
      }
    clickMe()
       {
        this.router.navigate(['/register']);

       }
    ngOnInit() {
       
       
    }

    
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        
        if (this.loginForm.invalid) {
            return;
        }
        this.authenticationService.logout();
        this.loading = true;
        this.authenticationService.login(this.cred)
            .subscribe(
                data => { 
                    this.toaster.success('Login Successfull!')
                    this.token=data
                    localStorage.setItem('token',this.token);
                    this.tokenPayload = this.jwtHelper.decodeToken(this.token);
                    this.UserId=this.tokenPayload.sub;
                    localStorage.setItem('userid',(this.UserId).toString())
                    localStorage.setItem('Name',this.cred.userName);
                    this.router.navigate(['/homepage']);
                   
                    
                },
                error => {
                    this.toaster.error('Login Failed! Please enter valid username and password')
                    
                    this.loading = false;
                    
                });
            
    }
    clicksearch()
{
  this.router.navigate(["/search"]);
}
}



