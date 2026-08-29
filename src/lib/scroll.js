let lenisInstance = null

export function setLenisInstance(instance) {
  lenisInstance = instance
}

export function resetScrollPosition() {
  lenisInstance?.scrollTo(0, { immediate: true, force: true })
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}
