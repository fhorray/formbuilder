import { nanoid } from '@/lib/nanoid';
import {
  $builderFields,
  $builderFieldsActions,
  BuilderField,
} from '@/stores/builder-fields';
import { useStore } from '@nanostores/react';
import {
  AlignLeftIcon,
  CalendarIcon,
  CheckSquareIcon,
  ChevronDownIcon,
  ClockIcon,
  Grid2x2Icon,
  HashIcon,
  ImageIcon,
  ListIcon,
  PaperclipIcon,
  SearchIcon,
  SlidersIcon,
  ToggleLeftIcon,
  TypeIcon,
  UsersIcon,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { capitalize } from '@/lib/captalize';
import { $builderOpts } from '@/stores/builder-opts';

export const BuilderElements = () => {
  const fields = useStore($builderFields);

  console.log({ fields });

  return (
    <div className="w-[400px] h-screen border-r p-4">
      <div className="relative mb-6">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search Components"
          className="pl-8 h-9"
        />
      </div>

      <div className="space-y-6">
        <Section title="Layout Elements">
          <ElementButton
            icon={<AlignLeftIcon className="h-4 w-4" />}
            label="Sections"
            type="section"
          />
          <ElementButton
            icon={<Grid2x2Icon className="h-4 w-4" />}
            label="Tables"
            type="table"
          />
        </Section>

        <Section title="Text Elements">
          <ElementButton
            icon={<TypeIcon className="h-4 w-4" />}
            label="Single line"
            type="text"
          />
          <ElementButton
            icon={<AlignLeftIcon className="h-4 w-4" />}
            label="Multiline"
            type="textarea"
          />
          <ElementButton
            icon={<HashIcon className="h-4 w-4" />}
            label="Number"
            type="number"
          />
        </Section>

        <Section title="Date Elements">
          <ElementButton
            icon={<CalendarIcon className="h-4 w-4" />}
            label="Date"
            type="date"
          />
          <ElementButton
            icon={<ClockIcon className="h-4 w-4" />}
            label="Date & Time"
            type="datetime"
          />
        </Section>

        <Section title="Multi Elements">
          <ElementButton
            icon={<ToggleLeftIcon className="h-4 w-4" />}
            label="Yes/No"
            type="yesno"
          />
          <ElementButton
            icon={<ChevronDownIcon className="h-4 w-4" />}
            label="Dropdown"
            type="dropdown"
          />
          <ElementButton
            icon={<CheckSquareIcon className="h-4 w-4" />}
            label="Checkbox"
            type="checkbox"
          />
          <ElementButton
            icon={<ListIcon className="h-4 w-4" />}
            label="Checklist"
            type="checklist"
          />
          <ElementButton
            icon={<UsersIcon className="h-4 w-4" />}
            label="Profiles"
            type="users"
          />
        </Section>

        <Section title="Media Elements">
          <ElementButton
            icon={<PaperclipIcon className="h-4 w-4" />}
            label="Attachments"
            type="attachment"
          />
          <ElementButton
            icon={<ImageIcon className="h-4 w-4" />}
            label="Image"
            type="image"
          />
          <ElementButton
            icon={<SlidersIcon className="h-4 w-4" />}
            label="Slider"
            type="slider"
          />
        </Section>
      </div>
    </div>
  );
};

// Section component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    <div className="grid grid-cols-2 gap-2">{children}</div>
  </div>
);

// ElementButton component
const ElementButton = ({
  icon,
  label,
  type,
}: {
  icon: React.ReactNode;
  label: string;
  type: BuilderField['type'];
}) => (
  <Button
    type="button"
    onClick={() => {
      const selectedField = $builderOpts.get().selectedField;

      if ($builderOpts.get().selectedField) {
        if (selectedField?.id) {
          $builderFieldsActions.addChild(selectedField.id, {
            id: nanoid(),
            parentId: selectedField?.id,
            type,
            label: `New ${capitalize(type)} (${
              (selectedField?.children?.length ?? 0) + 1
            })`,
            placeholder: `${capitalize(type)} (${
              (selectedField?.children?.length ?? 0) + 1
            })`,
            required: true,
            column: selectedField?.column ?? '1',
            order: (selectedField?.children?.length ?? 0) + 1,
            options: {
              showLabel: true,
              splitTwoCols: false,
            },
          });
        }
      } else {
        $builderFieldsActions.addField({
          id: nanoid(),
          parentId: null,
          type,
          label: `New ${capitalize(type)} (${$builderFields.get().length + 1})`,
          placeholder: `${capitalize(type)} (${
            $builderFields.get().length + 1
          })`,
          required: true,
          order: $builderFields.get().length + 1,
          options: {
            showLabel: true,
            splitTwoCols: false,
          },
        });
      }
    }}
    variant="outline"
    className="flex items-center gap-2 justify-start w-full cursor-pointer p-6"
  >
    {icon}
    <span className="text-sm">{label}</span>
  </Button>
);
