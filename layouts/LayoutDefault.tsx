import './style.css'
import './tailwind.css'

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return <div className='min-h-screen bg-background text-foreground'>{children}</div>
}
