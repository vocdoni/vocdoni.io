export type HardcodedJsxCopyViolation = {
  kind: 'attribute' | 'expression' | 'text'
  line: number
  value: string
}

export function getInvalidComponentDirectories(directoryPaths: string[]): string[]

export function findHardcodedJsxCopyViolations(source: string, filePath: string): HardcodedJsxCopyViolation[]

export function getConfiguredLocales(source: string): string[] | null

export function findEmptyTranslationLeafValues(value: unknown, currentPath?: string): string[]

export function flattenTranslationLeaves(value: unknown, currentPath?: string): [string, string][]

export function findUntranslatedLeafValues(
  localeData: unknown,
  sourceData: unknown,
  referenceDataList: unknown[]
): string[]

export type DynamicTranslationKeyViolation = {
  line: number
  snippet: string
}

export function findDynamicTranslationKeys(source: string, filePath: string): DynamicTranslationKeyViolation[]
