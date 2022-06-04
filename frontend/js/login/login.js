const initLoginPage = () => {
    document.querySelectorAll('input').forEach((inputEl) => {
        inputEl.onchange = () => {
            inputEl.parentElement.classList.remove('error-input');
            inputEl.querySelector('#errors').remove();
        };
    });
    
    document.getElementById('login').onclick = toggleLoginPage;
    document.getElementById('register').onclick = toggleLoginPage;
    document.getElementById('submit-button').onclick = loginEvent;
}

const toggleLoginPage = (event) => {
    const clickedButtonId = event.target.id;
    let newTitle;
    if (clickedButtonId == 'register') {
        document.getElementById('register').setAttribute('disabled', 'true');
        document.getElementById('login').removeAttribute('disabled');
        document.getElementById('email').parentElement.removeAttribute('hidden');
        document.getElementById('submit-button').onclick = registerEvent;
        newTitle = 'register';
    } else {
        document.getElementById('login').setAttribute('disabled', 'true');
        document.getElementById('register').removeAttribute('disabled');
        document.getElementById('email').parentElement.setAttribute('hidden', 'true');
        document.getElementById('submit-button').onclick = loginEvent;
        newTitle = 'login';
    }

    document.getElementsByClassName('title').innerHTML = newTitle;
    document.getElementById('submit-button').innerHTML = newTitle;
}

const getLoginFormData = () => {
    const result = {};

    document.querySelectorAll('input').forEach((inputEl) => {
        result[inputEl.name] = inputEl.value;
    });

    return result;
}

const loginEvent = async () => {
    if (!validateInputs()) {
        return;
    }

    const {username, password} = getLoginFormData();
    await login(username, password);
}

const registerEvent = async () => {
    if (!validateInputs()) {
        return;
    }

    const {username, email, password} = getLoginFormData();
    await register(username, email, password);
}

initLoginPage();