import { nanoid } from '@/lib/nanoid';
import {
  $builderFields,
  $builderFieldsActions,
  BuilderField,
} from '@/stores/builder-fields';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useStore } from '@nanostores/react';
import { createContext, useContext, useState } from 'react';

type DndState = {
  activeId: string | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  hoverIndex: number | null;
  setHoverIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const DndKitContext = createContext<DndState | undefined>(undefined);

export const useDndKitContext = () => {
  const context = useContext(DndKitContext);

  if (!context) {
    throw new Error('useDndKit must be used within DndKitProvider');
  }

  return context;
};

export const DndKitProvider = ({ children }: { children: React.ReactNode }) => {
  const fields = useStore($builderFields);

  const [activeId, setActiveId] = useState<DndState['activeId']>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 500, // 500ms antes de iniciar drag
        tolerance: 5, // precisa mover 5px antes de ativar
      },
    }),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeField = fields.find((f) => f.id === active.id);
    const overIndex = fields.findIndex((f) => f.id === over.id);
    const activeIndex = fields.findIndex((f) => f.id === active.id);

    // Se o item já existe no canvas, apenas reordene
    if (activeField) {
      $builderFieldsActions.moveField?.(activeIndex, overIndex);
    } else {
      // Caso contrário, está vindo do painel lateral: adicione ao canvas
      const newField = event.active.data.current as BuilderField;
      $builderFieldsActions.addField({ ...newField, id: nanoid() });
    }
  };

  return (
    <DndKitContext.Provider
      value={{
        activeId,
        handleDragEnd,
        handleDragStart,
        hoverIndex,
        setHoverIndex,
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndContext>
    </DndKitContext.Provider>
  );
};
