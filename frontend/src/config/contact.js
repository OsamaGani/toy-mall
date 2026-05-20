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

// Secondary line — owner's second number for direct enquiries.
export const PHONE_SECONDARY_DISPLAY = '+91 98673 45138';
export const PHONE_SECONDARY_TEL     = '+919867345138';

// === Emails ===
// Primary — owner's working mailbox. Replace with branded support@ address
// once a custom domain (tallefurnituremart.com) is purchased and mail is set up.
export const EMAIL_PRIMARY = 'abdulrab2411@gmail.com';

// Same mailbox for now — kept as a separate export so future code can
// distinguish "support" vs "personal" once the branded inbox is live.
export const EMAIL_GMAIL = 'abdulrab2411@gmail.com';

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

// === Social profiles ===
// Single source of truth — every social-icon set on the site reads from
// these so the URLs never drift between footer / contact / share buttons.
export const INSTAGRAM_URL = 'https://www.instagram.com/talle_furniture_mart/';
export const FACEBOOK_URL  = 'https://facebook.com/tallefurnituremart';
export const YOUTUBE_URL   = 'https://youtube.com';

// === Helper builders ===
export const telLink      = (display, tel) => ({ href: `tel:${tel}`, text: display });
export const waLink       = (msg = 'Hi Talle Furniture Mart! I have a question about your chairs.') =>
  `https://wa.me/${PHONE_PRIMARY_WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const mailtoLink   = (email = EMAIL_PRIMARY, subject = '') =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
