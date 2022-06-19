import axios from "axios";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";
import { Patient } from "../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import EntryDetails from "../components/EntryDetails";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient: Patient | null = id !== undefined ? patients[id] : null;

  useEffect(() => {
    const getPatient = async () => {
      try {
        if (id !== undefined && patient !== null && patient !== undefined && patient.ssn === undefined) {
          const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          dispatch(addPatient(patient));
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };
    void getPatient();
  }, []);


  return patient !== undefined && patient !== null ? (
    <>
      <h2>
        {patient.name}
        {patient.gender === 'male' ? <MaleIcon/> : <FemaleIcon/>}
      </h2>
      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h2>entries</h2>
      {patient.entries && patient.entries.map<ReactJSXElement>(e => 
        // <div  key={e.id}>
        //   <div>{e.date} <i>{e.description}</i></div>
        //   {e.diagnosisCodes &&
        //     <ul>
        //       {e.diagnosisCodes.map(dc =>
        //         <li key={dc}>{diagnoses[dc].code} {diagnoses[dc].name}</li>
        //       )}
        //     </ul>
        //   }
        // </div>
        <EntryDetails key={e.id} entry={e} />
      )}
    </>
  ) : <></>;
};

export default PatientDetailsPage;