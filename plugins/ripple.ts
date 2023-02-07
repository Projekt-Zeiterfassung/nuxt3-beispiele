import { FunctionDirective } from 'vue';

const ripple: FunctionDirective<HTMLElement, string> = (el, binding) => {
    let color: string | null = null,
        cls: string | null = null;

    switch (binding.arg) {
        case 'color':
            color = binding.value;
            break;
        case 'class':
        default:
            cls = binding.value;
            break;
    }

    el.onclick = event => {
        if (!el.getElementsByClassName('overlay')[0]) return console.warn('No overlay found!');

        const overlay = el.getElementsByClassName('overlay')[0];

        const circle = document.createElement('span');
        const diameter = Math.max(overlay.clientWidth, overlay.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - el.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - el.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        if (color) circle.style.background = color;
        else if (cls) circle.classList.add(cls);

        document.querySelectorAll('span.ripple').forEach(el => el.remove());

        overlay.appendChild(circle);
    };
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('ripple', ripple)
})