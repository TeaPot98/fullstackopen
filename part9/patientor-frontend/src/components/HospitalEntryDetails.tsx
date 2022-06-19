import { Entry } from "../types";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryDetails = ({ entry }: { entry: Entry }) => {
  const styles = {
    container: {
      border: '1px solid black',
      borderRadius: '5px',
      padding: '5px',
      marginBottom: '5px',
    }
  };
  
  return (
    <div style={styles.container}>
      <div>{entry.date} <LocalHospitalIcon /></div>
      <div><i>{entry.description}</i></div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HospitalEntryDetails;