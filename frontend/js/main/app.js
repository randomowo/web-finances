window.onload = async () => {
    await initSession();
    await initHeader();
    await loadPage(window.localStorage.getItem('page'));

}


const initHeader = async () => {

}

const loader = async (enable) => {
    const loaderEl = document.getElementById('loader');

    if (enable) {
        loaderEl.removeAttribute('hidden');
    } else {
        loaderEl.setAttribute('hidden', 'true');
    }
}