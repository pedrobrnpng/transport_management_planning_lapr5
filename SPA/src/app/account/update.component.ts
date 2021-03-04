import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FuncoesUser } from '../models/funcoesUser'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';

@Component({ templateUrl: 'update.component.html' })
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  closeResult = '';
  email = this.accountService.userValue.email;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    // redirect to home if already logged in
    if (!this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      //@ts-ignore
      nome: [this.accountService.userValue.nome, Validators.required],
      email: [this.accountService.userValue.email, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.email = this.updateForm.value.email;
  }

  private verifyEmail() {
    if(this.accountService.getById(this.email)==null) {
      return true;
    }else {
      return false;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;
    this.accountService.updateData(this.updateForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Atualização efetuada com sucesso', { keepAfterRouteChange: true });
          this.router.navigate(['../../map'], { relativeTo: this.route });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
