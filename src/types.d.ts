declare global {
    interface Window {
        requestIdleCallback: (callback: () => void, options?: { timeout?: number }) => number;
        __localizedThemeAria?: (isCurrentlyLightMode: boolean) => string;
    }
}