import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
export class SignupComponent implements OnInit {
    signupForm!: FormGroup
    loading = false;
    submitted = false;
    returnUrl: string='';
    users:User[] = [];
    user : User = {
      Firstname:'',
      Lastname:'',
      UserName:'',
      Email:'',
      Password:''

    }
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
        this.initForm();
    }
    initForm() {
        this.signupForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username:['',Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
          
        });
      }
    ngOnInit() {
       
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.signupForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.Signup(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                   
                    this.loading = false;
                    console.log(error);
                });
    }
    clickMe()
       {
        this.router.navigate(['/login']);

       }
}

