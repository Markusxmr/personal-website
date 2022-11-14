import { store } from "../store";

function getSidebarWrapper() {
    return document.body.querySelector('#sidebar');
}

function storedToggledState() {
    const sidebarWrapper = getSidebarWrapper();

    // Uncomment Below to persist sidebar toggle between refreshes
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        document.body.classList.toggle('sb-sidenav-toggled');
    }
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        if (sidebarWrapper) sidebarWrapper.classList.toggle('sb-sidenav-toggled');
    }
}

export function closeSidebarHandler() {
    const sidebarWrapper = getSidebarWrapper();
    document.body.classList.add('sb-sidenav-toggled');
    if (sidebarWrapper) sidebarWrapper.classList.add('sb-sidenav-toggled');
    localStorage.removeItem('sb|sidebar-toggle');
    localStorage.removeItem('sb|sidebar-toggle');
    store.update((state) => ({ ...state, theme: { ...state, darkBg: false } }));
}

export function sidebarToggleHandler(event: any) {
    const sidebarWrapper = getSidebarWrapper();
    event.preventDefault();

    document.body.classList.toggle('sb-sidenav-toggled');
    if (sidebarWrapper) sidebarWrapper.classList.toggle('sb-sidenav-toggled');

    localStorage.setItem(
        'sb|sidebar-toggle',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.body.classList.contains('sb-sidenav-toggled')
    );

    localStorage.setItem(
        'sb|sidebar-toggle',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.body.classList.contains('sb-sidenav-toggled')
    );


    store.update((state) => ({ ...state, theme: { ...state, darkBg: true } }));
}

export function sideBarToggle(selector = "#sidebarToggle") {
    const sidebarToggle = document.body.querySelector(selector);
    const sidebarWrapper = getSidebarWrapper();

    if (sidebarToggle && sidebarWrapper) {
        storedToggledState();
        // sidebarToggle.removeEventListener('click', clickHandler);
        sidebarToggle.addEventListener('click', sidebarToggleHandler);
    }
}