const x = 250, y = 50;

const handleClick = (e: any) => {
    console.log(JSON.stringify(e, null, 2));
};

export const portfolio = [
    {
        name: 'Undisclosed',
        type: 'Fintech',
        initialNodes: [
            {
                id: 0,
                position: { x: x + 250, y: y + 50 },
                data: { label: 'Client (React, Svelte)' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick
            },
            {
                id: 1,
                position: { x: x + 250, y: y + 150 },
                data: { label: 'API (Rest API)' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick
            },
            {
                id: 2,
                position: { x: x + 250, y: y + 250 },
                data: { label: 'Service n' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick,
                sourcePosition: 'bottom'
            },
            {
                id: 3,
                position: { x: x + 250, y: y + 350 },
                data: { label: 'Postgresql database' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick
            },
            {
                id: 4,
                position: { x: x + 500, y: y + 275 },
                data: { label: 'Third party banking API 1' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick,
                targetPosition: 'left'
            },
            {
                id: 5,
                position: { x: x + 500, y: y + 375 },
                data: { label: 'Third party API 2' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick,
                targetPosition: 'left'
            }
        ],
        initialEdges: [
            { id: 'e0-1', source: 0, target: 1, label: 'edge label', animate: true },
            { id: 'e1-2', source: 1, target: 2, label: 'edge label' },
            { id: 'e2-3', source: 2, target: 3, label: 'edge label' },
            { id: 'e3-4', source: 2, target: 4 },
            { id: 'e4-5', source: 2, target: 5 }
        ]
    },
    {
        name: 'Undisclosed',
        type: 'Tourism',
        initialNodes: [
            {
                id: 1,
                position: { x: x + 250, y: y + 50 },
                data: { label: 'Input Node' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick
            },
            {
                id: 2,
                position: { x: x + 250, y: y + 150 },
                data: { label: 'Default Node' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick
            },
            {
                id: 3,
                position: { x: x + 250, y: y + 250 },
                data: { label: 'Output Node' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick
            },
            {
                id: 4,
                position: { x: x + 450, y: y + 150 },
                data: { label: 'Output Node' },
                width: 175,
                height: 40,
                bgColor: 'white',
                clickCallback: handleClick
            }
        ],
        initialEdges: [
            { id: 'e1-2', source: 1, target: 2, label: 'edge label' },
            { id: 'e2-3', source: 2, target: 3, label: 'edge label' },
            { id: 'e3-4', source: 2, target: 4 }
        ]
    }
];