import { Link } from '@/components/Link'
import {
  LegalCompanyInfo,
  LegalHeader,
  LegalLastUpdated,
  LegalList,
  LegalListItem,
  LegalPageContainer,
  LegalSection,
  LegalSubsection,
  LegalTable,
} from '@/components/ui/legal-document'
import { Heading, Paragraph } from '@/components/ui/typography'
import { formatPolicyRevisionDate } from '@/lib/privacyPolicy'

export function PrivacyPolicyEN() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <Heading.H1 variant='legal'>Privacy Policy</Heading.H1>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            E-mail: <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <Heading.H2 variant='legal'>Privacy Policy</Heading.H2>
        <Paragraph variant='legal'>We operate in accordance with the principles set out below:</Paragraph>
        <Paragraph variant='legal'>
          We undertake to comply with the statutory provisions on data protection and endeavor to always observe the
          principles of data avoidance and data minimization.
        </Paragraph>
        <Paragraph variant='legal'>
          This Privacy Policy applies both to the Vocdoni App (<Link href='https://app.vocdoni.io'>app.vocdoni.io</Link>
          ) and to the Vocdoni website (<Link href='https://vocdoni.io'>vocdoni.io</Link>).
        </Paragraph>
        <Paragraph variant='legal'>
          The App includes additional processing activities related to registered users, administrators, and voting
          processes, while the Website is limited to general information and analytics purposes.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>1. The Controller</Heading.H2>
        <LegalSubsection>
          <Heading.H3 variant='legal'>Who is the controller of your personal data?</Heading.H3>
          <Paragraph variant='legal'>
            Synergize S.L. is the data controller responsible for processing personal data in compliance with Regulation
            (EU) 2016/679 (GDPR) and Organic Law 3/2018 (LOPDGDD). Vocdoni App is designed and operated in accordance
            with the principles of lawfulness, fairness, transparency, data minimization, and integrity, integrating
            privacy by design and by default.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>2. For what purpose do we process your personal data?</Heading.H2>
        <Paragraph variant='legal'>
          When you visit our website, we only process minimal technical data (e.g., IP, browser, device type) necessary
          for its correct operation and analytics purposes.
        </Paragraph>
        <Paragraph variant='legal'>
          We use Google Analytics (with anonymized IP addresses), Plausible.io and PostHog for analytics. Google
          Analytics and Plausible.io produce aggregated statistics. PostHog uses a randomly generated identifier which
          is pseudonymous rather than anonymous, and which we therefore treat as personal data. Google Analytics and
          PostHog are loaded only after you accept the cookie banner.
        </Paragraph>
        <Paragraph variant='legal'>
          No personal data is collected for marketing purposes, and no profiling is performed.
        </Paragraph>
        <Paragraph variant='legal'>
          We process your personal data to operate the Vocdoni App (hereinafter the «APPLICATION»), which provides
          secure, verifiable, and privacy-preserving voting and participation processes.
        </Paragraph>
        <LegalList>
          <LegalListItem>
            <strong>(a) Administrators:</strong> process identification, contact, and authentication data to manage
            voting processes.
          </LegalListItem>
          <LegalListItem>
            <strong>(b) Voters:</strong> process credentials or access codes provided by their organization. Votes are
            recorded on the Vocdoni blockchain using cryptographic mechanisms ensuring anonymity.
          </LegalListItem>
          <LegalListItem>
            <strong>(c) Technical data:</strong> device, browser, and IP may be processed for security monitoring and
            fraud prevention, on the basis of our legitimate interest. Analytics are not covered by this item: they rely
            on your consent, as described in sections 3 and 9.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          All processing follows the principle of data minimization: only the information strictly necessary to operate
          the service is collected. Sensitive data is stored in encrypted form to enhance confidentiality and
          protection.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>3. Why can we process your personal data?</Heading.H2>
        <Paragraph variant='legal'>The processing of your data is legitimated on the basis of:</Paragraph>
        <LegalList>
          <LegalListItem>Contractual necessity (Art. 6(1)(b) GDPR)</LegalListItem>
          <LegalListItem>
            Explicit consent (Art. 6(1)(a) GDPR) for optional features, including all analytics that store information
            on your device and the session recording described in section 9
          </LegalListItem>
          <LegalListItem>Legitimate interest (Art. 6(1)(f) GDPR) for security and fraud prevention</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>4. For how long will we keep your personal data?</Heading.H2>
        <LegalList>
          <LegalListItem>
            Data of registered users (administrators) and the data uploaded by them (e.g., membership lists) will be
            kept as long as they maintain their account and contractual relationship with Synergize SL, and thereafter
            during the applicable legal limitation periods.
          </LegalListItem>
          <LegalListItem>
            Voters' data remains within the organization's member list database and is never transferred outside of it.
            Credentials are used solely to generate an address that gives the right to vote and that is not linked to
            any personal data. Members' data will be retained for as long as the administrator maintains the member list
            or until the contractual relationship with Synergize SL comes to an end.
          </LegalListItem>
          <LegalListItem>
            Voters are obfuscated and stored on the blockchain in an immutable and permanent way, without any link to
            personal data.
          </LegalListItem>
          <LegalListItem>
            Analytics events are kept for 12 months. This period allows us to compare one year against the previous one,
            which is the purpose for which the data is collected.
          </LegalListItem>
          <LegalListItem>
            Session recordings in the Vocdoni App are kept for 30 days and are then deleted.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          When data are no longer necessary for these purposes, they will be deleted with appropriate security measures
          for complete destruction.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>5. To whom do we disclose your personal data?</Heading.H2>
        <Paragraph variant='legal'>Your personal data may be disclosed to:</Paragraph>
        <LegalList>
          <LegalListItem>
            <strong>Public Administrations and authorities</strong> when legally required.
          </LegalListItem>
          <LegalListItem>
            <strong>Service providers</strong> that need access to personal data to deliver services to Synergize SL
            (e.g. payment processors, analytics). These providers act as processors under contracts that comply with
            Article 28.3 GDPR.
          </LegalListItem>
        </LegalList>

        <LegalSubsection>
          <Heading.H3 variant='legal'>Website (vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            The website uses Google Analytics (with cookies) and Plausible.io (cookie-free) to obtain aggregated,
            non-identifiable statistics about visits and usage patterns.
          </Paragraph>
          <Paragraph variant='legal'>
            Data is processed in an aggregated and pseudonymized manner and used exclusively for internal analytical
            purposes.
          </Paragraph>
          <Paragraph variant='legal'>
            The website also uses PostHog, provided by PostHog, Inc., to obtain aggregated statistics about visits,
            navigation, and how visitors move from the website to the Vocdoni App. Data is hosted in the European Union
            (PostHog EU Cloud, with storage in Germany) and PostHog acts as a data processor under Article 28(3) GDPR.
            Collection of IP addresses is disabled. PostHog is loaded only after you accept the cookie banner; if you
            reject it, no PostHog cookie is set and no data is transmitted.
          </Paragraph>
          <Paragraph variant='legal'>
            PostHog, Inc. is established in the United States. Although the data is stored in the European Union,
            PostHog may access and process it from outside the European Economic Area, including the United States, for
            support, maintenance and security purposes. This transfer is covered both by PostHog, Inc.'s certification
            under the EU-U.S. Data Privacy Framework and by the Standard Contractual Clauses approved by the European
            Commission, which apply in addition to that certification under the data processing agreement we have
            entered into. You may request a copy of these safeguards at{' '}
            <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>.
          </Paragraph>
          <Paragraph variant='legal'>
            These cookies are limited to analytical purposes. They are not used for advertising or for building
            profiles. The PostHog identifier described in section 9 is shared between vocdoni.io and app.vocdoni.io -
            both operated by Synergize S.L. - solely so that we can measure the transition between our website and our
            own service. It is a pseudonymous identifier and we treat it as personal data. It is not shared with any
            third party. Google Analytics is a third-party service operated by Google, which sets its own cookies under
            its own privacy policy; if you prefer that no third-party analytics cookie is set, you can reject cookies in
            the banner.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>Application (app.vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            In the Vocdoni App, analytics are performed using Plausible, a privacy-first analytics platform that does
            not use cookies or collect personal identifiers, and - for administrators and other registered users who
            have accepted the cookie banner - using PostHog, which does set a cookie and does use a pseudonymous
            identifier.
          </Paragraph>
          <Paragraph variant='legal'>
            Additionally, certain services involve external providers acting as processors under GDPR Article 28(3):
          </Paragraph>
          <LegalList variant='none'>
            <LegalListItem>Stripe Payments Europe, Ltd. – payment processing.</LegalListItem>
            <LegalListItem>Twilio, Inc. – SMS and email delivery to users.</LegalListItem>
            <LegalListItem>
              PostHog, Inc. – product analytics, hosted in the European Union, with access from outside the European
              Economic Area as described above.
            </LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            PostHog is used in the App only for administrators and registered users who have accepted the cookie banner,
            in order to understand how the service is used and improve it. For those same users PostHog also records the
            session, with all text and all form fields masked, as described in section 9. It is never active during
            voting: PostHog is not loaded on voting pages, so no event is generated or transmitted from them and no
            session is recorded there. Voters are not subject to any analytics processing.
          </Paragraph>
          <Paragraph variant='legal'>
            These providers process personal data solely for these purposes and under contractual guarantees of data
            protection.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>5.1 User Support Chat Service (Optional)</Heading.H3>
          <Paragraph variant='legal'>
            This section shall only apply when the website has the user support chat service enabled.
          </Paragraph>
          <Paragraph variant='legal'>
            This website may integrate a real-time chat system provided by <strong>Crisp IM SARL</strong> for the
            purpose of handling user inquiries or incidents during the voting process.
          </Paragraph>
          <Paragraph variant='legal'>
            When the user decides to use the chat, the following personal data are processed:
          </Paragraph>
          <LegalList>
            <LegalListItem>IP address and technical device data.</LegalListItem>
            <LegalListItem>Technical session identifier.</LegalListItem>
            <LegalListItem>Message content.</LegalListItem>
            <LegalListItem>Contact details voluntarily provided by the user.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>The legal basis for this processing is:</Paragraph>
          <LegalList>
            <LegalListItem>
              The legitimate interest of the controller in providing assistance and technical support (Art. 6.1.f GDPR),
              and
            </LegalListItem>
            <LegalListItem>The user’s consent when activating and using the chat service.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            The data are used exclusively for user support management and incident resolution and are not used for
            commercial, advertising, or profiling purposes.
          </Paragraph>
          <Paragraph variant='legal'>
            Crisp acts as a <strong>data processor</strong>, in accordance with Article 28 of the GDPR, and processes
            the data solely following the instructions of <strong>Synergize S.L.</strong> and the controller of the
            voting process.
          </Paragraph>
          <Paragraph variant='legal'>
            Data processed through the chat will be retained for the time necessary to handle the inquiry and,
            thereafter, for the legally required periods to address potential liabilities.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>6. What are your rights as a registered user?</Heading.H2>
        <Paragraph variant='legal'>Your rights include the following, but are not limited to:</Paragraph>
        <LegalList>
          <LegalListItem>Right to request information in accordance with Art. 15 GDPR</LegalListItem>
          <LegalListItem>Right to request rectification under Article 16 GDPR</LegalListItem>
          <LegalListItem>
            Right of deletion of your personal data, provided that further processing is not necessary for any of the
            reasons stated under Art. 17 GDPR
          </LegalListItem>
          <LegalListItem>
            Right to request the restriction of processing of your personal data for any of the reasons stated under
            Art. 18 GDPR
          </LegalListItem>
          <LegalListItem>
            Right of transmission of your data in a structured, commonly used, and machine-readable format.
          </LegalListItem>
          <LegalListItem>Right to revoke your consent at any time in accordance with Art. 7 (3) GDPR</LegalListItem>
          <LegalListItem>
            Right to file a complaint with the Spanish supervisory authority (
            <Link href='https://www.aepd.es'>www.aepd.es</Link>) if you consider that the processing does not comply
            with current legislation.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          <strong>Contact information to exercise their rights:</strong>
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL. Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona).
          <br />
          E-mail: <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>7. Security measures</Heading.H2>
        <Paragraph variant='legal'>
          In accordance with the provisions of the current regulations on the protection of personal data, the
          CONTROLLER is complying with all the provisions of the GDPR and LOPDGDD regulations for processing the
          personal data for which they are responsible, and is manifestly complying with the principles described in
          Article 5 of the GDPR, by which they are processed in a lawful, fair and transparent manner in relation to the
          data subject and are appropriate, relevant, and limited to what is necessary in relation to the purposes for
          which they are processed.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL guarantees that appropriate technical and organizational policies have been implemented to apply
          the security measures established by GDPR and LOPDGDD in order to protect the rights and freedoms of the
          users.
        </Paragraph>
        <LegalList>
          <LegalListItem>
            All communications between the APPLICATION and servers are encrypted (HTTPS/TLS).
          </LegalListItem>
          <LegalListItem>
            Sensitive data (e.g. authentication credentials, membership lists) are stored in encrypted form.
          </LegalListItem>
          <LegalListItem>
            The design of the APPLICATION minimizes the collection of personal data, focusing on data strictly necessary
            for functionality.
          </LegalListItem>
          <LegalListItem>
            Votes are anonymized by design and recorded in the Vocdoni blockchain without any link to the voter's
            identity.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          This Privacy Policy was released on {formatPolicyRevisionDate('en')} and is effective as of that date. For
          more information on the guarantees of your privacy, you can contact Synergize SL at{' '}
          <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>8. Data Protection Officer (DPO)</Heading.H2>
        <Paragraph variant='legal'>
          Synergize S.L. has appointed <strong>4Dlegal S.L.</strong> as its Data Protection Officer (DPO) in accordance
          with Articles 37–39 of the GDPR.
        </Paragraph>
        <Paragraph variant='legal'>
          You can contact the DPO at <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link> regarding any questions,
          concerns, or requests related to personal data processing or the exercise of your data protection rights.
        </Paragraph>
        <Paragraph variant='legal'>The DPO acts independently and reports to Synergize's senior management.</Paragraph>
        <Paragraph variant='legal'>
          All communications received by the DPO are treated confidentially and will be responded to within one month,
          extendable by up to two additional months if necessary due to the complexity or number of requests.
        </Paragraph>
      </LegalSection>

      <LegalSection id='cookies'>
        <Heading.H2 variant='legal'>9. Cookies and Tracking Technologies</Heading.H2>
        <Paragraph variant='legal'>
          Our website (vocdoni.io) and App (app.vocdoni.io) use a minimal number of cookies and tracking technologies:
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Google Analytics</strong> – Used on vocdoni.io to collect aggregated statistics about website visits
          and usage. IP addresses are anonymized before storage. Google Analytics is provided by a third party, which
          sets its own cookies under its own privacy policy. It is loaded only after you accept the cookie banner.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Plausible.io</strong> – Used for privacy-friendly, cookie-free analytics on both the website and the
          App.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>PostHog</strong> – Used on both vocdoni.io and app.vocdoni.io, and only after you accept the cookie
          banner. PostHog stores a randomly generated identifier in a cookie scoped to the vocdoni.io domain and its
          subdomains. Because the website and the App read the same identifier, we can tell that a visit to vocdoni.io
          and a later use of app.vocdoni.io come from the same visitor, which allows us to measure how people move
          between our website and our service. This identifier is pseudonymous: it does not identify you by name, but we
          treat it as personal data. It is not shared with any other website or third party. It is stored for 12 months.
          Data is hosted in the European Union and IP addresses are not collected.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Session recording</strong> – In the Vocdoni App only, and only for administrators and other
          authenticated users who have accepted the cookie banner, PostHog also records the session: the pages visited,
          clicks and movement on screen. All text and all form fields are masked. Masking is applied in your own
          browser, which means the masked content is never transmitted to PostHog and never leaves your device. The
          purpose is to identify and fix usability problems. Recordings are kept for 30 days and are then deleted; if a
          recording documents a specific problem it may exceptionally be kept while that problem is resolved, and in no
          case for longer than one year. Session recording is never active on the website vocdoni.io, is never active on
          voting pages, and voters are never recorded.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Consent record</strong> – A cookie named vocdoni-cookie-consent stores your choice on this banner. It
          is scoped to the vocdoni.io domain and its subdomains, so that a decision you make on the website applies in
          the App as well and you are not asked twice. It is stored for 12 months and records your choice, the date on
          which you made it, and the version of this policy in force at that time, identified by its revision date.
        </Paragraph>
        <Paragraph variant='legal'>
          You can change or withdraw your choice at any time, with immediate effect on both vocdoni.io and
          app.vocdoni.io, through the Cookie settings link in the footer of every page, which reopens the banner.
          Withdrawing consent is as easy as giving it and does not affect the lawfulness of processing carried out
          beforehand.
        </Paragraph>
        <Paragraph variant='legal'>Cookies used:</Paragraph>
        <LegalTable
          headers={['Cookie', 'Provider', 'Purpose', 'Duration']}
          rows={[
            [
              'ph_[project_key]_posthog',
              'PostHog, Inc.',
              'Randomly generated analytics identifier, shared between vocdoni.io and app.vocdoni.io.',
              '12 months',
            ],
            [
              'vocdoni-cookie-consent',
              'Synergize S.L.',
              'Records your cookie choice, its date and the policy version in force.',
              '12 months',
            ],
            [
              '_ga, _ga_[id]',
              'Google',
              'Aggregated website statistics, with IP anonymization enabled.',
              'Up to 2 years',
            ],
            ['(no cookie)', 'Plausible.io', 'Cookie-free analytics; no information is stored on your device.', 'n/a'],
          ]}
        />
        <Paragraph variant='legal'>
          Where the user support chat service is enabled, it sets additional cookies, which are described in section
          9.1.
        </Paragraph>
        <Paragraph variant='legal'>No marketing, profiling, or advertising cookies are used.</Paragraph>
        <Paragraph variant='legal'>
          You may also disable cookies through your browser settings at any time, although the Cookie settings link
          described above is the more reliable way to withdraw consent, because it applies to both vocdoni.io and
          app.vocdoni.io.
        </Paragraph>

        <LegalSubsection>
          <Heading.H3 variant='legal'>9.1 Third-Party Cookies – Chat Service (Optional)</Heading.H3>
          <Paragraph variant='legal'>
            This section shall only apply when the website has the user support chat service enabled.
          </Paragraph>
          <Paragraph variant='legal'>
            This website may use cookies and similar technologies provided by{' '}
            <strong>Crisp Chat (Crisp IM SARL)</strong> for the purpose of enabling a user support chat service.
          </Paragraph>
          <Paragraph variant='legal'>These cookies allow:</Paragraph>
          <LegalList>
            <LegalListItem>Maintaining the user session during the conversation.</LegalListItem>
            <LegalListItem>Remembering the context of the conversation across pages.</LegalListItem>
            <LegalListItem>Assigning a technical identifier to the user to manage support.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>When the user uses the chat, Crisp may process the following data:</Paragraph>
          <LegalList>
            <LegalListItem>IP address and technical metadata (browser, operating system, device).</LegalListItem>
            <LegalListItem>A technical identifier assigned by the platform.</LegalListItem>
            <LegalListItem>The content of messages sent.</LegalListItem>
            <LegalListItem>
              Contact information (such as email address), only if voluntarily provided by the user.
            </LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            These cookies are not used for advertising purposes or to track the user across third-party websites, but
            exclusively to enable the functioning of the user support service.
          </Paragraph>
          <Paragraph variant='legal'>
            Crisp acts as a <strong>data processor</strong>, in accordance with Article 28 of Regulation (EU) 2016/679
            (GDPR), processing the data on behalf of and following the instructions of <strong>Synergize S.L.</strong>
          </Paragraph>
          <Paragraph variant='legal'>
            The use of these cookies is subject to the <strong>user’s consent</strong>, which can be accepted or
            rejected via the cookie settings banner.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>10. Updates to this Policy</Heading.H2>
        <Paragraph variant='legal'>
          This Privacy Policy applies jointly to the Vocdoni App (app.vocdoni.io) and the Vocdoni website (vocdoni.io).
          It is reviewed periodically and whenever there are relevant legal, technical, or organizational changes
          affecting the processing of personal data.
        </Paragraph>
        <Paragraph variant='legal'>
          Material updates will be communicated through the APPLICATION or by email to registered users and
          administrators.
        </Paragraph>
        <Paragraph variant='legal'>
          Each version of the Policy will include its <strong>revision date</strong> and <strong>effective date</strong>
          .
        </Paragraph>
        <Paragraph variant='legal'>
          Because this version introduces a new purpose - measuring the transition between our website and our service
          using a shared identifier - any cookie consent given before that date no longer covers all of the processing
          described here and has been invalidated. You will be asked for your choice again the next time you visit.
        </Paragraph>
        <LegalLastUpdated>The current version was last reviewed on {formatPolicyRevisionDate('en')}.</LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
