import { mockSuggestions as initialSuggestions, Suggestion } from "@/data/mockData";

type Listener = () => void;

let suggestions: Suggestion[] = [...initialSuggestions];
const listeners: Set<Listener> = new Set();

function notify() {
  listeners.forEach((l) => l());
}

export const suggestionsStore = {
  getAll: () => suggestions,
  add: (s: Suggestion) => {
    suggestions = [s, ...suggestions];
    notify();
  },
  remove: (id: number) => {
    suggestions = suggestions.filter((s) => s.id !== id);
    notify();
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
