import { Models } from "@rematch/core";
import { countModel } from "./countModel";

export interface RootModel extends Models<RootModel> {
    countModel: typeof countModel;
};
export const models: RootModel = {
    countModel,
}