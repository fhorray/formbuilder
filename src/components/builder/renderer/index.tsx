import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import {
  $builderFieldsActions,
  type BuilderField,
} from '@/stores/builder-fields';
import { SquareSplitHorizontalIcon } from 'lucide-react';
import { FieldWrapper } from './wrapper';

interface FieldRendererProps {
  field: BuilderField;
}

export const FieldRenderer = ({ field }: FieldRendererProps) => {
  switch (field.type) {
    case 'text':
      return (
        <Input placeholder={field.placeholder} required={field.required} />
      );

    case 'textarea':
      return (
        <Textarea placeholder={field.placeholder} required={field.required} />
      );

    case 'number':
      return (
        <Input
          type="number"
          placeholder={field.placeholder}
          required={field.required}
        />
      );

    case 'date':
      return (
        <Input
          type="date"
          placeholder={field.placeholder}
          required={field.required}
        />
      );

    case 'datetime':
      return (
        <Input
          type="datetime-local"
          placeholder={field.placeholder}
          required={field.required}
        />
      );

    case 'yesno':
      return (
        <div className="flex items-center gap-2">
          <Switch id={field.id} />
          <label htmlFor={field.id}>{field.label}</label>
        </div>
      );

    case 'dropdown':
      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {/* Aqui você pode popular com opções reais se o field tiver `options` */}
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

    case 'checkbox':
      return (
        <div className="flex items-center gap-2">
          <Checkbox id={field.id} />
          <label htmlFor={field.id}>{field.label}</label>
        </div>
      );

    case 'checklist':
      return (
        <div className="flex flex-col gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Checkbox id={`${field.id}-${i}`} />
              <label htmlFor={`${field.id}-${i}`}>Item {i}</label>
            </div>
          ))}
        </div>
      );

    case 'users':
      return <Input placeholder="Search user..." />;

    case 'attachment':
      return <Input type="file" required={field.required} />;

    case 'image':
      return <Input type="file" accept="image/*" required={field.required} />;

    case 'slider':
      return <Slider defaultValue={[50]} max={100} step={1} />;

    case 'section': {
      const sectionOptions = field.options || {};

      const handleToggleOption = (optionKey: string) => {
        $builderFieldsActions.updateField?.(field.id, {
          ...field,
          options: {
            ...sectionOptions,
            [optionKey]: !sectionOptions?.[optionKey],
          },
        });
      };

      return (
        <div>
          <div className="flex gap-2">
            <Toggle
              className="cursor-pointer"
              pressed={sectionOptions.splitTwoCols}
              onPressedChange={() => handleToggleOption('splitTwoCols')}
            >
              <SquareSplitHorizontalIcon /> 2 Columns
            </Toggle>
          </div>

          {Array.isArray(field.children) && field.children.length > 0 ? (
            sectionOptions.splitTwoCols ? (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="w-full p-4 border border-gray-200 rounded-md">
                  {field.children
                    .filter((item) => item.column === '1')
                    .map((childField) => (
                      <FieldWrapper field={childField} key={childField.id} />
                    ))}
                </div>
                <div className="w-full p-4 border border-gray-200 rounded-md">
                  {field.children
                    .filter((item) => item.column === '2')
                    .map((childField) => (
                      <FieldWrapper field={childField} key={childField.id} />
                    ))}
                </div>
              </div>
            ) : (
              <div className="w-full p-4 border border-gray-200 rounded-md mt-2">
                {field.children.map((childField) => (
                  <FieldWrapper field={childField} key={childField.id} />
                ))}
              </div>
            )
          ) : (
            <p className="text-muted-foreground text-sm mt-2">
              Nenhum campo adicionado.
            </p>
          )}
        </div>
      );
    }

    case 'table':
    case 'heading':
    case 'paragraph':
      return (
        <div className="p-4 bg-muted rounded border text-muted-foreground">
          <p className="text-sm italic">[Placeholder for {field.type}]</p>
        </div>
      );

    default:
      return (
        <div className="text-red-500">Unsupported field type: {field.type}</div>
      );
  }
};
