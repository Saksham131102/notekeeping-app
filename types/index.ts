export interface INote {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: Date;
  editedAt: Date;
}
