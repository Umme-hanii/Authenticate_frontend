import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export default class ForgetPasswordComponent implements OnInit {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  forgetForm!: FormGroup

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    })
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.forgetForm.value).subscribe({
      next: (res) => {
        this.forgetForm.reset()
        alert('Reset Password link is sent to your email')
      },
      error: (err) => console.log(err),
    })
  }
}
