const initFinPage = async () => {
    await loadMinimap();
    await loadTags();
    await loadFinances();

    const signEl = document.getElementById('sign');
    for (let i = 0; i < signEl.children.length; i++) {
        signEl.children[i].onclick = toggleSign;
    }

    document.getElementById('tags-input').onkeydown = listInputHandler('tags-input', selectTag);
    document.getElementById('tags-stack').onkeydown = listInputHandler('tags-input', () => {}, addTag);

    document.getElementById('submit').onclick = save();
}

const toggleSign = (event) => {
    const id = event.target.id;
    let otherId;
    if (id === 'plus-sign') {
        otherId = 'minus-sign';
    } else {
        otherId = 'plus-sign';
    }

    event.target.setAttribute('disabled', 'true');
    document.getElementById(otherId).removeAttribute('disabled');
}

const listInputHandler = async (elId, callbackOnFound, callbackOnNotFound) => {
    const el = document.getElementById(elId);
    return (event) => {
        if (event.key === 'Enter') {
            const idOfList = el.getAttribute('list');
            const idOfListOfSelected = el.getAttribute('data-list-selected');

            let found;
            const values = document.getElementById(idOfList);
            for (let i = 0; i < values.children.length; i++) {
                if (el.value === values.children[i].getAttribute('data-tag')) {
                    if (callbackOnFound) {
                        await callbackOnFound(el.value, idOfListOfSelected);
                    }
                    found = true;
                    break;
                }
            }

            if (!found && callbackOnNotFound) {
                await callbackOnNotFound(el.value, idOfListOfSelected);
            }
            el.value = '';
        }
    }
}

const addTag = async (tag, idOfElementToAdd) => {
    if (!confirm(`add ${tag} tag?`)) {
        return;
    }

    await uploadData('tag', {tag});

    const tagEl = document.createElement('span');
    tagEl.setAttribute('data-tag', tag);
    tagEl.onclick = (event) => {
        event.target.remove();
    };
    tagEl.innerHTML = tag;

    document.getElementById(idOfElementToAdd).appendChild(tagEl);

    const tagOptionEl = document.createElement('option');
    tagOptionEl.value = tag;
    document.getElementById('tags-list').appendChild(tagOptionEl);
}

const selectTag = (tag, idOfElementToAdd) => {
    const tagEl = document.createElement('span');
    tagEl.setAttribute('data-tag', tag);
    tagEl.onclick = (event) => {
        event.target.remove();
    };
    tagEl.innerHTML = tag;
    document.getElementById(idOfElementToAdd).appendChild(tagEl);
}

const loadTags = async () => {

}

const loadFinances = async () => {

}

const loadMinimap = async () => {

}

const save = async () => {
    if (!validateInputs()) {
        alert();
        return;
    }

    const data = getFinFormData();
}

const getFinFormData = () => {
    const data = {
        tags: []
    };
    const formEl = document.getElementById('add-form');

    data.date = formEl.querySelector('#date-add').value;
    let sign;
    formEl.querySelectorAll('div#sign span').forEach((signEl) => {
        if (!signEl.getAttribute('disabled')) {
            sign = signEl.innerHTML === '+' ? 1 : -1;
        }
    });

    data.amount = sign * formEl.querySelector('#amount').value;
    formEl.querySelectorAll('#selected-tags-add').forEach((tagEl) => {
        data.tags.push(tagEl.getAttribute('data-tag'));
    });

    return data;
}

await initFinPage();