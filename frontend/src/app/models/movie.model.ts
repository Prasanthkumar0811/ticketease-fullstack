export interface Cast{
  name:string;
  role:string;
  image:string;
}


export interface Movie {
  id: number;
  name: string;
  duration: string;
  rating: number;
  image: string;
  description?:string;
  cast?:Cast[];
}
