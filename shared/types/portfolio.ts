/**
 * Content model of the site.
 *
 * Every entry lists the ids it was written from in `sources`: experience,
 * bullet and fact_bank ids from cv_master.json (the private fact base behind
 * my CV), or structural keys such as `variants.A.summary` or `skills.backend`.
 * `npm run check:sources` verifies them, and the same data can later ground
 * the "Ask my AI twin" feature with citations.
 */

/** An id in cv_master.json, e.g. `hertz`, `hertz.12`, `skills.backend`. */
export type SourceId = string

export interface Sourced {
  sources: SourceId[]
}

/** A sentence or short phrase, with where it comes from. */
export interface Fact extends Sourced {
  text: string
}

export type PillTone = 'cyan' | 'violet' | 'green' | 'amber' | 'blue' | 'neutral'

export interface Pill extends Sourced {
  text: string
  tone: PillTone
  /** Shows a status dot before the text. */
  dot?: boolean
}

export type ContentIcon = 'car' | 'plane' | 'network' | 'exchange' | 'layers' | 'terminal'

export interface Person extends Sourced {
  name: string
  email: string
  location: string
  address: { locality: string, countryCode: string }
  linkedin?: string
  cv: { href: string, fileName: string }
}

export interface Seo extends Sourced {
  title: string
  description: string
}

export interface Greeting {
  text: string
  /** BCP 47 language tag, set as `lang` on the word. */
  lang: string
  dir?: 'ltr' | 'rtl'
}

export interface Hello extends Sourced {
  greetings: Greeting[]
}

/** `ok`: done or live, `pending`: in progress, `info`: neutral note (no status claimed). */
export type TerminalStatus = 'ok' | 'pending' | 'info'

export interface TerminalLine extends Sourced {
  status: TerminalStatus
  name: string
  text: string
}

export interface Hero {
  pills: Pill[]
  name: Sourced & { first: string, last: string }
  role: Fact
  summary: Fact
  /** Status lines of the hero terminal card. */
  terminal: TerminalLine[]
}

export interface KeyFact extends Sourced {
  value: string
  label: string
}

export interface FlowStep extends Sourced {
  label: string
  /** Optional technical detail, shown in monospace under the label. */
  detail?: string
}

export interface IntegrationStatus extends Sourced {
  kind: 'live' | 'certification'
  label: string
}

export interface Integration extends Sourced {
  id: string
  icon: ContentIcon
  title: string
  company: string
  domain: string
  /** Only set when a fact supports it. */
  status?: IntegrationStatus
  summary: Fact
  detail?: Fact
  flow: FlowStep[]
  impact: Fact[]
  tags: string[]
  /** Highlighted card (the car rental section). */
  featured?: boolean
}

export interface Work {
  intro: Fact
  integrations: Integration[]
}

export interface Experience extends Sourced {
  id: string
  role: string
  company: string
  product?: string
  location: string
  /** `YYYY-MM` */
  start: string
  /** `YYYY-MM`, or `present` */
  end: string
  bullets: Fact[]
  /** A pointer to another section, e.g. the integrations under Work. */
  note?: Fact & { href: string }
}

export interface Project extends Sourced {
  id: string
  icon: ContentIcon
  title: string
  bullets: Fact[]
  tags: string[]
  note?: Fact
  href?: string
}

export interface SkillGroup extends Sourced {
  /** Group key in cv_master.json `skills`. */
  id: string
  label: string
  items: string[]
}

export interface Education extends Sourced {
  school: string
  schoolFull: string
  degree: string
  field: string
  location: string
  start: string
  end: string
}

export interface Certification extends Sourced {
  name: string
  href?: string
}

export interface Languages extends Sourced {
  items: { name: string, level: string }[]
}

export interface About {
  paragraphs: Fact[]
  education: Education
  certification: Certification
  languages: Languages
}

export interface Contact {
  intro: Fact
  location: Fact
}

export interface Portfolio {
  person: Person
  seo: Seo
  hello: Hello
  hero: Hero
  keyFacts: KeyFact[]
  work: Work
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  about: About
  contact: Contact
}
