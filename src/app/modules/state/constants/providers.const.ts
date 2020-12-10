import { Provider } from '@angular/core'
import { ActionDispatcher } from '../action-dispatcher'
import { ComponentStore } from '../component.store'

export const ComponentStoreProviders: Provider[] = [
    ActionDispatcher,
    ComponentStore,
]
