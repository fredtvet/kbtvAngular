/** Represents an id and a selected status for the given id. */
export interface IdSelectPair { id: string | number, selected: boolean }

/** Represents a map of ids and associated {@link IdSelectPair}  */
export type SelectedMap = {[key: string]: IdSelectPair}
