// Plausible Analytics custom event tracking
// https://plausible.io/docs/custom-event-goals

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>;
        callback?: () => void;
      }
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  props?: Record<string, string | number | boolean>
) => {
  if (typeof window === "undefined" || !window.plausible) {
    return;
  }

  try {
    window.plausible(eventName, { props });
  } catch (error) {
    console.error("Analytics error:", error);
  }
};

// Pre-defined event trackers
export const analytics = {
  projectView: (projectTitle: string, projectSlug: string) => {
    trackEvent("Project View", {
      title: projectTitle,
      slug: projectSlug,
    });
  },

  projectClick: (projectTitle: string, projectSlug: string) => {
    trackEvent("Project Click", {
      title: projectTitle,
      slug: projectSlug,
    });
  },

  contactFormSubmit: () => {
    trackEvent("Contact Form Submit");
  },

  filterChange: (filterName: string) => {
    trackEvent("Filter Change", {
      filter: filterName,
    });
  },
};
