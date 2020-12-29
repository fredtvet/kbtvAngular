export interface ConfirmDialogConfig {
    title?: string,
    message?: string,
    discardText?: string,
    confirmText: string,
    confirmCallback?: Function,
    cancelCallback?: Function,
  }