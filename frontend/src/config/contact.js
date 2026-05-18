// Single source of truth for every contact detail shown on the site.
// Update these once and they propagate everywhere — footer, navbar,
// checkout, contact page, schema.org JSON-LD, etc.

// === Phones ===
// Primary — must match Google Business Profile + Justdial + Instagram bio.
// Display variant uses a thin space for readability; tel/wa links must be
// digits-only with the country code, no spaces or punctuation.
export const PHONE_PRIMARY_DISPLAY = '+91 77380 28750';
export const PHONE_PRIMARY_TEL     = '+917738028750';
export const PHONE_PRIMARY_WHATSAPP = '917738028750'; // wa.me path

// Secondary / workshop line.
export const PHONE_SECONDARY_DISPLAY = '+91 86557 87075';
export const PHONE_SECONDARY_TEL     = '+918655787075';

// === Emails ===
// Primary — branded mailbox at the business domain.
export const EMAIL_PRIMARY = 'support@tallefurnituremart.com';

// Personal Gmail fallback used during launch.
export const EMAIL_GMAIL = 'tallefurnituremart@gmail.com';

// === Address ===
export const STORE_NAME = 'Talle Furniture Mart';
export const STORE_ADDRESS_STREET = 'Shop No. 4, Khairani Road, Sakinaka';
export const STORE_ADDRESS_CITY = 'Andheri East';
export const STORE_ADDRESS_REGION = 'Mumbai, Maharashtra';
export const STORE_ADDRESS_PIN = '400072';
export const STORE_ADDRESS_FULL = `${STORE_ADDRESS_STREET}, ${STORE_ADDRESS_CITY}, ${STORE_ADDRESS_REGION} — ${STORE_ADDRESS_PIN}`;

// === Hours ===
export const STORE_HOURS = 'Mon–Sat · 10:00 AM – 9:00 PM';

// === Helper builders ===
export const telLink      = (display, tel) => ({ href: `tel:${tel}`, text: display });
export const waLink       = (msg = 'Hi Talle Furniture Mart! I have a question about your chairs.') =>
  `https://wa.me/${PHONE_PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const mailtoLink   = (email = EMAIL_PRIMARY, subject = '') =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
