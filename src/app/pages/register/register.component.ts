import { Component, OnInit, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)

  registerForm!: FormGroup

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    )
  }

  register() {
    this.authService.registerService(this.registerForm.value).subscribe({
      next: (res) => {
        alert('User is successfully registered !')
        this.registerForm.reset()
        this.router.navigate(['login'])
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}
