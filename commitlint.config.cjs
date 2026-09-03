module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 120],
    // GitHub's squash-merge copies each branch commit's subject line into a bulleted
    // body/footer line of the merge commit. Keep these aligned with header-max-length
    // so a commit subject that passes standalone can never fail once squashed.
    'body-max-line-length': [2, 'always', 120],
    'footer-max-line-length': [2, 'always', 120],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
  },
}
