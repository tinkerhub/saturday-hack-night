declare module 'css-paint-polyfill';

declare namespace CSS {
    namespace paintWorklet {
        export function addModule(url: string): void;
    }
}
