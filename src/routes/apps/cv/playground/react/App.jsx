import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, ReactFlowProvider } from 'reactflow';

import 'reactflow/dist/base.css';

import InputNode from './components/node/InputNode';
import DefaultNode from './components/node/DefaultNode';
import OutputNode from './components/node/OutputNode';
import Sidebar from './Sidebar';

import './app.css';

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
};

const initNodes = [
  {
    id: '1',
    type: 'default',
    data: { 
      id: crypto.randomUUID(),
      name: 'Add',
      description: 'Click to edit',
      emoji: '😎',
      code: `// Add node
((a, b) => {
	return {
		topic: "Add",
		payload: a + b
	}
})

(5, 5)`,
    },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'default',
    data: {
      id: crypto.randomUUID(),
      name: 'Multiply',
      description: 'Click to edit',
      emoji: '🤓',
      code: `// Multiply node
((a, b) => {
	return {
		topic: "Multiply",
		payload: a * b
	}
})

(5, 5)`
  },

    position: { x: -200, y: 200 },
  },
  {
    id: '3',
    type: 'default',
    data: {
      id: crypto.randomUUID(),
      name: 'Substract',
      description: 'Click to edit',
      emoji: '🤩',
      code: `// Substract node
((a, b) => {
	return {
		topic: "Substract",
		payload: a - b
	}
})

(5, 5)`
  },
    position: { x: 200, y: 200 },
  },
];

const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;