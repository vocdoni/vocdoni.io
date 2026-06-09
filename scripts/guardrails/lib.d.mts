export type HardcodedJsxCopyViolation = {
  kind: 'attribute' | 'expression' | 'text'
  line: number
  value: string
}

export function getInvalidComponentDirectories(directoryPaths: string[]): string[]

export function findHardcodedJsxCopyViolations(source: string, filePath: string): HardcodedJsxCopyViolation[]

export function findEmptyTranslationLeafValues(value: unknown, currentPath?: string): string[]

export type DynamicTranslationKeyViolation = {
  line: number
  snippet: string
}

export function findDynamicTranslationKeys(source: string, filePath: string): DynamicTranslationKeyViolation[]
