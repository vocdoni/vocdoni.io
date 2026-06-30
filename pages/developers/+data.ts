import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { highlightCode } from '@/lib/docs/highlight-code'
import type { CodeSample } from '@/components/developers/CodeBlock'

// Build/prerender-time data for the developer landing. The hero code samples are
// syntax-highlighted here (server-side) so lowlight never ships to the client;
// the page renders the pre-highlighted HTML. Exposed via useData().

const quickstartCurl = `# 1. Your scoped API key from platform.vocdoni.io (no login step)
export TOKEN=vsk_your_api_key

# 2. Create a voting process for your organization
curl -X POST ${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "censusId": "$CENSUS_ID",
    "electionParams": {
      "title": { "default": "Board election 2026" },
      "questions": [{ "title": { "default": "Who should chair the board?" } }]
    }
  }'`

const quickstartJs = `// 1. Your scoped API key from platform.vocdoni.io (no login step)
const token = process.env.VOCDONI_API_KEY // "vsk_..."

// 2. Create a voting process for your organization
await fetch(\`${DEVELOPERS_API_BASE_URL}/organizations/\${org}/processes\`, {
  method: "POST",
  headers: { Authorization: \`Bearer \${token}\`, "Content-Type": "application/json" },
  body: JSON.stringify({
    censusId,
    electionParams: { title: { default: "Board election 2026" } },
  }),
})`

export interface DevelopersData {
  heroSamples: CodeSample[]
}

export default function data(): DevelopersData {
  return {
    heroSamples: [
      { label: 'cURL', code: quickstartCurl, html: highlightCode(quickstartCurl, 'bash') },
      { label: 'JavaScript', code: quickstartJs, html: highlightCode(quickstartJs, 'javascript') },
    ],
  }
}
