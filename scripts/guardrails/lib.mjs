import ts from 'typescript'

const ALLOWED_COMPONENT_BUCKETS = new Set(['ui', 'shadcn-studio', 'legal', 'features', 'illustrations'])
const ALLOWED_LEGACY_COMPONENT_BUCKETS = new Set(['VocdoniApp', 'VocdoniAppV3'])
const USER_FACING_ATTRIBUTE_NAMES = new Set(['alt', 'aria-label', 'placeholder', 'title'])
const CODE_LIKE_ELEMENTS = new Set(['code', 'kbd', 'pre', 'samp'])

const normalizePath = (value) => value.replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/+$/, '')

const normalizeCopy = (value) => value.replace(/\s+/g, ' ').trim()

const getLine = (sourceFile, position) => sourceFile.getLineAndCharacterOfPosition(position).line + 1

const hasLetters = (value) => /\p{L}/u.test(value)

const isApprovedDomainFolder = (segment) => {
  if (segment.startsWith('new-') || segment.startsWith('legacy-')) return false
  if (/(?:^|-)v\d+$/i.test(segment) || /V\d+$/u.test(segment)) return false
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(segment)
}

export function getInvalidComponentDirectories(directoryPaths) {
  return directoryPaths
    .map((path) => normalizePath(path))
    .filter((path) => path.startsWith('components/'))
    .filter((path) => {
      const [, topLevel] = path.split('/')
      if (!topLevel) return false
      if (ALLOWED_COMPONENT_BUCKETS.has(topLevel)) return false
      if (ALLOWED_LEGACY_COMPONENT_BUCKETS.has(topLevel)) return false
      return !isApprovedDomainFolder(topLevel)
    })
    .sort()
}

const shouldSkipCopyValidation = (filePath) => {
  const normalized = normalizePath(filePath)
  return normalized.startsWith('components/legal/') || normalized.startsWith('components/shadcn-studio/')
}

const pushViolation = (violations, sourceFile, node, kind, rawValue) => {
  const value = normalizeCopy(rawValue)
  if (!value || !hasLetters(value)) return
  violations.push({
    kind,
    line: getLine(sourceFile, node.getStart(sourceFile)),
    value,
  })
}

const getJsxElementName = (node) => {
  if (ts.isJsxElement(node)) return node.openingElement.tagName.getText()
  if (ts.isJsxSelfClosingElement(node)) return node.tagName.getText()
  return null
}

const isInsideCodeLikeElement = (node) => {
  let current = node.parent

  while (current) {
    const elementName = getJsxElementName(current)
    if (elementName && CODE_LIKE_ELEMENTS.has(elementName)) {
      return true
    }
    current = current.parent
  }

  return false
}

export function findHardcodedJsxCopyViolations(source, filePath) {
  if (shouldSkipCopyValidation(filePath)) return []

  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const violations = []

  const visit = (node) => {
    if (ts.isJsxText(node)) {
      if (isInsideCodeLikeElement(node)) return
      pushViolation(violations, sourceFile, node, 'text', node.getText(sourceFile))
    }

    if (ts.isJsxAttribute(node)) {
      const attributeName = node.name.text
      if (USER_FACING_ATTRIBUTE_NAMES.has(attributeName) && node.initializer && ts.isStringLiteral(node.initializer)) {
        pushViolation(violations, sourceFile, node.initializer, 'attribute', node.initializer.text)
      }
    }

    if (ts.isJsxExpression(node) && node.expression) {
      if (ts.isJsxAttribute(node.parent) || isInsideCodeLikeElement(node)) return
      if (ts.isStringLiteral(node.expression) || ts.isNoSubstitutionTemplateLiteral(node.expression)) {
        pushViolation(violations, sourceFile, node.expression, 'expression', node.expression.text)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return violations
}

export function findEmptyTranslationLeafValues(value, currentPath = '') {
  if (typeof value === 'string') {
    return value.trim() === '' && currentPath ? [currentPath] : []
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findEmptyTranslationLeafValues(item, `${currentPath}.${index}`))
  }

  if (!value || typeof value !== 'object') {
    return []
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const nextPath = currentPath ? `${currentPath}.${key}` : key
    return findEmptyTranslationLeafValues(child, nextPath)
  })
}
