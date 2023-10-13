import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export default class ResetComponent implements OnInit {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  resetForm!: FormGroup

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  token!: string

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token']
    })

    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    )
  }

  changePassword(): void {
    const obj = { password: this.resetForm.value.password, token: this.token }
    this.authService.resetPassword(obj).subscribe({
      next: (res) => {
        alert('Password Updated Suceesfully !!!')
        this.resetForm.reset()
        this.router.navigate(['login'])
      },
      error: (err) => console.log(err),
    })
  }
}
