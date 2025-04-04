import { atom } from "nanostores"
import { BuilderField } from "./builder-fields"

export type BuilderOptions = {
  selectedField: BuilderField | null,
}


export const $builderOpts = atom<BuilderOptions>({
  selectedField: null,
})

// ACTIONS
export const setSelectedField = (field: BuilderField) => {
  $builderOpts.set({
    ...$builderOpts.get(),
    selectedField: field,
  })
}

export const clearSelectedField = () => {
  $builderOpts.set({
    ...$builderOpts.get(),
    selectedField: null,
  })
}

export const $builderOptsActions = {
  setSelectedField,
  clearSelectedField
};

