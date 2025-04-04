import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { $builderFields, BuilderField } from '@/stores/builder-fields';
import { useStore } from '@nanostores/react';
import { BetweenVerticalStartIcon, SquareIcon } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FieldWrapper } from './renderer/wrapper';

import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { $builderOpts, $builderOptsActions } from '@/stores/builder-opts';
import { cn } from '@/lib/utils';

type GridOptions = 'unique' | 'two-columns';

export const BuilderCanvas = () => {
  const [value, setValue] = useState<GridOptions>('unique');

  const fields = useStore($builderFields);

  const form = useForm<{ form: BuilderField[] }>({
    defaultValues: {
      form: [...fields],
    },
  });

  // onSubmit
  const onSubmit = (values: { form: BuilderField[] }) => {
    console.log(values);
  };

  return (
    <div className="w-full p-4 bg-red">
      {/* HEADER */}
      <div className="w-full flex items-center justify-between">
        {/* tabs */}
        <Tabs defaultValue="fields">
          <TabsList className="bg-gray-100">
            <TabsTrigger className="cursor-pointer" value="fields">
              Fields
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="workflow">
              Workflow
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="permissions">
              Permissions
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* CANVAS */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-end gap-4 py-2 bg-red"
        >
          <div className="w-full gap-4">
            {value === 'two-columns' ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-6">
                  Left Column
                </div>
                <div className="bg-white border rounded-lg p-6">
                  Right Column
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  'bg-white border rounded-lg p-4',
                  $builderOpts.get().selectedField?.id === 'canvas'
                    ? 'border-blue-500'
                    : '',
                )}
              >
                {fields
                  .slice()
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((field) => (
                    <FieldWrapper key={field.id} field={field} />
                  ))}
              </div>
            )}
          </div>

          <Button type="submit">Save</Button>
        </form>
      </FormProvider>
    </div>
  );
};

/*

  <div className="bg-white border rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Employee Details</h2>
          <button className="text-sm text-blue-600">Add description</button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1.5">
              Employee Name<span className="text-red-500">*</span>
            </label>
            <Input className="w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1.5">
              Employee Department URL
            </label>
            <Input className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm mb-1.5">Leave Start Date</label>
            <Input className="w-full" placeholder="dd/mm/yyyy" />
          </div>
          <div>
            <label className="block text-sm mb-1.5">
              Leave End Date<span className="text-red-500">*</span>
            </label>
            <Input className="w-full" placeholder="dd/mm/yyyy" />
          </div>
        </div>

        <div className="border-2 border-dashed border-blue-400 rounded-md p-4 mt-6 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-2 shadow-sm">
            <TypeIcon className="h-4 w-4" />
            <span className="text-sm">Single line</span>
          </div>
          <p className="text-blue-600 text-sm ml-4">
            Drop here to add a section
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm mb-1.5">
              Manager Approved<span className="text-red-500">*</span>
            </label>
            <RadioGroup defaultValue="no" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes1" />
                <Label htmlFor="yes1">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no1" />
                <Label htmlFor="no1">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <label className="block text-sm mb-1.5">PL Balance</label>
            <Input className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm mb-1.5">
              Assigned Delegates<span className="text-red-500">*</span>
            </label>
            <RadioGroup defaultValue="no" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes2" />
                <Label htmlFor="yes2">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no2" />
                <Label htmlFor="no2">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm mb-1.5">
              Employee Name<span className="text-red-500">*</span>
            </label>
            <Input className="w-full" />
          </div>
          <div>
            <label className="block text-sm mb-1.5">
              Employee Department URL
            </label>
            <Input className="w-full" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm mb-1.5">
            Employee Department URL
          </label>
          <textarea className="w-full border rounded-md p-2 h-24" />
        </div>

        <div className="mt-6">
          <label className="block text-sm mb-1.5">
            Employee Department URL
          </label>
          <RadioGroup defaultValue="no" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes3" />
              <Label htmlFor="yes3">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no3" />
              <Label htmlFor="no3">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

*/
