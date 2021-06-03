import { OptimisticHttpRequest, SupportedContentTypes } from "optimistic-http";

export type FilterRequestByType<
    A extends Omit<OptimisticHttpRequest<SupportedContentTypes>, "type"> & {type: string},
    ActionType extends string
> = A extends { type: ActionType } ? A : never;
