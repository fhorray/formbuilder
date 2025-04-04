import { createContext, useContext, useState, ReactNode } from 'react';
import { nanoid } from 'nanoid';

export interface FormElement {
  id: string;
  type: string;
  label: string;
}

interface FormBuilderContextType {
  elements: FormElement[];
  addElement: (type: string) => void;
  moveElement: (fromIndex: number, toIndex: number) => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(
  undefined,
);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context)
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  return context;
};

export function FormBuilderProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FormElement[]>([]);

  const addElement = (type: string) => {
    const id = nanoid();
    setElements((prev) => [
      ...prev,
      { id, type, label: `${type} - ${id.slice(0, 4)}` },
    ]);
  };

  const moveElement = (fromIndex: number, toIndex: number) => {
    setElements((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  };

  return (
    <FormBuilderContext.Provider value={{ elements, addElement, moveElement }}>
      {children}
    </FormBuilderContext.Provider>
  );
}
