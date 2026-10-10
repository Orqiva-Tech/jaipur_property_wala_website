/**
 * Google Ads Conversion Tracking Service
 * Account ID: AW-7834020182
 * Action: Submit lead form (Form submission on /contact)
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GOOGLE_ADS_ID =
  import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-7834020182';

// Note: Conversion Label must NOT be guessed. It is loaded from environment variable VITE_GOOGLE_ADS_CONVERSION_LABEL.
export const GOOGLE_ADS_CONVERSION_LABEL =
  import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL || '';

// In-memory set of tracked transaction / lead IDs to prevent duplicate firing in the current session
const firedTransactions = new Set<string>();

export interface TrackConversionPayload {
  transactionId?: string;
  source?: string;
}

/**
 * Track route change in Single Page App (SPA)
 * Notifies Google Tag of virtual page changes (e.g. /contact)
 */
export const trackPageView = (path: string): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  if (path.startsWith('/admin')) return;

  try {
    window.gtag('config', GOOGLE_ADS_ID, {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title
    });
  } catch (err) {
    console.debug('[Google Ads] Route tracking error:', err);
  }
};

/**
 * Tracks lead form submission conversion in Google Ads
 * Rules:
 * 1. Only fires AFTER backend confirms successful enquiry persistence.
 * 2. Never fires on page load, form-button clicks alone, or failed submissions.
 * 3. Never fires on admin routes.
 * 4. Deduplicates repeated calls for the same enquiry/transaction ID.
 * 5. Fires primary standard lead events ('generate_lead', 'form_submit') and,
 *    if conversion label is configured, the explicit 'conversion' action.
 */
export const trackLeadFormConversion = (payload?: TrackConversionPayload): boolean => {
  // Prevent execution on SSR or non-browser environment
  if (typeof window === 'undefined') return false;

  // Prevent firing on admin portal or admin routes
  if (window.location.pathname.startsWith('/admin')) {
    console.debug('[Google Ads] Conversion aborted: Admin route detected.');
    return false;
  }

  const transactionId = payload?.transactionId;

  // Deduplication check
  if (transactionId) {
    if (firedTransactions.has(transactionId)) {
      console.warn(`[Google Ads] Duplicate conversion blocked for transaction ID: ${transactionId}`);
      return false;
    }
    firedTransactions.add(transactionId);
  }

  const currentPath = window.location.pathname;

  // Push to dataLayer for auditing / GTM if present
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'lead_form_submitted',
      page_path: currentPath,
      transaction_id: transactionId || null,
      source: payload?.source || 'contact_page'
    });
  }

  // Verify gtag function
  if (typeof window.gtag !== 'function') {
    console.warn('[Google Ads] window.gtag function not found. Base Google tag might still be loading or blocked by an ad-blocker.');
    return false;
  }

  // Fire standard Google Ads / GA lead generation events (maps to "Submit lead form" primary goal)
  try {
    window.gtag('event', 'generate_lead', {
      event_category: 'Lead',
      event_label: 'Contact Page Lead Form',
      value: 1,
      currency: 'INR',
      transaction_id: transactionId || undefined,
      page_path: currentPath
    });

    window.gtag('event', 'form_submit', {
      form_id: 'contact-lead-form',
      form_name: 'Submit lead form',
      page_path: currentPath,
      transaction_id: transactionId || undefined
    });
  } catch (eventErr) {
    console.debug('[Google Ads] Standard event dispatch warning:', eventErr);
  }

  const label = GOOGLE_ADS_CONVERSION_LABEL?.trim();

  // If specific conversion label is provided, dispatch explicit conversion send_to
  if (label) {
    const sendTo = `${GOOGLE_ADS_ID}/${label}`;
    try {
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        transaction_id: transactionId || undefined,
        event_callback: () => {
          console.log(`[Google Ads] Conversion event successfully transmitted to ${sendTo}`);
        }
      });
    } catch (convErr) {
      console.debug('[Google Ads] Conversion send_to warning:', convErr);
    }
  } else {
    console.info(
      `[Google Ads] Form submission tracked via generate_lead & form_submit under ${GOOGLE_ADS_ID}. ` +
      `Explicit conversion label is not set. If your campaign requires an action-specific snippet, ` +
      `add VITE_GOOGLE_ADS_CONVERSION_LABEL in your environment settings.`
    );
  }

  return true;
};
