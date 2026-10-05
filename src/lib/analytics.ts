/**
 * Gen Z Pulse - Analytics Wrapper
 * 
 * In a real application, this would wrap Mixpanel or Amplitude.
 * For this MVP, it intercepts events and visually logs them to the console
 * to prove instrumentation architecture.
 */

export const analytics = {
  trackEvent: (eventName: string, properties: Record<string, any> = {}) => {
    if (typeof window === "undefined") return; // SSR check
    
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    
    console.log(
      `%c[ANALYTICS] %c${eventName} %c@ ${timestamp}`,
      "color: #7C3AED; font-weight: bold; padding: 2px 4px; border-radius: 4px; background: rgba(124,58,237,0.1);",
      "color: #10F5A0; font-weight: bold;",
      "color: #94A3B8; font-size: 11px;"
    );
    
    if (Object.keys(properties).length > 0) {
      console.dir(properties);
    }
  },

  identifyUser: (userId: string, traits: Record<string, any> = {}) => {
    if (typeof window === "undefined") return;
    
    console.log(
      `%c[ANALYTICS: IDENTIFY] %c${userId}`,
      "color: #FF2D55; font-weight: bold; padding: 2px 4px; border-radius: 4px; background: rgba(255,45,85,0.1);",
      "color: #F8F8FF; font-weight: bold;"
    );
    if (Object.keys(traits).length > 0) {
      console.dir(traits);
    }
  }
};
