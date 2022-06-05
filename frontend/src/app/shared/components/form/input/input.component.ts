import {Component, Input, OnInit} from '@angular/core';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {AbstractControl, FormGroup, FormGroupDirective, ValidatorFn} from '@angular/forms';

@UntilDestroy()
@Component({
    selector: 'input-container',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    @Input() form!: FormGroup;
    @Input() type!: string;
    @Input() name!: string;
    @Input() placeholder?: string;

    private control!: AbstractControl;

    errors: string[] = [];

    ngOnInit(): void {
        this.control = this.form.controls[this.name];

        this.control.statusChanges
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.errors = Object.keys(this.control.errors || {});
            });
    }

}
