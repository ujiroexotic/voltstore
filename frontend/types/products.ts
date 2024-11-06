export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  imageUrls: [
    {
      data: Buffer;
      type: string;
    } 
  ];
};