/**
 * Renders the social card and the PNG/ICO favicons into public/ with a local
 * headless Chrome or Edge. Run it after changing the name or the title:
 *
 *   npm run images
 *
 * Set CHROME_PATH if the browser isn't found. The templates load the fonts
 * from Google Fonts while rendering; the site itself never does.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

interface Content {
  person: { name: string }
  hero: { pills: { text: string, dot?: boolean }[], role: { text: string } }
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const { default: content } = await import(pathToFileURL(join(root, 'shared/content/en.ts')).href) as { default: Content }

const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
]

const browser = BROWSERS.find((path): path is string => Boolean(path && existsSync(path)))
if (!browser) {
  console.error('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.')
  process.exit(1)
}

const FONTS = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=block'

const escapeHtml = (text: string) => text.replace(/[&<>"]/g, char => `&#${char.charCodeAt(0)};`)
const [firstName = '', ...rest] = content.person.name.split(' ')
const lastName = rest.join(' ')
const role = content.hero.role.text
const availability = content.hero.pills.find(pill => pill.dot)?.text ?? ''

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 100%; height: 100%; overflow: hidden; background: #070b16; color: #e6edf7; }
  .gradient { background: linear-gradient(90deg, #60a5fa, #22d3ee); -webkit-background-clip: text; background-clip: text; color: transparent; }
`

const ogHtml = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>${BASE_CSS}
  body { position: relative; font-family: Inter, sans-serif; }
  .glow { position: absolute; inset: 0; background:
    radial-gradient(55% 75% at 12% 0%, rgb(96 165 250 / 0.3), transparent 70%),
    radial-gradient(45% 60% at 100% 100%, rgb(34 211 238 / 0.16), transparent 70%); }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 85% 85% at 15% 10%, #000 30%, transparent 75%); }
  .card { position: relative; display: flex; flex-direction: column; height: 100%; padding: 72px 84px 64px; }
  .top { display: flex; align-items: center; gap: 20px; }
  .monogram { display: grid; place-items: center; width: 64px; height: 64px; border: 2px solid rgb(96 165 250 / 0.5);
    border-radius: 18px; background: rgb(96 165 250 / 0.12); font: 700 26px 'Space Grotesk', sans-serif; }
  .pill { display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; border: 1.5px solid rgb(52 211 153 / 0.4);
    border-radius: 999px; background: rgb(52 211 153 / 0.1); color: #34d399;
    font: 500 17px 'JetBrains Mono', monospace; letter-spacing: 0.06em; text-transform: uppercase; }
  .dot { width: 10px; height: 10px; border-radius: 50%; background: currentColor; }
  h1 { margin-top: 44px; font: 700 132px/0.92 'Space Grotesk', sans-serif; letter-spacing: -0.045em; }
  .role { margin-top: auto; font: 500 33px/1.3 'Space Grotesk', sans-serif; }
  .role span { color: #94a3b8; white-space: nowrap; }
</style></head><body>
  <div class="glow"></div><div class="grid"></div>
  <div class="card">
    <div class="top"><div class="monogram">FS</div><div class="pill"><span class="dot"></span>${escapeHtml(availability)}</div></div>
    <h1>${escapeHtml(firstName)}<br><span class="gradient">${escapeHtml(lastName)}</span></h1>
    <p class="role">${escapeHtml(role).replace(/\s*(\([^)]*\))$/, ' <span>$1</span>')}</p>
  </div>
</body></html>`

// The icon fills a 500×500 page (the smallest headless window) and is scaled
// down with the device scale factor, which Chromium clamps at about 0.25: the
// ICO therefore holds a 128px image, which browsers downscale.
const iconHtml = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>${BASE_CSS}
  html, body { background: #0d1424; }
  body { display: grid; place-items: center; border: 22px solid transparent; border-radius: 110px;
    background: linear-gradient(#0d1424, #0d1424) padding-box, linear-gradient(135deg, #60a5fa, #22d3ee) border-box; }
  span { font: 700 250px 'Space Grotesk', sans-serif; letter-spacing: -0.03em; }
</style></head><body><span class="gradient">FS</span></body></html>`

const workDir = mkdtempSync(join(tmpdir(), 'portfolio-images-'))

function render(name: string, html: string, width: number, height: number, scale = 1): Buffer {
  const page = join(workDir, `${name}.html`)
  const output = join(workDir, `${name}.png`)
  writeFileSync(page, html)
  execFileSync(browser!, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    `--user-data-dir=${join(workDir, 'profile')}`,
    `--window-size=${width},${height}`,
    `--force-device-scale-factor=${scale}`,
    '--virtual-time-budget=8000',
    `--screenshot=${output}`,
    pathToFileURL(page).href,
  ], { stdio: 'ignore' })
  return readFileSync(output)
}

/** Wraps a PNG in an ICO container (one entry, PNG-compressed, supported since Windows Vista). */
function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(22)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // image count
  header.writeUInt8(size % 256, 6) // width (0 means 256)
  header.writeUInt8(size % 256, 7) // height
  header.writeUInt8(0, 8) // palette size
  header.writeUInt8(0, 9) // reserved
  header.writeUInt16LE(1, 10) // color planes
  header.writeUInt16LE(32, 12) // bits per pixel
  header.writeUInt32LE(png.length, 14) // image size
  header.writeUInt32LE(22, 18) // image offset
  return Buffer.concat([header, png])
}

try {
  writeFileSync(join(publicDir, 'og.png'), render('og', ogHtml, 1200, 630))
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), render('apple-touch-icon', iconHtml, 500, 500, 180 / 500))
  writeFileSync(join(publicDir, 'favicon.ico'), pngToIco(render('favicon', iconHtml, 500, 500, 128 / 500), 128))
  console.log('✔ Wrote public/og.png, public/apple-touch-icon.png and public/favicon.ico')
}
finally {
  rmSync(workDir, { recursive: true, force: true })
}
