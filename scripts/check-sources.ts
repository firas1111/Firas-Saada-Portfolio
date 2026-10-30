/**
 * Source check: every fact on the site must trace back to cv_master.json, the
 * private fact base behind my CV. The script fails when:
 *
 *  - a `sources` id in the content data doesn't exist in cv_master.json, or an
 *    entry has no sources at all;
 *  - the content claims something listed in `fact_bank.do_not_claim`
 *    (technologies are matched as whole words: "Java" doesn't match "JavaScript");
 *  - a Transavia entry says "from scratch", or an Everbloo entry mentions
 *    CI/CD, Docker or deployment;
 *  - Transavia or BSP Auto are presented as live, or a "live" status has no fact
 *    saying so;
 *  - a skill isn't in the matching cv_master.json group, the text shows a
 *    percentage or a volume metric, a phone number, or an email address other
 *    than the profile one.
 *
 * cv_master.json is never copied into this repository. The script reads it from
 * CV_MASTER_PATH or from its place next to this project, and skips with a
 * warning when it isn't there (on a CI or deploy host, for example).
 *
 * Usage: node scripts/check-sources.ts
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

interface Bullet { id: string }
interface ExperienceEntry { id: string, bullets: Bullet[] }
interface CvMaster {
  profile: { email: string, phone: string }
  experience: ExperienceEntry[]
  projects: { id: string }[]
  skills: Record<string, string[]>
  certifications: { name: string }[]
  fact_bank: Record<string, unknown>
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const cvMasterPath = process.env.CV_MASTER_PATH ?? resolve(root, '../Postul/Auto-Apply/cv_master.json')
const contentDir = join(root, 'shared/content')
const localesDir = join(root, 'i18n/locales')

/** Top-level keys of cv_master.json that may be cited as `key` or `key.path`. */
const STRUCTURAL_KEYS = ['profile', 'variants', 'skills', 'certifications', 'education']

/** fact_bank groups that describe the Everbloo freelance work. */
const EVERBLOO_FACT_GROUPS = ['hertz', 'carbookr', 'transavia', 'bspauto', 'avis', 'car_section', 'workflow', 'partners', 'support']

/** Facts that state a production status; a `live` status must cite one of them. */
const LIVE_EVIDENCE = ['hertz.12', 'carbookr.8']

/** Things colleagues built (fact_bank.do_not_claim), matched as phrases. */
const NOT_MINE = [/streaming search/i, /server-sent events/i, /\bworker threads\b/i, /accounting export/i, /\bMCTO\b/, /approval workflow/i]

/** No percentages and no booking / client volume metrics. */
const METRICS = [/\d\s?%/, /\b\d[\d,.\s]*\+?\s*(bookings?|reservations?|clients?|customers?|agencies|users|travell?ers)\b/i]

if (!existsSync(cvMasterPath)) {
  console.warn(`⚠ Source check skipped: cv_master.json not found at ${cvMasterPath} (set CV_MASTER_PATH to run it).`)
  process.exit(0)
}

const cv = JSON.parse(readFileSync(cvMasterPath, 'utf8')) as CvMaster
const errors: string[] = []

// --- Valid ids --------------------------------------------------------------

const everbloo = cv.experience.find(entry => entry.id === 'everbloo')
const everblooIds = new Set<string>(['everbloo', ...(everbloo?.bullets.map(bullet => bullet.id) ?? [])])
const ids = new Set<string>()

for (const entry of cv.experience) {
  ids.add(entry.id)
  for (const bullet of entry.bullets) ids.add(bullet.id)
}
for (const project of cv.projects) ids.add(project.id)

for (const [group, facts] of Object.entries(cv.fact_bank)) {
  if (!Array.isArray(facts) || group === 'do_not_claim') continue
  for (const fact of facts as { id: string }[]) {
    ids.add(fact.id)
    if (EVERBLOO_FACT_GROUPS.includes(group)) everblooIds.add(fact.id)
  }
}

/** True for a structural path that exists in cv_master.json, e.g. `variants.A.summary`. */
function isStructuralPath(id: string): boolean {
  const [head, ...rest] = id.split('.')
  if (!head || !STRUCTURAL_KEYS.includes(head)) return false
  let node: unknown = cv
  for (const key of [head, ...rest]) {
    if (node === null || typeof node !== 'object' || !(key in node)) return false
    node = (node as Record<string, unknown>)[key]
  }
  return true
}

const isValidId = (id: string) => ids.has(id) || isStructuralPath(id)

// --- Forbidden wording --------------------------------------------------------

/** "Kubernetes, Java, .NET, C#, ..." is the do_not_claim entry made of single words. */
const technologies = (cv.fact_bank.do_not_claim as string[])
  .map(entry => entry.replace(/\.$/, '').split(',').map(item => item.trim()))
  .filter(items => items.length > 1 && items.every(item => !/\s/.test(item)))
  .flat()

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const technologyPatterns = technologies.map(name => ({
  name,
  pattern: new RegExp(`(?<![\\w.#+-])${escape(name)}(?![\\w#+])`, 'i'),
}))

const phoneDigits = cv.profile.phone.replace(/\D/g, '').slice(-8)
const certificationNames = cv.certifications.map(certification => certification.name)

function checkText(text: string, where: string, sources: string[]) {
  const fail = (message: string) => errors.push(`${where}: ${message}\n    "${text}"`)
  const cites = (predicate: (id: string) => boolean) => sources.some(predicate)

  for (const { name, pattern } of technologyPatterns) {
    if (pattern.test(text)) fail(`mentions ${name} (fact_bank.do_not_claim)`)
  }
  for (const pattern of NOT_MINE) {
    if (pattern.test(text)) fail(`claims work listed in fact_bank.do_not_claim (${pattern})`)
  }
  for (const pattern of METRICS) {
    if (pattern.test(text)) fail(`looks like a percentage or volume metric (${pattern})`)
  }
  for (const match of text.matchAll(/AWS Certified [^,.;·\n]+/g)) {
    if (!certificationNames.some(name => match[0].trim().startsWith(name))) fail(`unknown certification "${match[0]}"`)
  }
  for (const match of text.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) {
    if (match[0] !== cv.profile.email) fail(`email address other than profile.email: ${match[0]}`)
  }
  if (phoneDigits && text.replace(/\D/g, '').includes(phoneDigits)) fail('contains the phone number')

  if (cites(id => everblooIds.has(id)) && /\bCI\/CD\b|\bDocker\b|\bdeploy/i.test(text)) {
    fail('Everbloo entry mentions CI/CD, Docker or deployment')
  }
  if (cites(id => id === 'transavia' || id.startsWith('transavia.'))) {
    if (/from scratch/i.test(text)) fail('Transavia was not built from scratch (colleagues started auth and shopping)')
    if (/\blive\b|\bin production\b/i.test(text)) fail('no fact says Transavia is live')
  }
  if (cites(id => id === 'bspauto' || id.startsWith('bspauto.'))) {
    if (/(?<!go-)\blive\b|\bin production\b(?! certification)/i.test(text)) fail('BSP Auto is not live (in production certification)')
  }
}

// --- Walk the content ---------------------------------------------------------

/** Keys that hold identifiers or presentation hints rather than text. */
const NON_TEXT_KEYS = new Set(['sources', 'id', 'icon', 'tone', 'status', 'kind', 'lang', 'dir', 'href', 'start', 'end', 'countryCode'])

let checkedIds = 0

function walk(node: unknown, where: string, inherited: string[]) {
  if (typeof node === 'string') {
    checkText(node, where, inherited)
    return
  }
  if (Array.isArray(node)) {
    node.forEach((item, index) => walk(item, `${where}[${index}]`, inherited))
    return
  }
  if (node === null || typeof node !== 'object') return

  const entry = node as Record<string, unknown>
  let sources = inherited

  if ('sources' in entry) {
    const own = entry.sources
    if (!Array.isArray(own) || own.length === 0 || !own.every(id => typeof id === 'string')) {
      errors.push(`${where}.sources: must be a non-empty list of ids`)
    }
    else {
      for (const id of own) {
        checkedIds++
        if (!isValidId(id)) errors.push(`${where}.sources: unknown id "${id}"`)
      }
      sources = [...inherited, ...own]
    }
  }
  else if (inherited.length === 0 && Object.entries(entry).some(([key, value]) => typeof value === 'string' && !NON_TEXT_KEYS.has(key))) {
    errors.push(`${where}: entry has text but no sources`)
  }

  if (entry.kind === 'live' && !(entry.sources as string[] | undefined)?.some(id => LIVE_EVIDENCE.includes(id))) {
    errors.push(`${where}: a live status must cite ${LIVE_EVIDENCE.join(' or ')}`)
  }

  const skillGroup = (entry.sources as string[] | undefined)?.find(id => id.startsWith('skills.'))?.slice('skills.'.length)
  if (skillGroup && Array.isArray(entry.items)) {
    const known = cv.skills[skillGroup] ?? []
    for (const item of entry.items) {
      if (!known.includes(item)) errors.push(`${where}.items: "${item}" is not in skills.${skillGroup}`)
    }
  }

  for (const [key, value] of Object.entries(entry)) {
    if (key === 'sources' || (typeof value === 'string' && NON_TEXT_KEYS.has(key))) continue
    walk(value, `${where}.${key}`, sources)
  }
}

const display = (path: string) => relative(root, path).replaceAll('\\', '/')

const contentFiles = readdirSync(contentDir).filter(file => file.endsWith('.ts') && file !== 'index.ts')
for (const file of contentFiles) {
  const module = await import(pathToFileURL(join(contentDir, file)).href) as { default: unknown }
  walk(module.default, display(join(contentDir, file)), [])
}

// UI labels carry no facts, but they must not slip in a forbidden claim either.
const localeFiles = readdirSync(localesDir).filter(file => file.endsWith('.json'))
for (const file of localeFiles) {
  const labels = JSON.parse(readFileSync(join(localesDir, file), 'utf8')) as unknown
  const visit = (node: unknown, where: string): void => {
    if (typeof node === 'string') checkText(node, where, [])
    else if (node && typeof node === 'object') {
      for (const [key, value] of Object.entries(node)) visit(value, `${where}.${key}`)
    }
  }
  visit(labels, display(join(localesDir, file)))
}

// --- Report -------------------------------------------------------------------

if (errors.length > 0) {
  console.error(`✖ Source check failed with ${errors.length} problem(s):\n`)
  for (const error of errors) console.error(`  • ${error}`)
  process.exit(1)
}

console.log(`✔ Source check passed: ${checkedIds} source ids in ${contentFiles.length} content file(s), ${localeFiles.length} locale file(s) scanned.`)
