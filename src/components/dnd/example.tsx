import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import { Droppable } from './droppable';
import { Draggable } from './draggable';

const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

export const ExampleDnd = () => {
  const [parent, setParent] = useState<UniqueIdentifier | undefined | null>(
    null,
  );

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
    setParent(e.over?.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === 'droppable' ? draggable : 'Drop here'}
      </Droppable>
    </DndContext>
  );
};
