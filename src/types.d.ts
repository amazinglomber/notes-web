
interface ILabel {
  id: string;
  label: string;
}

interface ICreateLabel {
  label: string;
}

interface INote {
  id: number;
  title: string;
  body: string;
  isArchived: boolean;
  /**
   * Labels ids.
   */
  // labels: ILabel['id'][];
}

interface ICreateNote {
  title?: string;
  body?: string;
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
}

interface IGetNotesResponse {
  notes: INote[];
  totalCount: number;
}
