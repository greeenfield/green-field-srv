export const replaceSpace = (string: string) => {
  return string.replace(/\s/g, '-').replace(/--+/g, '-')
}
