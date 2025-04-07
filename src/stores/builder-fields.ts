import { capitalize } from "@/lib/captalize";
import { nanoid } from "@/lib/nanoid";
import { atom } from "nanostores";
export type BuilderFieldType =
  | 'section'
  | 'table'
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'datetime'
  | 'yesno'
  | 'dropdown'
  | 'checkbox'
  | 'checklist'
  | 'users'
  | 'attachment'
  | 'image'
  | 'slider'
  | 'heading'
  | 'paragraph'
  | 'tel';

export interface BuilderFieldOptions {
  showLabel?: boolean;
  splitTwoCols?: boolean;
  [key: string]: any;
}

export interface BuilderField {
  id: string;
  parentId?: string | null;
  type: BuilderFieldType;
  label?: string;
  column?: '1' | '2' | null;
  placeholder?: string;
  required?: boolean;
  order?: number;
  children?: BuilderField[],
  options?: BuilderFieldOptions;
}


export const $builderFields = atom<BuilderField[]>([]);



// ACTIONS
export const addField = (field: BuilderField) => {
  $builderFields.set([...$builderFields.get(), field]);
};

export const setFields = (fields: BuilderField[]) => {
  $builderFields.set(fields)
}

export const duplicateField = (id: string) => {
  const fieldToDuplicate = $builderFields.get().find((field) => field.id === id);
  if (fieldToDuplicate) {
    const duplicatedField = {
      ...fieldToDuplicate, id: nanoid(), label: `New ${capitalize(fieldToDuplicate.type)} (${$builderFields.get().length + 1
        })`,
      placeholder: `${capitalize(fieldToDuplicate.type)} (${$builderFields.get().length + 1
        })`,
    };
    $builderFields.set([...$builderFields.get(), duplicatedField]);
  }
};

export const removeField = (id: string) => {
  $builderFields.set($builderFields.get().filter((field) => field.id !== id));
};

export const updateField = (id: string, updatedField: BuilderField) => {
  $builderFields.set(
    $builderFields.get().map((field) => (field.id === id ? updatedField : field))
  );
};

// function to move the order up
export const moveField = (fromIndex: number, toIndex: number) => {
  const fields = [...$builderFields.get()];
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= fields.length ||
    toIndex >= fields.length
  ) {
    return;
  }

  const movedField = fields[fromIndex];

  // Remover o campo da posição atual
  fields.splice(fromIndex, 1);
  // Inserir na nova posição
  fields.splice(toIndex, 0, movedField);

  // Reatribuir ordens sequenciais
  const updatedFields = fields.map((field, index) => ({
    ...field,
    order: index,
  }));

  $builderFields.set(updatedFields);
};

export const addChild = (id: string, children: BuilderField) => {
  const fieldToUpdate = $builderFields.get().find((field) => field.id === id);

  if (fieldToUpdate) {
    const updatedField = {
      ...fieldToUpdate,
      children: [...(fieldToUpdate.children || []), children],
    };
    $builderFields.set(
      $builderFields.get().map((field) => (field.id === id ? updatedField : field))
    );
  }
}

export const clearFields = () => {
  $builderFields.set([]);
};

export const getFieldById = (id: string) => {
  return $builderFields.get().find((field) => field.id === id);
};



export const $builderFieldsActions = {
  setFields,
  addChild,
  addField,
  removeField,
  updateField,
  clearFields,
  getFieldById,
  duplicateField,
  moveField
};
