import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "./models";

export const store = init({ models });
export const dispatch = store.dispatch;

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export { ReduxProvider } from "@/context/ReduxProvider";
export { actions } from "./actions";