export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description:string;
  category: string;
  rating: Rating;
};

type Rating = {
  rate: number;
}