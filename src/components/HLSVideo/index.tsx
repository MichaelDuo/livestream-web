import HLSVideo from './HLSVideo';
import {connect} from 'react-redux';

export default connect((state: RootState) => {
	return {
		pathname: state.router.location.pathname,
	};
})(HLSVideo);
