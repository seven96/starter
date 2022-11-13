import { createModel } from "@rematch/core";
import { RootModel } from ".";

export const countModel = createModel<RootModel>()({
    state: {
        count: 0,
    },

    reducers: {
        increment: (state, payload: number) => {
            return { ...state, count: state.count + payload };
        }
    },

    effects: (dispatch) => ({
        async incrementAsync(payload: number, rootState): Promise<number> {
            await new Promise(resolve => setTimeout(resolve, 1000));
            dispatch.countModel.increment(payload);
            return rootState.countModel.count;
        }
    })
});
