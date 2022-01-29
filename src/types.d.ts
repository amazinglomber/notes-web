
interface ILabel {
  id: string;
  label: string;
}

interface ICreateLabel {
  label: string;
}

interface INote {
  id: string;
  title: string;
  body: string;
  isArchived: boolean;
  /**
   * Labels ids.
   */
  // labels: ILabel['id'][];
}

interface ICreateNote {
  title: string;
  body: string;
  /**
   * Labels ids.
   */
  labels: ILabel['id'][];
}

interface IGetNotesResponse {
  notes: INote[];
  totalCount: number;
}
