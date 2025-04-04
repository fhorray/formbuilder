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

export const addField = (field: BuilderField) => {
  $builderFields.set([...$builderFields.get(), field]);
};

// ACTIONS
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
export const moveFieldUp = (id: string) => {
  const fields = $builderFields.get();
  const currentField = fields.find((field) => field.id === id);
  if (!currentField) return;

  const currentOrder = currentField.order ?? 0;
  const targetOrder = currentOrder - 1;

  // Encontrar o campo que atualmente tem a ordem para onde vamos mover
  const otherField = fields.find((field) => field.order === targetOrder);
  if (!otherField) return;

  // Trocar as ordens entre os campos
  updateField(currentField.id, { ...currentField, order: targetOrder });
  updateField(otherField.id, { ...otherField, order: currentOrder });
};

export const moveFieldDown = (id: string) => {
  const fields = $builderFields.get();
  const currentField = fields.find((field) => field.id === id);
  if (!currentField) return;

  const currentOrder = currentField.order ?? 0;
  const targetOrder = currentOrder + 1;

  // Encontrar o campo que atualmente tem a ordem para onde vamos mover
  const otherField = fields.find((field) => field.order === targetOrder);
  if (!otherField) return;

  // Trocar as ordens entre os campos
  updateField(currentField.id, { ...currentField, order: targetOrder });
  updateField(otherField.id, { ...otherField, order: currentOrder });
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
  addChild,
  addField,
  removeField,
  updateField,
  clearFields,
  getFieldById,
  duplicateField,
  moveFieldUp,
  moveFieldDown
};
