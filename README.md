💋 Love Scratch Cards

A romantic mini-game for couples: six silver scratch cards, three scratches, and every card hides a little surprise. The winner (my partner 😘) can send her prizes to me with one tap, so I can make them come true.

🔗 Live page: https://dwieser1991-cloud.github.io/Rubellos

After deploying with GitHub Pages, replace the link above with your own: https://YOUR-USERNAME.github.io/REPO-NAME/

✨ Features
🎟️ Six scratch cards, drawn randomly from a pool of prizes
✋ Only 3 scratches allowed, the other cards get locked
💋 One card is always the sweet consolation prize
💖 Floating hearts, confetti effect, light & dark mode
📱 Works with finger (mobile) and mouse (desktop)
✉️ Send the won prizes via Gmail, WhatsApp or copy them to the clipboard
📁 Project structure
├── index.html   # page structure
├── main.css     # styling (romantic theme, light & dark mode)
└── script.js    # scratch logic, prize pool, sending

All three files must be in the same folder.

About the Files

Plain HTML, CSS and JavaScript. No framework, no build step, no database, no backend. The scratch effect is drawn with the HTML <canvas> element.

Because there is no backend, prizes are not sent automatically. The page prepares a ready-to-send message (Gmail compose link, WhatsApp link or clipboard).

Config

Open script.js and edit the constants at the top:

js
const HIS_EMAIL = "your@email.com"; // address that receives the prizes
const MAX = 3;                      // how many cards can be scratched

The prize pool is the PRIZES array ([emoji, text] pairs), the consolation prize is KISS. Add your own ideas, for example personal vouchers.

Tip: the prizes are visible in script.js. If your partner might look at the repository, keep the secrets short or add the personal ones right before she plays.

Run locally

Open index.html in your browser. To publish it for free:

Push the three files to a GitHub repository
Go to Settings → Pages
Choose Deploy from a branch → main → / (root) and save
