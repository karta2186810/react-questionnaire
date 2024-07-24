import { FC, PropsWithChildren } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
  id: string;
  className?: string;
};

export const SortableItem: FC<PropsWithChildren<SortableItemProps>> = ({ id, className, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  if (transform) transform.scaleY = 1;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
