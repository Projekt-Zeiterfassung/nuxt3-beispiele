import { getCurrentInstance, onMounted, RendererNode } from 'vue';

export function useOverlay() {
    onMounted(() => {
        const el: HTMLElement = getCurrentInstance()?.vnode?.el as HTMLElement;

        // create overlay
        el.style.position = 'relative';

        const computedStyle = window.getComputedStyle(el);

        const overlay = document.createElement('div');

        overlay.classList.add('overlay');
        overlay.style.borderRadius = computedStyle.borderRadius;
        overlay.style.color = computedStyle.color;

        el.appendChild(overlay);
    });
}