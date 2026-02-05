"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IconGripVertical,
  IconDotsVertical,
  IconCircleCheckFilled,
  IconLoader,
} from "@tabler/icons-react";

import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

// Drag handle for rows
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="hover:bg-transparent"
    >
      <IconGripVertical />
      <span className="sr-only">Drag</span>
    </Button>
  );
}

// Table columns
const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => <DrawerCell item={row.original} />,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.status === "Done" ? (
          <IconCircleCheckFilled />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => <Input defaultValue={row.original.target} />,
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => <Input defaultValue={row.original.limit} />,
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) =>
      row.original.reviewer !== "Assign reviewer" ? (
        row.original.reviewer
      ) : (
        <Select defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="Assign reviewer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
            <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
          </SelectContent>
        </Select>
      ),
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <IconDotsVertical />
      </Button>
    ),
  },
];

// Sortable row component
function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="data-[dragging=true]:opacity-80"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// Drawer for inline editing
function DrawerCell({ item }: { item: z.infer<typeof schema> }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link">{item.header}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{item.header}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4">
          <Input defaultValue={item.header} />
          <Select defaultValue={item.type}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Table of Contents">
                Table of Contents
              </SelectItem>
              <SelectItem value="Executive Summary">
                Executive Summary
              </SelectItem>
            </SelectContent>
          </Select>
          <Input defaultValue={item.target} />
          <Input defaultValue={item.limit} />
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Main DataTable
export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(initialData);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
  });

  const dataIds = data.map((d) => d.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) return;
    const oldIndex = dataIds.indexOf(active.id as number);
    const newIndex = dataIds.indexOf(over.id as number);
    if (oldIndex !== newIndex) setData(arrayMove(data, oldIndex, newIndex));
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <SortableContext
            items={dataIds}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}
