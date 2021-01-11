/** Represents a configuration object for a confirmation dialog */
export interface ConfirmDialogConfig {
    /** A short and descriptive title */
    title?: string,
    /** A more detailed message */
    message?: string,
    /** The text that renders on the discard button */
    discardText?: string,
    /** The text that renders on the confirm button */
    confirmText: string,
    /** A function that executes if the user confirms the dialog */
    confirmCallback?: Function,
    /** A function that executes if the user cancels the dialog */
    cancelCallback?: Function,
  }