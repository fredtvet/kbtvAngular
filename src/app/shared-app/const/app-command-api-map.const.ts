import { CommandApiMap } from '@model/interfaces';
import { ModelCommand } from '@model/model-command.enum';

export const AppCommandApiMap: CommandApiMap = {
    [ModelCommand.Create]: {method: "POST", suffix: ""},
    [ModelCommand.Update]: {method: "PUT", suffix: (id: string) => `/${id}`},
    [ModelCommand.Delete]: {method: "DELETE", suffix: (id: string) => `/${id}`},
    [ModelCommand.DeleteRange]: {method: "POST", suffix: "/DeleteRange"},
    [ModelCommand.Mail]: {method: "POST", suffix: "/Mail"}
}