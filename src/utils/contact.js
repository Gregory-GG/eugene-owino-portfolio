import site from '../config/site.js';

export function mailtoUrl(subject, body) {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}${params.length ? `?${params.join('&')}` : ''}`;
}

export const mailUrl = mailtoUrl();
export const telUrl = site.phone ? `tel:${site.phone}` : null;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2024-02" -> "Feb 2024" */
export function formatMonth(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-').map(Number);
  return m ? `${MONTHS[m - 1]} ${y}` : String(y);
}

/** Date range for a work entry, or '' when the CV gives no dates. */
export function formatRange(start, end) {
  if (!start) return '';
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}
