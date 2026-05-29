import type { TFunction } from 'i18next'

import logoAguicatRound from '@/assets/logos/logo_aguicat_round.webp'
import logoArxiversColour from '@/assets/logos/logo_arxivers_colour.webp'
import logoAtiColour from '@/assets/logos/logo_ati_colour.webp'
import logoAtiRound from '@/assets/logos/logo_ati_round.webp'
import logoBellpuigColour from '@/assets/logos/logo_bellpuig_colour.webp'
import logoBisbalRound from '@/assets/logos/logo_bisbal_round.webp'
import logoBloockColour from '@/assets/logos/logo_bloock_colour.webp'
import logoCecColour from '@/assets/logos/logo_cec_colour.webp'
import logoCoibRound from '@/assets/logos/logo_coib_round.webp'
import logoEicColour from '@/assets/logos/logo_eic_colour.webp'
import logoIcoesColour from '@/assets/logos/logo_icoes_colour.webp'
import logoOmniumColour from '@/assets/logos/logo_omnium_colour.webp'
import logoPlataformaColour from '@/assets/logos/logo_plataforma_colour.webp'

import logoArxiversRound from '@/assets/logos/logo_.arxivers_round.webp'
import logoBellpuigRound from '@/assets/logos/logo_bellpuig_round.webp'
import logoBloockRound from '@/assets/logos/logo_bloock_round.webp'
import logoCecRound from '@/assets/logos/logo_cec_round.webp'
import logoEicRound from '@/assets/logos/logo_eic_round.webp'
import logoIcoesRound from '@/assets/logos/logo_icoes_round.webp'
import logoOmniumRound from '@/assets/logos/logo_omnium_round.webp'
import logoPlataformaRound from '@/assets/logos/logo_plataforma_round.webp'

export type Testimonial = {
  name: string
  handle: string
  avatar: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
  logo: string
}

export function getTestimonialsData(t: TFunction): Testimonial[] {
  return [
    {
      name: 'Jordi Estiarte',
      handle: t('testimonials_marquee.items.0.handle', 'Mayor · Bellpuig City Council'),
      avatar: '/images/avatars/avatar-1.png',
      rating: 5,
      title: t('testimonials_marquee.items.0.title', 'The future of real elections'),
      content: t(
        'testimonials_marquee.items.0.content',
        "We chose Vocdoni's technology because we believe it is the future of what real elections of any kind should be. Electronic voting is open to everyone and facilitates the process for the citizenry."
      ),
      platformName: 'Bellpuig',
      platformImage: logoBellpuigColour,
      logo: logoBellpuigRound,
    },
    {
      name: 'Ton Barnils',
      handle: t('testimonials_marquee.items.1.handle', 'General Director · Centre Excursionista de Catalunya'),
      avatar: '/images/avatars/avatar-2.png',
      rating: 5,
      title: t('testimonials_marquee.items.1.title', 'Safe and transparent participation'),
      content: t(
        'testimonials_marquee.items.1.content',
        'We chose Vocdoni because it guarantees safe, reliable, and transparent participation for all our members at the annual general assembly.'
      ),
      platformName: 'Centre Excursionista de Catalunya',
      platformImage: logoCecColour,
      logo: logoCecRound,
    },
    {
      name: 'Anna Giralt',
      handle: t('testimonials_marquee.items.2.handle', 'Executive Manager · Òmnium Cultural'),
      avatar: '/images/avatars/avatar-3.png',
      rating: 5,
      title: t('testimonials_marquee.items.2.title', 'All guarantees for 180,000 members'),
      content: t(
        'testimonials_marquee.items.2.content',
        'The commitment to Vocdoni has been clear. At Òmnium Cultural we bet on a secure and verifiable voting system that would allow us to hold our statutory assemblies with all guarantees.'
      ),
      platformName: 'Òmnium',
      platformImage: logoOmniumColour,
      logo: logoOmniumRound,
    },
    {
      name: 'Oscar Tirivò',
      handle: t('testimonials_marquee.items.3.handle', 'IT Director · College of Industrial Engineers of Catalonia'),
      avatar: '/images/avatars/avatar-4.png',
      rating: 5,
      title: t('testimonials_marquee.items.3.title', 'Easy, secure, and scalable voting'),
      content: t(
        'testimonials_marquee.items.3.content',
        'Vocdoni provides us with an easy, secure, anonymous, and scalable voting system, completely integrated into our institutional environment. We will continue to trust it, without a doubt!'
      ),
      platformName: t('testimonials_marquee.items.3.platform_name', 'College of Industrial Engineers of Catalonia'),
      platformImage: logoEicColour,
      logo: logoEicRound,
    },
    {
      name: 'Rut Carandell',
      handle: t('testimonials_marquee.items.4.handle', 'Director · Plataforma per la Llengua'),
      avatar: '/images/avatars/avatar-13.png',
      rating: 5,
      title: t('testimonials_marquee.items.4.title', 'Voting across Catalan-speaking territories'),
      content: t(
        'testimonials_marquee.items.4.content',
        'Vocdoni lets us hold votes with members across all Catalan-speaking territories on equal terms. Instant counting simplifies our assemblies and ensures full transparency. We especially value that it is fully available in Catalan.'
      ),
      platformName: 'Plataforma per la Llengua',
      platformImage: logoPlataformaColour,
      logo: logoPlataformaRound,
    },
    {
      name: 'Montserrat Clavell',
      handle: t('testimonials_marquee.items.5.handle', "Secretary · Associació d'Arxivers de Catalunya"),
      avatar: '/images/avatars/avatar-14.png',
      rating: 5,
      title: t('testimonials_marquee.items.5.title', 'Secure voting that boosted participation'),
      content: t(
        'testimonials_marquee.items.5.content',
        'Offering members a secure and reliable voting system is essential, especially during a pandemic. Vocdoni gave us an easy-to-use tool that simplified the voting process and boosted participation.'
      ),
      platformName: 'Arxivers de Catalunya',
      platformImage: logoArxiversColour,
      logo: logoArxiversRound,
    },
    {
      name: 'Susanna Mendoza',
      handle: t('testimonials_marquee.items.6.handle', 'IT Responsible · Associació de Guies Habilitats de Catalunya'),
      avatar: '/images/avatars/avatar-15.png',
      rating: 5,
      title: t('testimonials_marquee.items.6.title', 'Easy to set up, great participation despite a non-tech audience'),
      content: t(
        'testimonials_marquee.items.6.content',
        'Setting up the entire voting process and centralizing all the tools for the assembly was easy, intuitive, and clear. Members complimented how well organized it was and how simple it was to use. Even in a sector that is not very tech-savvy, we got strong participation - people especially valued being able to vote in advance without attending in person. When we had a small issue with the census, technical support was fast and professional.'
      ),
      platformName: 'AGUICAT',
      platformImage: logoAguicatRound,
      logo: logoAguicatRound,
    },
    {
      name: 'Adrià Cortadellas',
      handle: t(
        'testimonials_marquee.items.7.handle',
        "Civic Participation Officer · La Bisbal d'Empordà City Council"
      ),
      avatar: '/images/avatars/avatar-16.png',
      rating: 5,
      title: t('testimonials_marquee.items.7.title', 'Transparent, secure, and flexible digital voting for citizens'),
      content: t(
        'testimonials_marquee.items.7.content',
        "Vocdoni powered our Bisbalenc/a de l'Any vote, boosting citizen participation and delivering transparency, security, and instant results on blockchain. We valued its security, scalability, universal verifiability, and flexibility. In 2023 it also enabled hybrid voting, greatly simplifying the entire process."
      ),
      platformName: "La Bisbal d'Empordà",
      platformImage: logoBisbalRound,
      logo: logoBisbalRound,
    },
    {
      name: 'Lluís Llibre',
      handle: t('testimonials_marquee.items.8.handle', 'Founder and CEO · BLOOCK'),
      avatar: '/images/avatars/avatar-5.png',
      rating: 5,
      title: t('testimonials_marquee.items.8.title', 'Enabling meaningful citizen participation'),
      content: t(
        'testimonials_marquee.items.8.content',
        "The transition to e-voting is becoming inevitable, as society is more digitally ready than ever before. Through the partnership between BLOOCK and Vocdoni, we're enabling more meaningful and ongoing citizen participation in government and institutions."
      ),
      platformName: 'BLOOCK',
      platformImage: logoBloockColour,
      logo: logoBloockRound,
    },
    {
      name: 'Víctor Bohórquez',
      handle: t('testimonials_marquee.items.9.handle', 'President · Official College of Nursing of Seville'),
      avatar: '/images/avatars/avatar-6.png',
      rating: 5,
      title: t('testimonials_marquee.items.9.title', 'More efficient and accessible voting'),
      content: t(
        'testimonials_marquee.items.9.content',
        'Digitizing our voting with Vocdoni has made the entire electoral process more efficient. We have made participation much easier, especially for members who could not travel, while maintaining an agile and reliable system.'
      ),
      platformName: 'ICOES',
      platformImage: logoIcoesColour,
      logo: logoIcoesRound,
    },
    {
      name: 'Lluis Serrat i Andreu',
      handle: t('testimonials_marquee.items.10.handle', 'Head of projects · Official College of Nurses of Barcelona'),
      avatar: '/images/avatars/avatar-7.png',
      rating: 5,
      title: t('testimonials_marquee.items.10.title', 'Fast, simple, and reliable participation'),
      content: t(
        'testimonials_marquee.items.10.content',
        'At the Official College of Nurses of Barcelona, we trust Vocdoni for all our participatory processes, ensuring members can exercise their rights from anywhere. We especially value the immediate vote count, the simplicity of the system, and the fast, effective response and guidance from its technical support, which makes the entire process agile, transparent, and reliable.'
      ),
      platformName: 'COIB',
      platformImage: logoCoibRound,
      logo: logoCoibRound,
    },
    {
      name: 'Carlo Pestelli',
      handle: t('testimonials_marquee.items.11.handle', 'President · ATI Friuli Venezia Giulia'),
      avatar: '/images/avatars/avatar-8.png',
      rating: 5,
      title: t('testimonials_marquee.items.11.title', 'Digital governance that makes participation easier'),
      content: t(
        'testimonials_marquee.items.11.content',
        'As Associazione Termotecnica Italiana, Friuli Venezia Giulia section, we chose to digitize our governance to make it easier for professionals to participate. Vocdoni stood out as the ideal solution for its simplicity, costs, and guarantees.'
      ),
      platformName: t('testimonials_marquee.items.11.platform_name', 'Associazione Termotecnica Italiana'),
      platformImage: logoAtiColour,
      logo: logoAtiRound,
    },
  ]
}
