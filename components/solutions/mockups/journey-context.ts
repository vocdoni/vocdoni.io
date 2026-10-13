import { createContext, useContext } from 'react'

/**
 * Lets a section drive which of the member's four screens the phone shows,
 * so the prose step and the picture advance together. When no provider is
 * present the phone runs on its own clock.
 */
export interface MemberJourneyState {
  index: number
  setIndex: (index: number) => void
}

export const MemberJourneyContext = createContext<MemberJourneyState | null>(null)

export const useMemberJourney = () => useContext(MemberJourneyContext)
