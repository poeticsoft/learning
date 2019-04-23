
import { connect } from 'react-redux'
import App from '../component/app/component'

const mapStateToProps = state => {

  return {
    main: state.main
  }
}

const RootApp = connect(
  mapStateToProps
)(App)

export default RootApp