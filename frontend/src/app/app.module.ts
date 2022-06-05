import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './shared/components/form/input/input.component';
import {FormComponent} from './shared/components/form/form.component';

import {CheckAuthGuard} from './session.guard';
import {SessionService} from './data/session/session.service';
import {SessionStorage} from './data/session/session.storage';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        InputComponent,
        FormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [
        CheckAuthGuard,
        SessionService,
        SessionStorage,
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            multi: true,
            deps: [
                SessionService
            ]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}


function initApp(
    sessionService: SessionService
) {
    return () => {
        return new Promise(resolve => {
            Promise.all([
                sessionService.connect()
            ])
                .catch((e) => alert(e))
                .finally(() => resolve(null))
        });
    }
}