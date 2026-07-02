// The Keystatic admin uses a Route Function, so Vike can't infer a URL to
// pre-render. Provide the single shell URL explicitly; pages/+onPrerenderStart.ts
// keeps it unlocalized (no /<locale>/keystatic variants).
export const onBeforePrerenderStart = () => ['/keystatic']
