import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FuncoesUser } from '../models/funcoesUser' 
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFoundError } from '../helpers/UserFoundError';

import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    consentimento = false;
    closeResult = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private modalService: NgbModal
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            func: 3
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onCheckBoxClick(e){
        if(e.target.checked) {
            this.consentimento = true;
        } else {
            this.consentimento = false;
        }
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    async onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        if(!this.consentimento) {
            this.alertService.alert(new alert('Precisa de aceitar o tratamento de dados'));
            return;
        }

        this.loading = true;
        var user = await this.accountService.register(this.form.value)
        this.loading = false;
        if (user!=null) {
            this.alertService.success('Registração bem sucedida', { keepAfterRouteChange: true });
            this.router.navigate(['../login'], { relativeTo: this.route });
        } else {
            this.alertService.alert(new alert('Email já existe'));
        }
    }
}
