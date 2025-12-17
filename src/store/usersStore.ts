import { create } from 'zustand';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company?: {
    name: string;
  };
}

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;

  // async action
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total: 0,
  loading: false,

  fetchUsers: async (limit, skip, search) => {
    set({ loading: true });

    const url = search
      ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();

    set({
      users: data.users,
      total: data.total,
      loading: false,
    });
  },
}));
