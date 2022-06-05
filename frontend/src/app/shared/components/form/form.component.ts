import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ControlConfig, FormConfig, InputConfig} from './types';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {mappingZip} from '../../utils';
import {InputComponent} from './input/input.component';


@UntilDestroy()
@Component({
    selector: 'form-container',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent<T> implements OnInit {
    @Input() formConfig$!: BehaviorSubject<FormConfig>;
    @Input() saveText: string = 'save';
    @Output() onSave: EventEmitter<T> = new EventEmitter<T>();

    form: FormGroup = this.fb.group({});
    inputs$!: Observable<ControlConfig[]>;

    constructor(
        private fb: FormBuilder,
    ) {}

    get disabled(): boolean {
        return this.form.invalid;
    }

    ngOnInit() {
        this.inputs$ = this.formConfig$
            .pipe(
                untilDestroyed(this),
                map((config) => Object.values(config))
            );

        this.formConfig$
            .pipe(untilDestroyed(this))
            .subscribe((formConfig) => {
                // this.inputsContainer.clear();
                Object.entries(mappingZip<any>(formConfig, this.form.controls))
                    .forEach(([controlName, v]) => {
                        if (v[0] === null) {
                            this.form.removeControl(controlName);

                        } else {
                            const config = formConfig[controlName!];

                            this.form.addControl(
                                controlName,
                                this.fb.control(
                                    config.config.value,
                                    config.validators
                                )
                            );

                        }
                    });
            });

    }

    save() {
        if (this.form.invalid) {
            return;
        }

        this.onSave.emit(this.form.value);
    }

}
