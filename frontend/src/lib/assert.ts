export function assert(predicate: boolean, message: string) {
  if (predicate) return
  throw new Error(message)
}
