import { create } from 'zustand';

const useNotificationStore = create(set => ({
  message: null,
  type: null,
  notify: ({ message, type = 'success' }) => {
    set({ message, type });
    setTimeout(() => set({ message: null, type: null }), 3000);
  },
}));

export const useNotification = () => {
  const message = useNotificationStore((state) => state.message);
  const type = useNotificationStore((state) => state.type);
  return { message, type };
};

export const useNotify = () => useNotificationStore(state => state.notify);