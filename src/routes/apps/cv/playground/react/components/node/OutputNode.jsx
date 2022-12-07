import React, { memo, useCallback } from 'react';
import { StringCodec } from 'nats.ws';
import { Handle, Position } from 'reactflow';

function OutputNode({ data }) {
	const sc = StringCodec();

  const onChange = useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  const editNode = useCallback((value, viewUpdate) => {
    console.log('playground.context');
		window.nc.request('playground.context', sc.encode(JSON.stringify(data))).then((response) => {
			const valueResult = JSON.parse(sc.decode(response?.data));
		});
  }, []);

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400" onClick={editNode}>
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.description}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
}

export default memo(OutputNode);
