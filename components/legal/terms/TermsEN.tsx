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

export function TermsEN() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <Heading.H1 variant='legal'>Terms and Conditions of Use</Heading.H1>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            Synergize S.L. has appointed 4Dlegal S.L. as its Data Protection Officer (DPO). You can contact the DPO at{' '}
            <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link> for any questions about data
            protection.
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <Heading.H2 variant='legal'>TERMS AND CONDITIONS OF USE OF THE APPLICATION</Heading.H2>
        <Paragraph variant='legal'>
          These Terms and Conditions govern the access and use of the web application Vocdoni App (hereinafter the
          «APPLICATION»), which Synergize SL makes available to users. The user acquires this condition by accessing and
          using it.
        </Paragraph>
        <Paragraph variant='legal'>
          This version of the APPLICATION is available through the official Vocdoni website. The user acknowledges and
          agrees to comply with all applicable terms and conditions regarding access and use of the APPLICATION.
        </Paragraph>
        <Paragraph variant='legal'>
          Accessing the APPLICATION implies that the user acknowledges that they have accepted and consented without
          reservation to these conditions of use.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>1. PURPOSE</Heading.H2>
        <Paragraph variant='legal'>
          The purpose of the APPLICATION is to provide a digital voting and participation platform that allows
          organizations, associations, and communities to run secure, verifiable, and privacy-preserving voting
          processes and manage their memberbase to setup censuses.
        </Paragraph>
        <Paragraph variant='legal'>
          Some of the groups that can benefit from this project are{' '}
          <strong>
            non-profit organizations, cooperatives, associations, community groups, city councils, and other entities
            that need transparent and trustworthy decision-making mechanisms
          </strong>
          . The design and development of this APPLICATION has involved professional specialists as well as a group of
          users who participated in the trial period.
        </Paragraph>
        <Paragraph variant='legal'>
          It is compatible with browsers based on Chromium (e.g., Google Chrome, Microsoft Edge, Brave), WebKit (e.g.,
          Safari), and Gecko (e.g., Mozilla Firefox), and may also be compatible with other modern web browsers,
          although such compatibility cannot be guaranteed.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>2. FEATURES</Heading.H2>
        <Paragraph variant='legal'>
          The APPLICATION provides different functionalities depending on the type of user:
        </Paragraph>
        <LegalSubsection>
          <Heading.H3 variant='legal'>For voting users (non-registered):</Heading.H3>
          <LegalList variant='none'>
            <LegalListItem>
              ○ Access a voting process with credentials or a link provided by their organization.
            </LegalListItem>
            <LegalListItem>○ Cast a vote securely.</LegalListItem>
            <LegalListItem>
              ○ A persistent account is not created for these users; only the minimum data required to verify
              eligibility to vote are processed.
            </LegalListItem>
          </LegalList>
        </LegalSubsection>
        <LegalSubsection>
          <Heading.H3 variant='legal'>For registered users (administrators):</Heading.H3>
          <LegalList variant='none'>
            <LegalListItem>○ Create and configure voting processes on behalf of their organization.</LegalListItem>
            <LegalListItem>
              ○ Upload and manage members lists, which may include personal information of members of the organization
              (who are also potential voters).
            </LegalListItem>
            <LegalListItem>○ Manage credentials and distribute them to eligible voters.</LegalListItem>
            <LegalListItem>○ Access advanced features for monitoring and managing voting processes.</LegalListItem>
          </LegalList>
        </LegalSubsection>
        <Paragraph variant='legal'>
          The APPLICATION processes the data only when running in the foreground and when initiated by user action.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>3. INTELLECTUAL AND INDUSTRIAL PROPERTY RIGHTS</Heading.H2>
        <Paragraph variant='legal'>
          The intellectual and industrial property rights on the APPLICATION are owned by Synergize SL, corresponding to
          the exclusive exercise of the rights of use by them in any form and, in particular, the rights of
          reproduction, distribution, communication to the public and change.
        </Paragraph>
        <Paragraph variant='legal'>
          Third party holders of intellectual and industrial property rights on photographs, logos, and any other
          symbols or contents included in the APPLICATION have granted the corresponding authorisation for their
          reproduction, distribution and availability to the public.
        </Paragraph>
        <Paragraph variant='legal'>
          The user acknowledges that the reproduction, modification, distribution, commercialisation, decompiling,
          disassembly, reverse engineering or any other means to obtain the source code, transformation or publication
          of any unauthorised reference test results of any of the elements and utilities integrated within the sequence
          of operations constitutes a breach of intellectual property rights of Synergize SL, and therefore commits to
          refraining from carrying out any of the aforementioned actions.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>4. COMPULSORY OR OPTIONAL NATURE OF THE INFORMATION PROVIDED BY THE USER</Heading.H2>
        <Paragraph variant='legal'>
          The users, by marking the corresponding boxes and entering data in the fields, marked with an asterisk (*) in
          the APPLICATION's forms, accept expressly and in a free and unequivocal way that their personal data are
          necessary for the supplier to meet their request, voluntarily providing their data in the remaining fields.
          The user ensures that the personal data provided to Synergize SL are true and is responsible for communicating
          any changes to them.
        </Paragraph>
        <Paragraph variant='legal'>
          Registered users (administrators) are also responsible for the accuracy and lawfulness of the personal data of
          their members that they upload to the APPLICATION.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL informs that all data requested through the APPLICATION are mandatory, as they are necessary for
          the provision of an optimal service to the user. In the event that not all of the data is provided, there is
          no guarantee that the information and services provided will be completely adapted to the User's needs.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>5. LIABILITY DISCLAIMER</Heading.H2>
        <Paragraph variant='legal'>
          Synergize SL reserves the right to edit, update, modify, suspend, delete or terminate the services offered by
          the APPLICATION, including all or part of its content, without prior notice, and to modify the form or type of
          access to it.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL applies reasonable technical and organizational measures to protect the integrity and security of
          the APPLICATION and the data processed through it. The design of the APPLICATION follows the principle of data
          minimization, collecting only the information strictly necessary for its operation. In addition, the most
          sensitive data handled by the APPLICATION are stored in encrypted form to enhance confidentiality and
          protection. However, users acknowledge that no system is completely secure and Synergize SL cannot guarantee
          the absolute security of the APPLICATION or of the information transmitted or stored through it.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize S.L. applies technical and organizational measures in accordance with the GDPR to protect personal
          data, including encryption, access control, and limited data retention. Personal data are processed only for
          purposes related to the proper functioning of the application and never shared without legal basis.
        </Paragraph>
        <Paragraph variant='legal'>
          The possible causes of modification may take be for reasons such as adaptation to possible legislative changes
          and changes in the APPLICATION itself, as well as those that may derive from existing codes of conduct in the
          field, or for strategic or corporate reasons.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL shall not be liable for the use of the APPLICATION by a minor. The downloading and use of the
          APPLICATION is the sole responsibility of the user.
        </Paragraph>
        <Paragraph variant='legal'>
          The APPLICATION is provided «as is» without warranty of any kind. Synergize SL is not responsible for the
          final quality of the APPLICATION or for it serving and fulfilling all the APPLICATION's purposes.
          Notwithstanding the foregoing, Synergize SL undertakes to contribute to improving the quality of the
          APPLICATION to the best of its ability, but cannot guarantee the accuracy or timeliness of the content
          thereof.
        </Paragraph>
        <Paragraph variant='legal'>
          The responsibility for using the APPLICATION rests solely with the user. Except for that which is set forth in
          these Terms and Conditions, Synergize SL is not liable for any loss or damage arising in connection with the
          download or use of the APPLICATION, such as that resulting from failures, breakdowns or blockages in the
          operation of the APPLICATION (e.g., but not limited to: error in the communications lines, defects in the
          APPLICATION hardware or software or failures in the Internet network). Similarly, Synergize SL shall not be
          liable for any damages resulting from improper or inappropriate use of the APPLICATION by users.
        </Paragraph>
        <Paragraph variant='legal'>
          In particular, registered users (administrators) are solely responsible for ensuring that the personal data of
          their members uploaded to the APPLICATION are collected and processed in compliance with applicable data
          protection laws.
        </Paragraph>
        <Paragraph variant='legal'>
          Administrators must ensure that the data of members and voters are collected and processed in compliance with
          the GDPR and relevant national laws.
        </Paragraph>
        <Paragraph variant='legal'>
          For further information about how personal data are processed, please refer to our Privacy Policy available at{' '}
          <Link href='https://vocdoni.io/privacy'>vocdoni.io/privacy</Link>.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>6. LEGISLATION AND JURISDICTION</Heading.H2>
        <Paragraph variant='legal'>
          The user accepts that governing law and the competent Courts and Tribunals that will hear differences in the
          interpretation or application of this clause are the Spanish courts and tribunals, and expressly waive any
          other jurisdiction, that is the courts and tribunals closest to the city of Sant Celoni.
        </Paragraph>
        <Paragraph variant='legal'>
          This agreement shall be governed by Spanish law and the GDPR for data protection matters
        </Paragraph>
        <Paragraph variant='legal'>I have read and accepted the APPLICATION's terms of use.</Paragraph>
        <LegalLastUpdated>
          Version: October 2025 — Last updated to include GDPR compliance and data protection officer information.
        </LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
