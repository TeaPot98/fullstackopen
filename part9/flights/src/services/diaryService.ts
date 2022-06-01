import diaries from '../../data/diaries';

import { 
  DiaryEntry, 
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
} from '../types';

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  // Returning the diaries without the 'comment' field
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  return {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry,
  };
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};