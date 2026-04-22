'use client'

import * as React from 'react'

import { motion, isMotionComponent, type HTMLMotionProps } from 'motion/react'

import { cn } from '@/lib/utils'

interface AnyProps extends Record<string, unknown> {}

interface DOMMotionProps<T extends HTMLElement = HTMLElement> extends Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  'ref'
> {
  ref?: React.Ref<T>
}

type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined })

interface SlotProps<T extends HTMLElement = HTMLElement> extends DOMMotionProps<T> {
  children?: React.ReactNode
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(node)
      } else {
        ;(ref as React.RefObject<T | null>).current = node
      }
    })
  }
}

function mergeProps<T extends HTMLElement>(childProps: AnyProps, slotProps: DOMMotionProps<T>): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps }

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className as string, slotProps.className as string)
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    }
  }

  return merged
}

function Slot<T extends HTMLElement = HTMLElement>({ children, ref, ...props }: SlotProps<T>) {
  if (!React.isValidElement(children)) return null

  const element = children as React.ReactElement

  const isAlreadyMotion = typeof element.type === 'object' && element.type !== null && isMotionComponent(element.type)

  const Base = React.useMemo(
    () => (isAlreadyMotion ? (element.type as React.ElementType) : motion.create(element.type as React.ElementType)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAlreadyMotion, element.type]
  )

  const { ref: childRef, ...childProps } = element.props as AnyProps

  const mergedProps = mergeProps(childProps, props)

  return <Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />
}

export { Slot, type SlotProps, type WithAsChild, type DOMMotionProps, type AnyProps }
