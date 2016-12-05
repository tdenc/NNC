import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as nncActions from '../action/nncActions'
import { MainComponent } from '../component/MainComponent'

const mapStateToProps = (state) => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(nncActions, dispatch)
}

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
