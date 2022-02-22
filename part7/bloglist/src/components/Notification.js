/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */

import store from '../store'

const Notification = () => {
  const notification = store.getState().notification

  if (notification === null) {
    return null;
  } else {
    const notificationStyle = {
      color: notification.type === "error" ? "red" : "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };

    return (
      <div id="notification" style={notificationStyle}>
        {notification.message}
      </div>
    );
  }
};

export default Notification;
