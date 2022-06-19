import { Entry } from "../types";

import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: Entry }) => {
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
      <div>{entry.date} <WorkIcon /></div>
      <div><i>{entry.description}</i></div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;