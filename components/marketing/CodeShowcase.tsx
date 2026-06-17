import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import CodeBlock from './CodeBlock'

export type CodeShowcaseTab = {
  value: string
  label: string
  description?: string
  code: string
  language?: string
  filename?: string
}

export type CodeShowcaseProps = {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  tabs: CodeShowcaseTab[]
  muted?: boolean
}

export default function CodeShowcase({ id, eyebrow, title, description, tabs, muted }: CodeShowcaseProps) {
  if (tabs.length === 0) return null

  return (
    <Section id={id} className={muted ? 'bg-muted/35' : undefined}>
      <Container className='max-w-5xl'>
        {(eyebrow || title || description) && (
          <div className='mb-10 max-w-3xl'>
            {eyebrow && <p className='text-primary mb-3 text-sm font-medium uppercase tracking-wide'>{eyebrow}</p>}
            {title && (
              <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl text-balance'>{title}</h2>
            )}
            {description && <p className='mt-4 text-lg text-muted-foreground'>{description}</p>}
          </div>
        )}

        <MotionPreset fade blur slide transition={{ duration: 0.5 }} inView inViewOnce>
          <Tabs defaultValue={tabs[0].value} className='w-full'>
            <TabsList className='flex h-auto w-full flex-wrap justify-start gap-1'>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className='mt-6'>
                {tab.description && <p className='mb-4 text-base leading-7 text-muted-foreground'>{tab.description}</p>}
                <CodeBlock code={tab.code} language={tab.language} filename={tab.filename} />
              </TabsContent>
            ))}
          </Tabs>
        </MotionPreset>
      </Container>
    </Section>
  )
}
