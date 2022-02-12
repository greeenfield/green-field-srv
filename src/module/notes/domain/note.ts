export type NoteProperties = {
  id: string
  title: string
  body: string
}

export interface Note {
  properties: () => NoteProperties
  create: () => Promise<void>
}
