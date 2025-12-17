import { create } from 'zustand';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductsState {
  products: Product[];
  categories: Category[];
  total: number;
  loading: boolean;

  fetchProducts: (
    limit: number,
    skip: number,
    search?: string
  ) => Promise<void>;

  fetchCategories: () => Promise<void>;
  fetchByCategory: (
    category: string,
    limit: number,
    skip: number
  ) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  categories: [],
  total: 0,
  loading: false,

  fetchProducts: async (limit, skip, search) => {
    set({ loading: true });

    const url = search
      ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();

    set({
      products: data.products,
      total: data.total,
      loading: false,
    });
  },

  fetchCategories: async () => {
    const res = await fetch('https://dummyjson.com/products/categories');
    const data = await res.json();

    set({ categories: data });
  },

  fetchByCategory: async (category, limit, skip) => {
    set({ loading: true });

    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    );

    const data = await res.json();

    set({
      products: data.products,
      total: data.total,
      loading: false,
    });
  },
}));
