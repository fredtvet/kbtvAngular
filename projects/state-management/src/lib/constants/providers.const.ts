import { Provider } from '@angular/core'
import { ActionDispatcher } from '../action-dispatcher'
import { ComponentStore } from '../component.store'

/** A collection of providers required for a {@link ComponentStore}
 *  Should be injected in the components providers array. */
export const ComponentStoreProviders: Provider[] = [
    ActionDispatcher,
    ComponentStore,
]
