import type { ContentIcon } from '#shared/types/portfolio'

export type IconName =
  | ContentIcon
  | 'mail' | 'download' | 'copy' | 'check' | 'linkedin' | 'external'
  | 'arrow-up' | 'arrow-right' | 'menu' | 'close'
  | 'award' | 'graduation' | 'globe' | 'pin'

/** Inner markup of 24×24 stroke icons, drawn for this site. */
export const icons: Record<IconName, string> = {
  'car': '<path d="M5 17H3.5v-4.6l1.9-4.7A2 2 0 0 1 7.3 6.5h9.4a2 2 0 0 1 1.9 1.2l1.9 4.7V17H19"/><path d="M3.5 12.5h17"/><path d="M9 17h6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  'plane': '<path transform="rotate(45 12 12)" d="M12 2.5c.83 0 1.5.67 1.5 1.5v5.5l8 4.5v2l-8-2.5V18l2.5 2v1.5L12 20.5l-4 1V20l2.5-2v-4.5l-8 2.5v-2l8-4.5V4c0-.83.67-1.5 1.5-1.5z"/>',
  'network': '<circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="m6.5 6.5 3.7 3.7M17.5 6.5l-3.7 3.7M6.5 17.5l3.7-3.7M17.5 17.5l-3.7-3.7"/>',
  'exchange': '<path d="M4 8h15"/><path d="m15 4 4 4-4 4"/><path d="M20 16H5"/><path d="m9 12-4 4 4 4"/>',
  'layers': '<path d="M12 3 21 8l-9 5-9-5 9-5z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
  'terminal': '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m7.5 9.5 3 2.5-3 2.5"/><path d="M12.5 15h4"/>',
  'mail': '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7.5 8.5 6 8.5-6"/>',
  'download': '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
  'copy': '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/>',
  'check': '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  'linkedin': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16.5"/><path d="M8 7.5v.01"/><path d="M12 16.5v-6"/><path d="M12 13.5a2.5 2.5 0 0 1 5 0v3"/>',
  'external': '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  'arrow-up': '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>',
  'close': '<path d="M6 6l12 12M18 6 6 18"/>',
  'award': '<circle cx="12" cy="9" r="5.5"/><path d="m9 14-1.5 7 4.5-2.5 4.5 2.5L15 14"/>',
  'graduation': '<path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11"/><path d="M21.5 9v5.5"/>',
  'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z"/>',
  'pin': '<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.5"/>',
}
