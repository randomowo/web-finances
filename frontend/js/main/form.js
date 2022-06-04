const validateInputs = (selector) => {
    if (!selector) {
        selector = 'input';
    }
    let isValid = true;
    document.querySelectorAll(selector).forEach((inputEl) => {
        const errors = [];
        if (!('hidden' in inputEl.attributes)) {
            if ('required' in inputEl.attributes && !inputEl.value) {
                errors.push('required');
            }
        }

        isValid &= errors.length === 0;
        addErrorsToInput(inputEl, errors);
    });

    return isValid;
}

const addErrorsToInput = (inputEl, errors) => {
    if (errors.length === 0) {
        return;
    }

    inputEl.classList.push('error-input');
    let errorsEl = inputEl.parentElement.querySelector('#errors');
    if (!errorsEl) {
        errorsEl = document.createElement('div');
        inputEl.parentElement.appendChild(errorsEl);
    } else {
        errorsEl.innerHTML = '';
    }
    errorsEl.className = 'error-list';
    errorsEl.setAttribute('id', 'errors');
    errors.forEach((error) => {
        const errorEl = document.createElement('span');
        errorEl.innerHTML = errorToErrorText[error];
        errorsEl.appendChild(errorEl);
    });
}

const errorToErrorText = {
    required: 'required'
}