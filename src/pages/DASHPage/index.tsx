import {connect} from 'react-redux';
import DASHPage from './DASHPage';
import {RootState} from 'types';
import actions from 'actions';

export default connect((state: RootState) => ({}), {
	clearMetrics: actions.Metrics.clear,
	addPoint: actions.Metrics.addPoint,
})(DASHPage);
