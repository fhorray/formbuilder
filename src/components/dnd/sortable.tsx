import { cn } from '@/lib/utils';
import { BuilderField } from '@/stores/builder-fields';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

export const Sortable = ({
  field,
  children,
}: {
  field: BuilderField;
  children: React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        'flex items-start w-full',
        isDragging ? 'pointer-events-none opacity-60 border-dashed' : '',
      )}
    >
      {/* DRAG ICON */}
      <div
        className="drag-handle cursor-grab px-2 pt-7 text-gray-400"
        {...listeners}
      >
        <GripVerticalIcon />
      </div>
      {children}
    </div>
  );
};
