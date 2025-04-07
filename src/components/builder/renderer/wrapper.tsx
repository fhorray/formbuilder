'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import {
  $builderFields,
  $builderFieldsActions,
  type BuilderField,
} from '@/stores/builder-fields';
import { $builderOpts, $builderOptsActions } from '@/stores/builder-opts';
import { useStore } from '@nanostores/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Copy,
  EyeIcon as EyeClosedIcon,
  EyeIcon,
  Pencil,
  Trash2,
} from 'lucide-react';
import { FieldRenderer } from '.';

interface FieldWrapperProps {
  field: BuilderField;
}

export const FieldWrapper = ({ field }: FieldWrapperProps) => {
  // const [isHovered, setIsHovered] = useState(false);

  // STORES
  const opts = useStore($builderOpts);
  const fields = useStore($builderFields);

  return (
    <div
      className={cn(
        'relative rounded-md transition-all p-2 my-2 border hover:border-blue-500  border-transparent',
        opts.selectedField?.id === field.id
          ? 'border border-blue-500 bg-gray-200/10'
          : '',
      )}
    >
      <div className="group relative">
        <div className="flex items-center justify-between py-2">
          {/* LABEL */}

          {field.type !== 'section' &&
            field.type !== 'heading' &&
            field.type !== 'paragraph' &&
            field.type !== 'users' && (
              <div className="flex items-center gap-2">
                <input
                  className={cn(
                    'focus:outline-none focus:ring-0 text-sm font-medium block border-0 p-2 rounded-md',
                    field.options?.showLabel ? '' : 'opacity-40 line-through',
                  )}
                  disabled={!field.options?.showLabel}
                  value={field.label}
                  placeholder={!field.label ? 'Field Label' : field.label}
                  onChange={(e) => {
                    $builderFieldsActions.updateField?.(field.id, {
                      ...field,
                      label: e.target.value,
                    });
                  }}
                />

                <Toggle
                  className="w-8 h-8 cursor-pointer"
                  onPressedChange={(checked) => {
                    $builderFieldsActions.updateField?.(field.id, {
                      ...field,
                      options: {
                        ...field.options,
                        showLabel: checked,
                      },
                    });
                  }}
                >
                  {field.options?.showLabel ? <EyeIcon /> : <EyeClosedIcon />}
                </Toggle>
              </div>
            )}

          {/* ACTIONS */}
          <div
            className={cn(
              'w-full flex items-center justify-end transition-opacity self-end opacity-0 group-hover:opacity-100',
            )}
          >
            {/* MOVE UP/DOWN */}
            {(field.order ?? 0) > 1 && (
              <Button
                type="button"
                variant="ghost"
                className="cursor-pointer"
                size="icon"
                onClick={() => {
                  $builderFieldsActions.moveFieldUp?.(field.id);
                }}
              >
                <ChevronUpIcon className="h-2 w-2" />
              </Button>
            )}

            {(field.order ?? 0) < fields.length - 1 && (
              <Button
                type="button"
                variant="ghost"
                className="cursor-pointer"
                size="icon"
                onClick={() => {
                  $builderFieldsActions.moveFieldDown?.(field.id);
                }}
              >
                <ChevronDownIcon className="h-2 w-2" />
              </Button>
            )}

            {/* Selector */}
            {/* TODO: change it to a toggle with a CADEADO ICON */}
            <Checkbox
              className="m-2 w-4 h-4 cursor-pointer"
              onCheckedChange={(value) => {
                if (value) {
                  $builderOptsActions.setSelectedField?.(field);
                } else {
                  $builderOptsActions.clearSelectedField?.();
                }
              }}
            />

            {/* EDIT ICON */}
            <Button
              type="button"
              variant={'ghost'}
              className="cursor-pointer"
              size={'icon'}
              onClick={() => {
                window.alert('Edit field');
              }}
            >
              <Pencil className="h-2 w-2" />
            </Button>

            {/* DUPLICATE ICON */}
            <Button
              type="button"
              variant={'ghost'}
              className="cursor-pointer"
              size={'icon'}
              onClick={() => $builderFieldsActions.duplicateField?.(field.id)}
            >
              <Copy className="h-2 w-2" />
            </Button>

            {/* DELETE ICON */}
            <Button
              type="button"
              variant={'ghost'}
              className="text-red-500 focus:text-red-500 cursor-pointer"
              size={'icon'}
              onClick={() => {
                $builderFieldsActions.removeField?.(field.id);
              }}
            >
              <Trash2 className="h-2 w-2" />
            </Button>
          </div>
        </div>

        <FieldRenderer field={field} />
      </div>
    </div>
  );
};
