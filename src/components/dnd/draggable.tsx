import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function Draggable({
  children,
  data,
  id,
}: {
  children: React.ReactNode;
  id: string;
  data: any | undefined;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data,
  });

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
