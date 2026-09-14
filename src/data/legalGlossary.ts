import type { GlossaryTerm } from '../types/legal';

export const LEGAL_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Indemnification',
    pronunciation: 'in-dem-ni-fi-KAY-shun',
    category: 'Liability & Risk',
    plainDefinition: 'An agreement where one party promises to pay for legal damages, costs, or losses suffered by the other party if a lawsuit happens.',
    exampleInContext: '"Tenant agrees to indemnify Landlord for any injuries on the property..."',
    whyWatchOut: 'If broad, you could be forced to pay thousands of dollars in legal fees for accidents that were not your fault.'
  },
  {
    term: 'Arbitration Clause',
    pronunciation: 'ar-bi-TRAY-shun',
    category: 'Disputes',
    plainDefinition: 'A clause requiring legal disputes to be resolved by a private hired arbitrator rather than in a public court with a judge and jury.',
    exampleInContext: '"Any dispute shall be resolved through binding arbitration in Delaware..."',
    whyWatchOut: 'Arbitration often limits your right to appeal, waives jury trial rights, and can be expensive.'
  },
  {
    term: 'Force Majeure',
    pronunciation: 'fors mah-ZHUR',
    category: 'Termination & Performance',
    plainDefinition: 'An "Act of God" clause that excuses parties from fulfilling contract duties during unforeseeable catastrophes (e.g. natural disasters, wars, pandemics).',
    exampleInContext: '"Neither party shall be liable for failure to perform due to Force Majeure events..."',
    whyWatchOut: 'Check whether economic downturns or supply chain delays are included or excluded.'
  },
  {
    term: 'Severability',
    pronunciation: 'seh-vr-uh-BIL-uh-tee',
    category: 'General Contract Rules',
    plainDefinition: 'A provision stating that if one clause of the contract is judged illegal by a court, the rest of the contract remains valid and enforceable.',
    exampleInContext: '"If any provision of this Agreement is held invalid, remaining provisions remain in full force."',
    whyWatchOut: 'Protects the agreement from being completely voided by a single bad clause.'
  },
  {
    term: 'Liquidated Damages',
    pronunciation: 'LI-kwi-day-ted DAM-ih-jez',
    category: 'Financial Penalties',
    plainDefinition: 'A fixed dollar amount agreed upon in advance that one party must pay if they break a specific contract rule.',
    exampleInContext: '"Early cancellation incurs liquidated damages of $3,000."',
    whyWatchOut: 'Often used to impose heavy financial penalties that exceed actual damage caused.'
  },
  {
    term: 'Non-Compete Covenant',
    pronunciation: 'non-kum-PEET',
    category: 'Employment & Business',
    plainDefinition: 'A restriction prohibiting a former worker or business partner from working for a competing business within a specified region and timeframe.',
    exampleInContext: '"Employee shall not work for a competitor for 24 months post-employment..."',
    whyWatchOut: 'Overly broad non-competes can prevent you from earning a living in your field.'
  },
  {
    term: 'Governing Law',
    pronunciation: 'GUH-ver-ning law',
    category: 'Jurisdiction',
    plainDefinition: 'The state or country whose laws will be used to interpret the contract and settle disputes.',
    exampleInContext: '"This Agreement shall be governed by the laws of the State of Delaware."',
    whyWatchOut: 'If the governing law state is far from where you live, pursuing a legal claim can be costly and difficult.'
  },
  {
    term: 'At-Will Employment',
    pronunciation: 'at-WILL',
    category: 'Employment',
    plainDefinition: 'An employment relationship where either employer or employee can end the job at any time for any legal reason without notice.',
    exampleInContext: '"Employment is at-will and may be terminated by either party with or without cause."',
    whyWatchOut: 'Offers zero job security guarantee, though you can also quit without penalty.'
  }
];
