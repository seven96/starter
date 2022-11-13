import { dispatch } from "..";

export const increment = () => {
    dispatch.countModel.increment(1);
}

export const incrementAsync = () => {
    dispatch({ type: "countModel/incrementAsync", payload: 1 });
}