export interface BookModel {
  id?: string;
  title: string;
  author: string;
  publishedDate: string;
}

export let Books: BookModel[] = [
  {
    id: "1",
    title: "Thinking Fast And Slow",
    author: "Daniel Kahneman",
    publishedDate: "2023-10-22T10:26:34.694Z",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    publishedDate: "2023-10-22T10:26:34.694Z",
  },
];
