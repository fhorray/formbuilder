import { useState } from 'react';
import { nanoid } from 'nanoid';

export interface FormElement {
  id: string;
  type: string;
  label: string;
}

export function useFormBuilder() {
  const [elements, setElements] = useState<FormElement[]>([]);

  const addElement = (type: string) => {
    const id = nanoid();
    setElements((prev) => [
      ...prev,
      { id, type, label: `${type} - ${id.slice(0, 4)}` },
    ]);
  };

  const moveElement = (oldIndex: number, newIndex: number) => {
    setElements((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);
      return updated;
    });
  };

  return {
    elements,
    addElement,
    moveElement,
  };
}