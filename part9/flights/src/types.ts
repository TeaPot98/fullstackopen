export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

// Exporting the DiaryEntry type without the 'comment' field
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
// Exporting the DiaryEntry type without the 'id' field
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;