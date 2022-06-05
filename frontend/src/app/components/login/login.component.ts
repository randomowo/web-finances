import {Component} from '@angular/core';
import {FormConfig} from '../../shared/components/form/types';
import {Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    state: 'login' | 'register' = 'login';

    get oppositeState(): 'login' | 'register' {
        if (this.state === 'login') {
            return 'register';
        } else {
            return 'login';
        }
    }

    formConfig: FormConfig = {
        username: {
            config: {
                type: 'text',
                name: 'username',
                placeholder: 'username',
            },
            validators: [Validators.required]
        },
        password: {
            config: {
                type: 'password',
                name: 'password',
                placeholder: 'password'
            },
            validators: [Validators.required, Validators.minLength(6)]
        },
    };

    formConfig$: BehaviorSubject<FormConfig> = new BehaviorSubject<FormConfig>(this.formConfig);

    toggleState() {
        this.state = this.oppositeState;
        if (this.state === 'login') {
            this.formConfig$.next(this.formConfig);

        } else {
            this.formConfig$.next(
                {
                    email: {
                        config: {
                            type: 'email',
                            name: 'email',
                            placeholder: 'my@mail.ru'
                        },
                        validators: [Validators.required, Validators.email]
                    },
                    ...this.formConfig,
                },
            );
        }
    }

    process(data: any) {
        console.log(data);
    }
}
