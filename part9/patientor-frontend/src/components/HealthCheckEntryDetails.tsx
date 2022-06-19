import { Entry } from '../types';

import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntryDetails = ({ entry }: { entry: Entry }) => {
  const styles = {
    container: {
      border: '1px solid black',
      borderRadius: '5px',
      padding: '5px',
      marginBottom: '5px',
    },
    icon: {
      color: entry.healthCheckRating === 0 ? 'green' 
      : entry.healthCheckRating === 1 ? 'yellow'
      : entry.healthCheckRating === 2 ? 'orange'
      : 'red'
    }
  };
  
  return (
    <div style={styles.container}>
      <div>{entry.date} <MonitorHeartIcon /></div>
      <div><i>{entry.description}</i></div>
      <FavoriteIcon style={styles.icon} />
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntryDetails;