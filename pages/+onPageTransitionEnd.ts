export const onPageTransitionEnd = async () => {
  document.querySelector('body')?.classList.remove('page-is-transitioning')
}
