import {connect} from 'react-redux';
import HLSPage from './HLSPage';
import {RootState} from 'types';
import actions from 'actions';

export default connect(
	(state: RootState) => ({
		count: state.App.count,
	}),
	{
		increment: actions.App.increment,
		decrement: actions.App.decrement,
	}
)(HLSPage);
