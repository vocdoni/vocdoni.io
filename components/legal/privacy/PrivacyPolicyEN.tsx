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
} from '@/components/ui/legal-document'
import { Heading, Paragraph } from '@/components/ui/typography'

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
          We use Google Analytics (with anonymized IP addresses) and Plausible.io for aggregated, non-identifiable
          analytics.
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
            non-identifiable analytics.
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
          <LegalListItem>Explicit consent (Art. 6(1)(a) GDPR) for optional features</LegalListItem>
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
            Data is processed in an anonymized manner and used exclusively for internal analytical purposes.
          </Paragraph>
          <Paragraph variant='legal'>
            These cookies are limited to analytical purposes and do not track users across websites.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>Application (app.vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            In the Vocdoni App, analytics are performed using Plausible, a privacy-first analytics platform that does
            not use cookies or collect personal identifiers.
          </Paragraph>
          <Paragraph variant='legal'>
            Additionally, certain services involve external providers acting as processors under GDPR Article 28(3):
          </Paragraph>
          <LegalList variant='none'>
            <LegalListItem>Stripe Payments Europe, Ltd. – payment processing.</LegalListItem>
            <LegalListItem>Twilio, Inc. – SMS and email delivery to users.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            Both providers process personal data solely for these purposes and under contractual guarantees of data
            protection.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>5.1 User Support Chat Service (Optional)</Heading.H3>
          <Paragraph variant='legal'>
            This section shall only apply when the website has the user support chat service enabled.
          </Paragraph>
          <Paragraph variant='legal'>
            This website may integrate a real-time chat system provided by <strong>Crisp IM SARL</strong> for the purpose
            of handling user inquiries or incidents during the voting process.
          </Paragraph>
          <Paragraph variant='legal'>When the user decides to use the chat, the following personal data are processed:</Paragraph>
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
        <Paragraph variant='legal'>Consult our privacy-policy / Consult our cookies-policy</Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>7. SECURITY MEASURES</Heading.H2>
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
          This Privacy Policy was released on September 26, 2025 and is effective as of that date. For more information
          on the guarantees of your privacy, you can contact Synergize SL at{' '}
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

      <LegalSection>
        <Heading.H2 variant='legal'>9. Cookies and Tracking Technologies</Heading.H2>
        <Paragraph variant='legal'>
          Our website (vocdoni.io) and App (app.vocdoni.io) use a minimal number of cookies and tracking technologies:
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Google Analytics</strong> – Used on vocdoni.io to collect anonymous, aggregated statistics about
          website visits and usage. IP addresses are anonymized before storage.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Plausible.io</strong> – Used for privacy-friendly, cookie-free analytics on both the website and the
          App.
        </Paragraph>
        <Paragraph variant='legal'>No marketing, profiling, or advertising cookies are used.</Paragraph>
        <Paragraph variant='legal'>You may disable cookies through your browser settings at any time.</Paragraph>

        <LegalSubsection>
          <Heading.H3 variant='legal'>9.1 Third-Party Cookies – Chat Service (Optional)</Heading.H3>
          <Paragraph variant='legal'>
            This section shall only apply when the website has the user support chat service enabled.
          </Paragraph>
          <Paragraph variant='legal'>
            This website may use cookies and similar technologies provided by <strong>Crisp Chat (Crisp IM SARL)</strong>{' '}
            for the purpose of enabling a user support chat service.
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
            <LegalListItem>Contact information (such as email address), only if voluntarily provided by the user.</LegalListItem>
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
            The use of these cookies is subject to the <strong>user’s consent</strong>, which can be accepted or rejected
            via the cookie settings banner.
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
        <LegalLastUpdated>The current version was last reviewed on April 15, 2026.</LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
