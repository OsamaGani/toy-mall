// Single source of truth for every contact detail shown on the site.
// Update these once and they propagate everywhere — footer, navbar,
// checkout, contact page, schema.org JSON-LD, etc.

// === Phones ===
// Primary — verified Google Business Profile listing for Talle Furniture Mart.
// Display variant uses a thin space for readability; tel/wa links must be
// digits-only with the country code, no spaces or punctuation.
export const PHONE_PRIMARY_DISPLAY = '+91 93261 66875';
export const PHONE_PRIMARY_TEL     = '+919326166875';
export const PHONE_PRIMARY_WHATSAPP = '919326166875'; // wa.me path

// Secondary / workshop line — placeholder, to be updated when owner provides.
export const PHONE_SECONDARY_DISPLAY = '+91 93261 66875';
export const PHONE_SECONDARY_TEL     = '+919326166875';

// === Emails ===
// Primary — branded mailbox at the business domain (placeholder until provided).
export const EMAIL_PRIMARY = 'support@tallefurnituremart.com';

// Gmail fallback used during launch (placeholder until provided).
export const EMAIL_GMAIL = 'tallefurnituremart@gmail.com';

// === Address ===
// From the verified Google Business Profile.
export const STORE_NAME = 'Talle Furniture Mart';
export const STORE_ADDRESS_STREET = "Shop No. 5, D'Souza Sadan, near Peninsula Grand Hotel";
export const STORE_ADDRESS_CITY = 'Sainath Wadi, Lokmanya Tilak Nagar, Saki Naka';
export const STORE_ADDRESS_REGION = 'Mumbai, Maharashtra';
export const STORE_ADDRESS_PIN = '400072';
export const STORE_ADDRESS_FULL = `${STORE_ADDRESS_STREET}, ${STORE_ADDRESS_CITY}, ${STORE_ADDRESS_REGION} — ${STORE_ADDRESS_PIN}`;

// === Hours ===
export const STORE_HOURS = 'Open 24 hours · 7 days a week';

// === Helper builders ===
export const telLink      = (display, tel) => ({ href: `tel:${tel}`, text: display });
export const waLink       = (msg = 'Hi Talle Furniture Mart! I have a question about your chairs.') =>
  `https://wa.me/${PHONE_PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const mailtoLink   = (email = EMAIL_PRIMARY, subject = '') =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
