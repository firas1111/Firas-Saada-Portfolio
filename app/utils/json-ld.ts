import type { Portfolio } from '#shared/types/portfolio'

/** schema.org Person built from the same content as the page. */
export function personJsonLd(portfolio: Portfolio, siteUrl: string) {
  const { person, hero, about, skills, seo } = portfolio
  const technical = new Set(['languages', 'backend', 'integration', 'frontend', 'data'])

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': person.name,
    'url': `${siteUrl}/`,
    'email': `mailto:${person.email}`,
    'jobTitle': hero.role.text,
    'description': seo.description,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': person.address.locality,
      'addressCountry': person.address.countryCode,
    },
    'alumniOf': {
      '@type': 'CollegeOrUniversity',
      'name': `${about.education.school} – ${about.education.schoolFull}`,
    },
    'hasCredential': {
      '@type': 'EducationalOccupationalCredential',
      'name': about.certification.name,
      ...(about.certification.href && { url: about.certification.href }),
    },
    'knowsLanguage': about.languages.items.map(language => language.name),
    'knowsAbout': skills.filter(group => technical.has(group.id)).flatMap(group => group.items),
    'sameAs': [person.linkedin, about.certification.href].filter(Boolean),
  }
}
