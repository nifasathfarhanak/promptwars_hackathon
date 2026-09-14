import type { LegalDocument } from '../types/legal';

export const SAMPLE_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-lease-01',
    title: 'Residential Lease Agreement (High Risk Sample)',
    documentType: 'lease',
    uploadedAt: '2026-09-14',
    summary: 'A standard-looking apartment lease that contains severe hidden traps: automatic 12-month renewal without mandatory landlord notice, 100% security deposit forfeiture for minor scuffs, and unlimited landlord entry without prior notification.',
    riskScore: 38, // Low score = High Risk
    content: `RESIDENTIAL LEASE AGREEMENT

SECTION 1: TERM & AUTOMATIC RENEWAL
The Lease Term shall commence on October 1, 2026 and expire on September 30, 2027. Unless Tenant provides written notice of non-renewal via certified postal mail exactly 90 days prior to the expiration date, this Lease shall automatically renew for an additional 12-month term at a rent increase of 15%. Verbal or email notifications shall be null and void.

SECTION 2: SECURITY DEPOSIT & FORFEITURE
Tenant shall deposit $2,500 as Security Deposit. Landlord reserves the absolute right to withhold 100% of the deposit for any minor aesthetic scuffs, normal wear and tear, or carpet wear. Furthermore, a non-refundable $350 administrative fee will be deducted regardless of property condition upon move-out.

SECTION 3: RIGHT OF ENTRY & INSPECTION
Landlord and Landlord's agents reserve the right to enter the Premises at any time, 24 hours a day, 7 days a week, without prior notice to Tenant, for inspection, repairs, maintenance, or showing the unit to prospective buyers or tenants.

SECTION 4: MAINTENANCE & UNLIMITED REPAIR OBLIGATIONS
Tenant agrees to be solely responsible for all maintenance and repairs to HVAC systems, plumbing, electrical fixtures, and appliances, regardless of cause or pre-existing condition, exceeding $50 per repair incident.

SECTION 5: INDEMNIFICATION & LIABILITY LIMITATION
Tenant agrees to indemnify, defend, and hold harmless Landlord against any liability, loss, damage, or injury occurring on the Premises, even if caused directly by Landlord's gross negligence or structural maintenance failures. Landlord shall have zero financial liability to Tenant under any circumstances.

SECTION 6: TERMINATION & PENALTIES
In the event Tenant vacates the Premises prior to the Lease Expiration, Tenant shall immediately pay the remaining rent balance for the entire unexpired term, plus an expedited liquidated damages fee of $3,000.`,
    clauses: [
      {
        id: 'clause-l1',
        title: 'Section 1: 90-Day Strict Auto-Renewal',
        originalText: 'Unless Tenant provides written notice of non-renewal via certified postal mail exactly 90 days prior to the expiration date, this Lease shall automatically renew for an additional 12-month term at a rent increase of 15%.',
        simplifiedText: 'If you do not send a physical certified letter 90 days before your lease ends, your lease automatically renews for another full year with a mandatory 15% rent hike.',
        riskLevel: 'high',
        category: 'renewal',
        lineNumberStart: 3,
        lineNumberEnd: 5,
        whyItMatters: '90-day certified mail windows are unusually strict. Most fair leases allow 30–60 days notice via email.',
        recommendation: 'Negotiate notice period down to 30 or 60 days, allow written email notice, and cap annual rent increases at 3-5%.',
        counterProposalText: 'Tenant may provide notice of non-renewal via email or written letter at least 30 days prior to lease expiration. Any renewal rent increase shall not exceed 4%.',
        benchmarkComparison: 'Industry standard notice period is 30–60 days. Certified-mail-only requirements are aggressive traps.'
      },
      {
        id: 'clause-l2',
        title: 'Section 2: Security Deposit Forfeiture for Normal Wear',
        originalText: 'Landlord reserves the absolute right to withhold 100% of the deposit for any minor aesthetic scuffs, normal wear and tear, or carpet wear.',
        simplifiedText: 'The landlord can keep your entire $2,500 deposit even for normal everyday wall scuffs or minor carpet wear.',
        riskLevel: 'high',
        category: 'financial',
        lineNumberStart: 7,
        lineNumberEnd: 9,
        whyItMatters: 'In almost all jurisdictions (e.g., California, New York, UK), landlords are legally barred from withholding deposits for normal wear and tear.',
        recommendation: 'Demand removal of "normal wear and tear" forfeiture language. Deposit deductions must require itemized receipts.',
        counterProposalText: 'Landlord shall return deposit within 21 days with an itemized breakdown. Deposit deductions shall not apply to normal wear and tear.',
        benchmarkComparison: 'Illegal or unenforceable in most tenant-friendly jurisdictions.'
      },
      {
        id: 'clause-l3',
        title: 'Section 3: Unannounced 24/7 Landlord Entry',
        originalText: 'Landlord reserves the right to enter the Premises at any time, 24 hours a day, 7 days a week, without prior notice to Tenant.',
        simplifiedText: 'The landlord or their agents can walk into your apartment at any hour of the day or night without giving you advance notice.',
        riskLevel: 'high',
        category: 'privacy',
        lineNumberStart: 11,
        lineNumberEnd: 13,
        whyItMatters: 'Violates your implied covenant of quiet enjoyment and right to privacy.',
        recommendation: 'Require mandatory 24-hour written notice for non-emergency entries during business hours.',
        counterProposalText: 'Landlord shall provide at least 24 hours prior written notice before entering, except in emergency cases threatening life or property safety.',
        benchmarkComparison: 'Standard law requires 24–48 hours advance notice except in genuine emergencies.'
      },
      {
        id: 'clause-l4',
        title: 'Section 4: HVAC & Structural Repair Burden on Tenant',
        originalText: 'Tenant agrees to be solely responsible for all maintenance and repairs to HVAC systems, plumbing, electrical fixtures, and appliances.',
        simplifiedText: 'If the main air conditioner breaks or plumbing pipes fail, you have to pay out-of-pocket for major repairs.',
        riskLevel: 'medium',
        category: 'financial',
        lineNumberStart: 15,
        lineNumberEnd: 17,
        whyItMatters: 'Landlords are legally obligated to maintain habitable conditions, including structural plumbing and HVAC systems.',
        recommendation: 'Reassign major mechanical and structural repair responsibility back to Landlord.',
        counterProposalText: 'Landlord shall be responsible for repairing and maintaining all structural elements, plumbing, heating, AC, and major electrical systems.',
        benchmarkComparison: 'Tenants are typically only responsible for damage caused by misuse or minor maintenance like changing lightbulbs.'
      },
      {
        id: 'clause-l5',
        title: 'Section 5: Total Landlord Negligence Immunity',
        originalText: 'Tenant agrees to indemnify... even if caused directly by Landlord\'s gross negligence or structural maintenance failures.',
        simplifiedText: 'Even if the landlord\'s reckless negligence causes an injury or property damage, you cannot sue them and must pay their legal costs.',
        riskLevel: 'high',
        category: 'liability',
        lineNumberStart: 19,
        lineNumberEnd: 21,
        whyItMatters: 'Gross negligence indemnification clauses shift catastrophic risk onto the tenant.',
        recommendation: 'Strike out gross negligence indemnification completely.',
        counterProposalText: 'Neither party shall indemnify the other for losses resulting from the other party\'s gross negligence or willful misconduct.',
        benchmarkComparison: 'Unenforceable under standard contract law in many states.'
      }
    ],
    keyObligations: [
      {
        id: 'ob-l1',
        title: 'Monthly Rent Payment',
        partyResponsible: 'Tenant',
        dueDateOrFrequency: '1st of each month',
        description: 'Pay monthly rent on time to avoid non-payment penalties.',
        category: 'payment',
        isCompleted: false
      },
      {
        id: 'ob-l2',
        title: 'Written Notice of Non-Renewal',
        partyResponsible: 'Tenant',
        dueDateOrFrequency: '90 days before Sept 30 (July 2, 2027)',
        description: 'Send certified physical mail to landlord stating intent to move out.',
        category: 'notice',
        isCompleted: false
      },
      {
        id: 'ob-l3',
        title: 'HVAC Filter & Appliance Upkeep',
        partyResponsible: 'Tenant',
        dueDateOrFrequency: 'Quarterly',
        description: 'Maintain appliance cleanliness and minor repairs over $50.',
        category: 'compliance',
        isCompleted: false
      }
    ]
  },
  {
    id: 'doc-emp-02',
    title: 'Senior Software Engineer Employment Agreement',
    documentType: 'employment',
    uploadedAt: '2026-09-14',
    summary: 'Tech employment contract featuring aggressive worldwide non-compete clauses, total assignment of all inventions created even in personal off-hours, and broad non-solicitation restrictions.',
    riskScore: 52,
    content: `EMPLOYMENT AGREEMENT

SECTION 1: DUTIES & AT-WILL EMPLOYMENT
Employee is hired as Senior Software Engineer. Employment is at-will and may be terminated by Company at any time with zero severance.

SECTION 2: INTELLECTUAL PROPERTY & ALL INVENTIONS ASSIGNMENT
Employee agrees that any and all inventions, code, software, trade secrets, patents, domain names, or ideas conceived, developed, or reduced to practice by Employee—whether during working hours or personal off-hours, whether on Company equipment or personal devices, and whether related to Company business or personal side projects—shall immediately become the sole and exclusive property of Company.

SECTION 3: NON-COMPETE COVENANT
For a period of 24 months following termination of employment for any reason, Employee shall not directly or indirectly work for, consult with, advise, or hold equity in any software, technology, internet, or computing company anywhere in the world.

SECTION 4: NON-SOLICITATION OF CLIENTS AND EMPLOYEES
For 24 months post-termination, Employee shall not solicit, recruit, hire, or communicate with any employees, contractors, clients, or leads of Company.

SECTION 5: DISPUTE RESOLUTION & ARBITRATION
Any dispute arising from this Agreement shall be settled by binding arbitration in Delaware. Employee waives all rights to trial by jury or participation in class actions, and agrees to pay Company's legal fees in full regardless of arbitration outcome.`,
    clauses: [
      {
        id: 'clause-e1',
        title: 'Section 2: Off-Hours Personal IP Seizure',
        originalText: '...whether during working hours or personal off-hours, whether on Company equipment or personal devices, and whether related to Company business or personal side projects—shall immediately become the sole property of Company.',
        simplifiedText: 'Any app, side project, open-source code, or business idea you create in your free time at home on your personal laptop belongs 100% to the employer.',
        riskLevel: 'high',
        category: 'intellectual_property',
        lineNumberStart: 6,
        lineNumberEnd: 8,
        whyItMatters: 'Prevents you from owning any personal projects or open-source software built outside work hours.',
        recommendation: 'Limit IP assignment strictly to work performed within the scope of employment using company resources.',
        counterProposalText: 'IP assignment shall apply exclusively to inventions developed directly during working hours, using Company resources, and directly relating to Company\'s core business.',
        benchmarkComparison: 'States like California, Washington, and Minnesota explicitly invalidate employer claims over personal off-hours IP.'
      },
      {
        id: 'clause-e2',
        title: 'Section 3: 2-Year Worldwide Non-Compete',
        originalText: 'For a period of 24 months... Employee shall not directly or indirectly work for... any software, technology, internet, or computing company anywhere in the world.',
        simplifiedText: 'You cannot work for ANY tech or software company anywhere on planet Earth for 2 full years after leaving this job.',
        riskLevel: 'high',
        category: 'obligations',
        lineNumberStart: 10,
        lineNumberEnd: 12,
        whyItMatters: 'Extremely restrictive. Would effectively force you out of your career field for two years.',
        recommendation: 'Remove non-compete or restrict narrow direct competitors within a specific geographic radius with paid compensation (gardening leave).',
        counterProposalText: 'Non-compete covenant shall be restricted strictly to direct named competitors for a duration not exceeding 6 months.',
        benchmarkComparison: 'FTC ruling and multiple state laws restrict non-compete clauses. Worldwide tech non-competes are rarely enforceable.'
      },
      {
        id: 'clause-e3',
        title: 'Section 5: Fee Shifting & Jury Waiver',
        originalText: 'Employee waives all rights to trial by jury... and agrees to pay Company\'s legal fees in full regardless of arbitration outcome.',
        simplifiedText: 'You give up your right to a jury court trial, and if you have a legal dispute with the company, you must pay all of their lawyer bills even if you win.',
        riskLevel: 'high',
        category: 'dispute_resolution',
        lineNumberStart: 16,
        lineNumberEnd: 18,
        whyItMatters: 'Making the employee pay employer legal fees "regardless of outcome" prevents you from ever asserting your legal rights.',
        recommendation: 'Change fee shifting to "prevailing party receives attorney fees" or mutual agreement.',
        counterProposalText: 'In the event of arbitration, each party shall bear their own attorney fees, or fees shall be awarded to the prevailing party.',
        benchmarkComparison: 'Paying fees "regardless of outcome" is a severe one-sided penalty clause.'
      }
    ],
    keyObligations: [
      {
        id: 'ob-e1',
        title: 'IP Invention Disclosure',
        partyResponsible: 'Employee',
        dueDateOrFrequency: 'Upon creation',
        description: 'Disclose all personal software ideas or code created during employment.',
        category: 'compliance',
        isCompleted: false
      },
      {
        id: 'ob-e2',
        title: 'Non-Solicitation Period',
        partyResponsible: 'Employee',
        dueDateOrFrequency: '24 months post-resignation',
        description: 'Refrain from contacting former co-workers or company clients.',
        category: 'notice',
        isCompleted: false
      }
    ]
  },
  {
    id: 'doc-freelance-03',
    title: 'Freelance Design & Development Contract (Balanced)',
    documentType: 'freelance',
    uploadedAt: '2026-09-14',
    summary: 'A standard freelance agreement with fair milestone payments, explicit copyright transfer upon full payment, and capped liability.',
    riskScore: 84, // Safe / Fair
    content: `FREELANCE SERVICES AGREEMENT

SECTION 1: SCOPE & DELIVERABLES
Contractor agrees to deliver UI/UX Design and Frontend Web Application as described in Schedule A by November 15, 2026.

SECTION 2: PAYMENT TERMS & MILESTONES
Total project fee is $8,000. Payment schedule: $2,500 initial deposit upon signing, $2,500 upon design approval, $3,000 upon final deployment. Invoices are net-15 days. Late payments accrue interest at 1.5% per month.

SECTION 3: INTELLECTUAL PROPERTY & TRANSFER
All copyright and intellectual property rights in final custom deliverables shall transfer to Client exclusively upon Contractor's receipt of payment in full. Contractor retains ownership of pre-existing tools, libraries, and design frameworks.

SECTION 4: LIMITATION OF LIABILITY
Neither party's total liability under this Agreement shall exceed the total compensation paid to Contractor ($8,000). Neither party shall be liable for indirect or consequential damages.`,
    clauses: [
      {
        id: 'clause-f1',
        title: 'Section 2: Net-15 Payment & Late Interest',
        originalText: 'Invoices are net-15 days. Late payments accrue interest at 1.5% per month.',
        simplifiedText: 'Client must pay within 15 days of invoice. If late, a 1.5% monthly late fee applies.',
        riskLevel: 'low',
        category: 'financial',
        lineNumberStart: 5,
        lineNumberEnd: 7,
        whyItMatters: 'Fair terms protecting contractor cash flow.',
        recommendation: 'Standard payment term. Keep as is.',
        counterProposalText: 'N/A - Term is balanced.',
        benchmarkComparison: 'Standard freelance payment terms.'
      },
      {
        id: 'clause-f2',
        title: 'Section 3: IP Transfer Contingent on Full Payment',
        originalText: 'All copyright... shall transfer to Client exclusively upon Contractor\'s receipt of payment in full.',
        simplifiedText: 'The client owns the final design/code only after they pay you every dollar owed.',
        riskLevel: 'low',
        category: 'intellectual_property',
        lineNumberStart: 9,
        lineNumberEnd: 11,
        whyItMatters: 'Crucial contractor protection preventing clients from taking work without paying.',
        recommendation: 'Retain this clause.',
        counterProposalText: 'N/A - Protects contractor ownership.',
        benchmarkComparison: 'Best practice for independent contractors.'
      },
      {
        id: 'clause-f3',
        title: 'Section 4: Mutual Liability Cap ($8,000)',
        originalText: 'Neither party\'s total liability under this Agreement shall exceed the total compensation paid to Contractor ($8,000).',
        simplifiedText: 'If anything goes wrong, maximum damages capped at the total project cost ($8,000).',
        riskLevel: 'low',
        category: 'liability',
        lineNumberStart: 13,
        lineNumberEnd: 15,
        whyItMatters: 'Protects both freelancer and client from open-ended lawsuits.',
        recommendation: 'Standard cap equal to project fee.',
        counterProposalText: 'N/A - Mutual cap.',
        benchmarkComparison: 'Industry standard for freelance contracts.'
      }
    ],
    keyObligations: [
      {
        id: 'ob-f1',
        title: 'Initial Deposit Payment',
        partyResponsible: 'Client',
        dueDateOrFrequency: 'Upon signing ($2,500)',
        description: 'Pay deposit to initiate design kickoff.',
        category: 'payment',
        isCompleted: true
      },
      {
        id: 'ob-f2',
        title: 'Final Code Deployment',
        partyResponsible: 'Contractor',
        dueDateOrFrequency: 'Nov 15, 2026',
        description: 'Deliver final application source code.',
        category: 'delivery',
        isCompleted: false
      }
    ]
  }
];
