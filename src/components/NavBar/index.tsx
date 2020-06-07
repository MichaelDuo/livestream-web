import NavBar from './NavBar';
import {connect} from 'react-redux';

export default connect((state: RootState) => {
	return {
		pathname: state.router.location.pathname,
	};
})(NavBar);
