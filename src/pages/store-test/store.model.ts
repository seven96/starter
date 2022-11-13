import { RootState, actions } from "@/store";

export const mapState = (state: RootState) => {
    return {
        count: state.countModel.count,
    };
};

export const mapDispatchToProps = () => ({
    increment: actions.countAction.increment,
    incrementAsync: actions.countAction.incrementAsync,
})

export type MapDispatchProps = ReturnType<typeof mapDispatchToProps>;
export type MapStateProps = ReturnType<typeof mapState>;
export type MapStoreProps = MapDispatchProps & MapStateProps;