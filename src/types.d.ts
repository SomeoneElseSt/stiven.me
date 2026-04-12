declare global {
    interface Window {
        requestIdleCallback: (callback: () => void, options?: { timeout?: number }) => number;
    }
}