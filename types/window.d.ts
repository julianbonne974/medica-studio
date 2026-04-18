declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    netlifyIdentity?: {
      on: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

export {};
