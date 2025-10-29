export const onPageTransitionStart = async () => {
  document.querySelector('body')?.classList.add('page-is-transitioning')
}
