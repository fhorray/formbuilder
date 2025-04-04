import { $builderFields, BuilderField } from "@/stores/builder-fields";

export const findParentSectionId = (fieldId: string): string | null => {
  const findInFields = (fields: BuilderField[]): string | null => {
    for (const f of fields) {
      if (f.children) {
        if (Array.isArray(f.children[0])) {
          // Two columns
          const [col1, col2] = f.children as [BuilderField[], BuilderField[]];
          if (
            col1.some((child) => child.id === fieldId) ||
            col2.some((child) => child.id === fieldId)
          ) {
            return f.id;
          }

          // Check recursively
          const foundInCol1 = col1.find((child) => child.type === 'section')
            ? findInFields(col1)
            : null;
          if (foundInCol1) return foundInCol1;

          const foundInCol2 = col2.find((child) => child.type === 'section')
            ? findInFields(col2)
            : null;
          if (foundInCol2) return foundInCol2;
        } else {
          // Single column
          const children = f.children as BuilderField[];
          if (children.some((child) => child.id === fieldId)) {
            return f.id;
          }

          // Check recursively
          const found = children.find((child) => child.type === 'section')
            ? findInFields(children)
            : null;
          if (found) return found;
        }
      }
    }
    return null;
  };

  // Start the search from the top level fields
  return findInFields($builderFields.get());
};