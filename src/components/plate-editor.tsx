'use client';

import React, { useRef } from 'react';
import { Plate } from '@udecode/plate-common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { clsxm } from '@/lib/helper';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { pluginsEditor } from '@/lib/plate/plate-plugins';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';

export default function PlateEditor({
  value,
  onChange,
  ...props
}: {
  value: [];
  onChange: (value: []) => void;
}) {
  const containerRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        plugins={pluginsEditor}
        value={value}
        onChange={onChange}
        {...props}
      >
        <div
          ref={containerRef}
          className={clsxm(
            // Block selection
            '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
          )}
        >
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>

          <Editor
            className="px-[96px] py-16"
            autoFocus
            focusRing={false}
            variant="ghost"
            size="md"
          />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>

          <MentionCombobox items={MENTIONABLES} />

          <CursorOverlay containerRef={containerRef} />
        </div>
      </Plate>
    </DndProvider>
  );
}
