import { ModelCommandApiMap, ModelCommand } from 'model-state';

export const AppCommandApiMap: ModelCommandApiMap = {
    [ModelCommand.Create]: {method: "POST", suffix: ""},
    [ModelCommand.Update]: {method: "PUT", suffix: (id: string) => `/${id}`},
    [ModelCommand.Delete]: {method: "DELETE", suffix: (id: string) => `/${id}`},
    [ModelCommand.DeleteRange]: {method: "POST", suffix: "/DeleteRange"},
    [ModelCommand.Mail]: {method: "POST", suffix: "/Mail"}
}