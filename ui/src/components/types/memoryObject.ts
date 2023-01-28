type ContainerMemoryObject = {
  hardLimit : string | null,
  softLimit : string | null
}
type allMemoryObject = {
  [id: string]: ContainerMemoryObject
}

export type { ContainerMemoryObject, allMemoryObject}