import type { Config } from 'vike/types'
import LayoutWithNav from '../../layouts/LayoutWithNav'

// Override layout for terms and conditions page (needs navigation and footer)
export default {
  Layout: LayoutWithNav,
} satisfies Config
