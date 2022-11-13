import { connect } from 'react-redux';
import { mapDispatchToProps, mapState, MapStoreProps } from './store.model';

const StoreConnectPage: React.FC<MapStoreProps> = (props) => {
    return (
        <div>
            <h3>StoreConnectPage</h3>
            <span>{props.count}</span>
            <button onClick={props.increment}>+</button>
        </div>
    )
}

export default connect(mapState, mapDispatchToProps)(StoreConnectPage);