import {
  LegalCompanyInfo,
  LegalHeader,
  LegalLastUpdated,
  LegalLink,
  LegalList,
  LegalListItem,
  LegalPageContainer,
  LegalParagraph,
  LegalSection,
  LegalSectionTitle,
  LegalSubsection,
  LegalSubsectionTitle,
  LegalTitle,
} from '@/components/ui/legal-document'

export function PrivacyPolicyEN() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <LegalTitle>Privacy Policy</LegalTitle>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            E-mail: <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink>
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <LegalSectionTitle>Privacy Policy</LegalSectionTitle>
        <LegalParagraph>We operate in accordance with the principles set out below:</LegalParagraph>
        <LegalParagraph>
          We undertake to comply with the statutory provisions on data protection and endeavor to always observe the
          principles of data avoidance and data minimization.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>1. The Controller</LegalSectionTitle>
        <LegalSubsection>
          <LegalSubsectionTitle>Who is the controller of your personal data?</LegalSubsectionTitle>
          <LegalParagraph>
            Synergize S.L. is the data controller responsible for processing personal data in compliance with Regulation
            (EU) 2016/679 (GDPR) and Organic Law 3/2018 (LOPDGDD). Vocdoni App is designed and operated in accordance
            with the principles of lawfulness, fairness, transparency, data minimization, and integrity, integrating
            privacy by design and by default.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>2. For what purpose do we process your personal data?</LegalSectionTitle>
        <LegalParagraph>
          We process your personal data to operate the Vocdoni App (hereinafter the «APPLICATION»), which provides
          secure, verifiable, and privacy-preserving voting and participation processes.
        </LegalParagraph>
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
        <LegalParagraph>
          All processing follows the principle of data minimization: only the information strictly necessary to operate
          the service is collected. Sensitive data is stored in encrypted form to enhance confidentiality and
          protection.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>3. Why can we process your personal data?</LegalSectionTitle>
        <LegalParagraph>The processing of your data is legitimated on the basis of:</LegalParagraph>
        <LegalList>
          <LegalListItem>Contractual necessity (Art. 6(1)(b) GDPR)</LegalListItem>
          <LegalListItem>Explicit consent (Art. 6(1)(a) GDPR) for optional features</LegalListItem>
          <LegalListItem>Legitimate interest (Art. 6(1)(f) GDPR) for security and fraud prevention</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>4. For how long will we keep your personal data?</LegalSectionTitle>
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
        <LegalParagraph>
          When data are no longer necessary for these purposes, they will be deleted with appropriate security measures
          for complete destruction.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>5. To whom do we disclose your personal data?</LegalSectionTitle>
        <LegalParagraph>Your personal data may be disclosed to:</LegalParagraph>
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
        <LegalParagraph>
          <strong>Specifically:</strong>
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Within the APPLICATION, analytics are performed using <strong>Plausible</strong>, a privacy-first analytics
            platform that does not use cookies and does not collect or store personally identifiable information. For
            further details, you can review{' '}
            <LegalLink href='https://plausible.io/privacy'>plausible.io/privacy</LegalLink>.
          </LegalListItem>
          <LegalListItem>
            The landing page of vocdoni.app uses <strong>Google Analytics</strong> for web traffic analysis. Data
            collected through this tool is processed in a dissociated way (without personal identification) and used
            exclusively for internal statistical purposes. The APPLICATION may collect, store or compile certain
            non-personal information regarding its use. Google Analytics is governed by Google's General Terms and
            Conditions{' '}
            <LegalLink href='http://www.google.com/analytics/terms/us.html'>
              google.com/analytics/terms/us.html
            </LegalLink>{' '}
            and Google's Privacy Policy{' '}
            <LegalLink href='https://policies.google.com/privacy?hl=en&gl=en'>policies.google.com/privacy</LegalLink>.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>6. What are your rights as a registered user?</LegalSectionTitle>
        <LegalParagraph>Your rights include the following, but are not limited to:</LegalParagraph>
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
            <LegalLink href='https://www.aepd.es'>www.aepd.es</LegalLink>) if you consider that the processing does not
            comply with current legislation.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          <strong>Contact information to exercise their rights:</strong>
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL. Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona).
          <br />
          E-mail: <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink>
        </LegalParagraph>
        <LegalParagraph>Consult our privacy-policy / Consult our cookies-policy</LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>7. SECURITY MEASURES</LegalSectionTitle>
        <LegalParagraph>
          In accordance with the provisions of the current regulations on the protection of personal data, the
          CONTROLLER is complying with all the provisions of the GDPR and LOPDGDD regulations for processing the
          personal data for which they are responsible, and is manifestly complying with the principles described in
          Article 5 of the GDPR, by which they are processed in a lawful, fair and transparent manner in relation to the
          data subject and are appropriate, relevant, and limited to what is necessary in relation to the purposes for
          which they are processed.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL guarantees that appropriate technical and organizational policies have been implemented to apply
          the security measures established by GDPR and LOPDGDD in order to protect the rights and freedoms of the
          users.
        </LegalParagraph>
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
        <LegalParagraph>
          This Privacy Policy was released on September 26, 2025 and is effective as of that date. For more information
          on the guarantees of your privacy, you can contact Synergize SL at{' '}
          <LegalLink href='mailto:legal@vocdoni.org'>legal@vocdoni.org</LegalLink>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>8. Data Protection Officer (DPO)</LegalSectionTitle>
        <LegalParagraph>
          Synergize S.L. has appointed <strong>4Dlegal S.L.</strong> as its Data Protection Officer (DPO) in accordance
          with Articles 37–39 of the GDPR.
        </LegalParagraph>
        <LegalParagraph>
          You can contact the DPO at <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink> regarding any
          questions, concerns, or requests related to personal data processing or the exercise of your data protection
          rights.
        </LegalParagraph>
        <LegalParagraph>The DPO acts independently and reports to Synergize's senior management.</LegalParagraph>
        <LegalParagraph>
          All communications received by the DPO are treated confidentially and will be responded to within one month,
          extendable by up to two additional months if necessary due to the complexity or number of requests.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>9. Updates to this Policy</LegalSectionTitle>
        <LegalParagraph>
          This Privacy Policy is reviewed periodically and whenever there are relevant legal, technical, or
          organizational changes affecting the processing of personal data.
        </LegalParagraph>
        <LegalParagraph>
          Material updates will be communicated through the APPLICATION or by email to registered users and
          administrators.
        </LegalParagraph>
        <LegalParagraph>
          Each version of the Policy will include its <strong>revision date</strong> and <strong>effective date</strong>
          .
        </LegalParagraph>
        <LegalLastUpdated>The current version was last reviewed on October 16, 2025.</LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
