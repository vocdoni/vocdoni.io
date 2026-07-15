import { describe, expect, it } from 'vitest'

import {
  SKILLS_SCHEMA_URI,
  buildSkillEntry,
  buildSkillsIndex,
  parseGithubSource,
  rawGithubUrl,
  selectIncludedPlugins,
  sha256Digest,
  skillMdPaths,
} from '@/plugins/agent-skills'

const BASE = { owner: 'vocdoni', repo: 'skills' }

describe('selectIncludedPlugins', () => {
  it('keeps only sdk-category plugins, dropping generic and category-less ones', () => {
    const plugins = [
      { name: 'vocdoni-sdk', source: './plugins/vocdoni-sdk', category: 'sdk' },
      { name: 'davinci-sdk', source: './plugins/davinci-sdk', category: 'sdk' },
      { name: 'vocdoni-go', source: './plugins/vocdoni-go', category: 'engineering' },
      { name: 'x', source: './x' },
    ]
    expect(selectIncludedPlugins(plugins).map((p) => p.name)).toEqual(['vocdoni-sdk', 'davinci-sdk'])
  })
})

describe('parseGithubSource', () => {
  it('resolves a local source against the marketplace repo', () => {
    expect(parseGithubSource('./plugins/vocdoni-sdk', BASE)).toEqual({
      owner: 'vocdoni',
      repo: 'skills',
      subpath: 'plugins/vocdoni-sdk',
    })
  })

  it('resolves an absolute github source to its repo root', () => {
    expect(parseGithubSource('https://github.com/vocdoni/integrator-sdk', BASE)).toEqual({
      owner: 'vocdoni',
      repo: 'integrator-sdk',
      subpath: '',
    })
  })

  it('returns null for unsupported sources', () => {
    expect(parseGithubSource('https://example.com/foo', BASE)).toBeNull()
  })
})

describe('skillMdPaths', () => {
  const tree = [
    'plugins/vocdoni-sdk/skills/vocdoni-sdk/SKILL.md',
    'plugins/vocdoni-sdk/skills/vocdoni-ballot-protocol/SKILL.md',
    'plugins/vocdoni-sdk/skills/vocdoni-sdk/references/CENSUS.md',
    'plugins/vocdoni-sdk/README.md',
    'plugins/vocdoni-go/skills/go-modern/SKILL.md',
  ]

  it('matches only direct SKILL.md files under the plugin subpath', () => {
    expect(skillMdPaths(tree, 'plugins/vocdoni-sdk')).toEqual([
      'plugins/vocdoni-sdk/skills/vocdoni-ballot-protocol/SKILL.md',
      'plugins/vocdoni-sdk/skills/vocdoni-sdk/SKILL.md',
    ])
  })

  it('matches repo-root skills when the subpath is empty', () => {
    expect(skillMdPaths(['skills/integrator-sdk/SKILL.md', 'README.md'], '')).toEqual([
      'skills/integrator-sdk/SKILL.md',
    ])
  })
})

describe('sha256Digest', () => {
  it('formats as sha256:<64 lowercase hex>', () => {
    const digest = sha256Digest('hello')
    expect(digest).toMatch(/^sha256:[0-9a-f]{64}$/)
    expect(digest).toBe('sha256:2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
  })
})

describe('rawGithubUrl', () => {
  it('builds a commit-pinned raw url', () => {
    expect(rawGithubUrl('vocdoni', 'skills', 'abc123', 'plugins/x/skills/y/SKILL.md')).toBe(
      'https://raw.githubusercontent.com/vocdoni/skills/abc123/plugins/x/skills/y/SKILL.md'
    )
  })
})

describe('buildSkillEntry', () => {
  const md = Buffer.from(
    ['---', 'name: vocdoni-sdk', 'description: Use for Vocdoni SDK code.', '---', '', '# Body'].join('\n')
  )

  it('extracts name/description and hashes the exact bytes served at url', () => {
    const url = 'https://raw.githubusercontent.com/vocdoni/skills/sha/plugins/vocdoni-sdk/skills/vocdoni-sdk/SKILL.md'
    expect(buildSkillEntry(url, md)).toEqual({
      name: 'vocdoni-sdk',
      type: 'skill-md',
      description: 'Use for Vocdoni SDK code.',
      url,
      digest: sha256Digest(md),
    })
  })

  it('throws when required frontmatter is missing', () => {
    expect(() => buildSkillEntry('u', Buffer.from('---\nname: x\n---\n'))).toThrow(/name\/description/)
  })
})

describe('buildSkillsIndex', () => {
  const mk = (name: string): ReturnType<typeof buildSkillEntry> => ({
    name,
    type: 'skill-md',
    description: 'd',
    url: `https://x/${name}`,
    digest: `sha256:${'0'.repeat(64)}`,
  })

  it('emits the v0.2.0 schema with name-sorted, de-duplicated skills', () => {
    const doc = JSON.parse(buildSkillsIndex([mk('vocdoni-sdk'), mk('davinci-sdk'), mk('vocdoni-sdk')]))
    expect(doc.$schema).toBe(SKILLS_SCHEMA_URI)
    expect(doc.skills.map((s: { name: string }) => s.name)).toEqual(['davinci-sdk', 'vocdoni-sdk'])
    expect(doc.skills[0]).toMatchObject({
      type: 'skill-md',
      url: expect.any(String),
      digest: expect.stringMatching(/^sha256:[0-9a-f]{64}$/),
    })
  })
})
