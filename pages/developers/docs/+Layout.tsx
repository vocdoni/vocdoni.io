import { DocsSidebar } from '@/components/developers/DocsSidebar'
import { DocsTOC } from '@/components/developers/DocsTOC'
import * as React from 'react'

// Nested layout: renders inside the global Navbar + Footer layout and adds the
// documentation sidebar (left) and on-this-page rail (right). The landing at
// /developers does not use this layout - only /developers/docs/* pages do.
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10'>
      <div className='lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[15rem_minmax(0,1fr)_14rem] xl:gap-12'>
        <DocsSidebar />
        <div className='min-w-0 pt-5 lg:pt-0'>{children}</div>
        <DocsTOC />
      </div>
    </div>
  )
}
