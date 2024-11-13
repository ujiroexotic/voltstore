export type Category = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: {
    data: {
        data: Buffer;
        type: string;
    };
    contentType: string;
  };
};
