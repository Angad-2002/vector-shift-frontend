// draggableNode.js
// Enhanced draggable node with refined styling from starter kit

import * as Tooltip from '@radix-ui/react-tooltip';

export const DraggableNode = ({ type, label, icon: Icon, iconOnly = false }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    if (iconOnly) {
      return (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-dark-300 border border-dark-200 cursor-grab active:cursor-grabbing transition-all duration-200 hover:bg-dark-300/80 hover:border-teal-600/50 hover:ring-2 hover:ring-teal-600/30 active:scale-95 group"
                onDragStart={(event) => onDragStart(event, type)}
                onDragEnd={(event) => (event.target.style.cursor = 'grab')}
                draggable
              >
                {Icon && (
                  <Icon className="w-6 h-6 text-teal-600 group-hover:scale-110 transition-transform" />
                )}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-dark-300 border border-teal-600/30 rounded-lg px-3 py-1.5 text-xs text-text-primary shadow-lg z-50 backdrop-blur-xl"
                side="right"
                sideOffset={8}
              >
                {label} Node
                <Tooltip.Arrow className="fill-dark-300" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    }

    return (
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-dark-300 border border-dark-200 text-text-primary text-sm font-medium cursor-grab active:cursor-grabbing transition-all duration-200 hover:bg-dark-300/80 hover:border-teal-600/50 hover:ring-2 hover:ring-teal-600/30 active:scale-98"
              onDragStart={(event) => onDragStart(event, type)}
              onDragEnd={(event) => (event.target.style.cursor = 'grab')}
              draggable
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-dark-200 border border-dark-100 shrink-0">
              {Icon && (
                  <Icon className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
              )}
              </div>
              <span className="flex-1 text-sm leading-tight">{label}</span>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="bg-dark-300 border border-teal-600/30 rounded-lg px-3 py-1.5 text-xs text-text-primary shadow-lg z-50 backdrop-blur-xl"
              side="right"
              sideOffset={8}
            >
              {label} Node
              <Tooltip.Arrow className="fill-dark-300" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  };
  