const loadPage = async (page) => {
    const response = await fetch(`/pages/${page}.html`);
    if (!response.ok) {
        alert(`Can\'t load ${page} page`);
        return;
    }
    const tmpHtml = document.createElement('html');
    tmpHtml.innerHTML = await response.text();

    clearPrevPageHead();
    document.getElementById('page').innerHTML = tmpHtml.querySelector('#page').innerHTML;

    await loadPageHead( // should be loaded after page container
        tmpHtml.getElementsByTagName('head')[0]
    );

    window.localStorage.setItem('page', page);
}

const loadPageHead = async (tmpHead) => {
    if (!tmpHead) {
        console.log('no head container');
        return;
    }

    for (let i = 0; i < tmpHead.children.length; i++) {
        const el = tmpHead.children[i].cloneNode(true);
        const newEl = document.createElement(el.tagName);

        for (let j = 0; j < el.attributes.length; j++) {
            const attr = el.attributes[j];
            newEl.setAttribute(attr.name, attr.value)
        }
        newEl.setAttribute('data-page', '');
        document.head.append(newEl);
    }
}

const clearPrevPageHead = () => {
    document.head.querySelectorAll('[data-page]').forEach((el) => {
        el.remove();
    });
}