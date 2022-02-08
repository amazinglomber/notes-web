
type NoteColor =
  'Grey' |
  'Purple' |
  'Blue' |
  'LightGreen' |
  'DarkGreen' |
  'Yellow' |
  'Orange' |
  'Red' |
  'Pink';

interface INote {
  id: number;
  title: string;
  body: string;
  isArchived: boolean;
  color: NoteColor;
  /**
   * Labels ids.
   */
  // labels: ILabel['id'][];
}

interface ICreateNote {
  title?: string;
  body?: string;
  color?: NoteColor;
  /**
   * Labels ids.
   */
  // labels: ILabel['id'][];
}

interface IUpdateNote {
  id: number;
  title?: string;
  body?: string;
  isArchived?: boolean;
  color?: NoteColor;
}

interface IGetNotesResponse {
  notes: INote[];
  totalCount: number;
}
