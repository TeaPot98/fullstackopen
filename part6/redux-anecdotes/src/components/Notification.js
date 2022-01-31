import React from 'react'
import { connect, useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification && notification !== '' 
  ? (
    <div style={style}>
      {notification}
    </div>
  )
  : null
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification