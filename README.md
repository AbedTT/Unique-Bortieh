# Unique-Bortieh Financial Consult — Company Website

This is the website for **Unique-Bortieh Financial Consult**, a professional accounting, taxation and business consultancy in Accra, Ghana. It serves schools, churches, hotels and small and medium-sized businesses. The site introduces the firm, explains its services and fees, presents the team and gives visitors a way to get in touch.

## What visitors will find

| Page | What it is for |
|------|----------------|
| **Home** | The main page. Introduces the firm and its vision and mission, the services, the three service packages and a comparison table, the sectors served, what sets the firm apart, how an engagement works, and a contact form. |
| **Service pages** | One page for each of the six services, showing what the service includes, which packages cover it, which sectors it helps, and how to get in touch. Reached from the "Learn more" cards on the Home page and from the Services list in the footer. |
| **Team** | Introduces the 14 people behind the firm, with each person's role and background. |
| **FAQ** | Ten answers to common questions about qualifications, packages, fees, confidentiality and getting started. |
| **Privacy Policy** | How visitor information is handled. |
| **Terms of Service** | The rules for using the website and the firm's services. |

## Services shown on the website
- Accounting & Payroll
- Taxation & Regulatory Advisory
- Risk Assessment & Internal Control
- Forensic & Internal Auditing
- Accounting Software Solutions
- Training

Each service has its own page with the details.

## Service packages
| Package | What it covers |
|---------|----------------|
| Starter | Bookkeeping, payroll and management accounts |
| Business Control | Everything in Starter, plus financial statements, risk assessment and internal control |
| Complete Business Support | Everything in Business Control, plus audit spot-checks, software installation and staff training |

Prices are deliberately not shown on the website. Visitors are invited to contact the firm for a proposal. Services can be provided monthly, quarterly, annually or per project, and fees depend on the size of the organization, number of transactions and employees, and the package chosen.

## Who the firm serves
Schools and educational institutions, churches and religious organizations, hotels and hospitality businesses, and small and medium-sized enterprises (SMEs).

## Contact details on the website
- **Email:** uniquebortiehconsult@gmail.com
- **Phone:** 024 972 9775 / 026 376 5556
- **Address:** C/O P.O Box T/N 1856, Teshie Nungua Estate, Accra, Ghana

## Our team
| Name | Role |
|------|------|
| Felix Borteye Bortieh | Managing Partner / Business Development |
| Ezekiel Nibenong Seudib | Tax Manager |
| Rose Afriyie | Management Consultant / Admin |
| Enoch Adjetey | Accountant |
| Enoch Afotey Odai | Audit Manager |
| David Charwetey | Bookkeeping Consultant |
| Caleb Okpoti | Payroll Consultant |
| Mingle Kpakpo Wilmot | Procurement Consultant |
| Daniel Quaye | Field Officer |
| Afotey Abednego Tetteh | IT System Consultant |
| Joseph | Internal Audit |
| Fawuzu Bachua | Internal Audit Manager |
| Josephine Sewah | Secretary |
| Doh Bless Emmanuel | Financial Reporting Consultant |

## Look and feel
- A clean green-and-white design that suits a professional finance firm.
- Works on computers, tablets and phones. The layout adjusts to the screen size.
- Gentle animations as visitors scroll, such as numbers counting up and sections fading in.
- A menu at the top of every page, plus a "back to top" button.

## How to view the website
1. Find the file called **index.html** in this folder.
2. Double-click it. It opens in your usual web browser (Chrome, Edge, Firefox or Safari).
3. Use the menu at the top to move between pages.

No installation is needed. An internet connection is used to load fonts and icons, and to send contact form messages.

## Making changes
- **Wording, names and team details:** these are written directly in the page files. The Team page is in **team.html**, and each service has its own page (for example **taxation-advisory.html** and **training.html**). Ask your web developer to make edits, or edit carefully with a text editor.
- **Photos:** all pictures live in the **images** folder. Replacing a picture with a new one that has the same file name updates it on the site.
- **Colours and fonts:** these are set in **style.css**.
- **Where enquiries are sent:** the Web3Forms access key near the top of the contact form section of **script.js** decides which email address receives enquiries. To send them elsewhere, get a new key for that address at web3forms.com and replace the old one.

Keep a backup copy of the folder before making changes.

## Things to know before going live
- **Switch on the contact form (one-time setup).** The form is built but needs your free Web3Forms access key before it can send anything:
  1. Go to **web3forms.com**, enter **uniquebortiehconsult@gmail.com** and copy the access key they email to that address. You do not need to host the website first.
  2. In **script.js**, replace `PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE` with that key. The key is safe to be public: it can only send email to that one address.
  3. In your Web3Forms dashboard, switch **hCaptcha** on for that key so the check is enforced.
  4. Once the website is on its real web address, send a test enquiry from it. The "I am human" check only works fully on the real domain (on a local computer it shows a "localhost detected" warning).

  After that, every enquiry arrives as an email showing the visitor's name, email, phone number, service of interest and message, and replying goes straight to the visitor. Visitors do not get an automatic confirmation email (Web3Forms only offers that on a paid plan); the page shows them a confirmation instead. The free plan allows 250 enquiries a month. If the form ever fails, visitors see a message asking them to email or call instead.
- **Spam protection.** The form asks visitors to tick an hCaptcha "I am human" box, and also has a hidden trap field and a limit of one message per minute per visitor. The captcha is only loaded when a visitor scrolls near the form.
- **Team photos are not added yet.** Each team member currently shows a placeholder icon. Professional headshots can be added when available.
- **Social media icons are placeholders.** The LinkedIn, Twitter, Facebook, Instagram icons in the footer and on the Contact section do not yet link to real accounts. Add the real addresses or remove the icons before going live. (The per-person icons on the Team page were removed.)
- **Some team profiles are still needed.** Daniel Quaye and Joseph have no written profile yet.
- **The Blog page is hidden.** The file **blog.html** is kept in the folder, but nothing on the website links to it and search engines are asked not to list it. To bring it back, add a "Blog" link to the menu. Note that anyone who knows its exact web address can still open it once the site is online.
- **Client testimonials have been removed.** The earlier quotes were sample text. Add real client testimonials, with permission, when you have them.
- **Have a professional read the legal pages.** The Privacy Policy now describes what the website really does (no cookies of its own, no analytics; the enquiry form service, the captcha, Google Fonts, unpkg and the web hosting provider are named as outside services). If you add analytics, cookies, a new form service or change hosting arrangements, update it. The Terms of Service are still standard template text (for example the governing-law clause).

## Hosting checklist
**Upload everything in the folder**, including the `images` folder, `favicon.svg` and all the service pages (`accounting-payroll.html`, `taxation-advisory.html`, `risk-internal-control.html`, `forensic-internal-auditing.html`, `accounting-software.html`, `training.html`). Keep the file names exactly as they are.

**After the site is online:**
1. Make sure the address starts with **https://** (a padlock in the browser).
2. In the Web3Forms dashboard, update your form's **Website URL** to the real domain, and confirm **hCaptcha** is switched on in the form's settings.
3. Send a real test enquiry from the live site and check that it arrives in **uniquebortiehconsult@gmail.com**.
4. Open the site on a real phone and on a second browser (Safari or Firefox) and click through the pages.

**For whoever manages the hosting (optional but recommended):** if the host lets you add response headers, add `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` and `Strict-Transport-Security: max-age=31536000`. The pages already carry a Content-Security-Policy, but a web page cannot use it to stop other sites from framing it; only a header can.
