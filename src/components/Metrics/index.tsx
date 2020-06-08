import Metrics from './Metrics';
import {connect} from 'react-redux';

export default connect((state: RootState) => {
	return {
		metrics: state.Metrics,
	};
})(Metrics);
