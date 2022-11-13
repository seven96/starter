import { useSelector } from "react-redux";
import { RootState, actions } from "@/store";
import { mapState, MapStateProps } from "./store.model";

const StorePage: React.FC = () => {
    const { count } = useSelector<RootState, MapStateProps>(mapState);
    return (
        <div>
            <h3>StorePage</h3>
            <span>{count}</span>
            <button onClick={actions.countAction.increment}>+</button>
        </div>
    );
}

export default StorePage;