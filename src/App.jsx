import './index.css'
import Header from "./components/Header"
import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, Controls, Background, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EntityNode from './components/Entity';

import EditEntity from './components/EditEntity';

const size = 100;

const initialNodes = localStorage.getItem("entities")==null ? [] : JSON.parse(localStorage.getItem("entities"))

const nodeTypes = { entity : EntityNode }

export default function Main() {
  const [nodes, setNodes] = useState(initialNodes);
  const [open,setOpen] = useState(false);
  const [dialogEntityId,setDialogEntityId] = useState(0);

  useEffect(()=>{ //saves the locations of the nodes
    localStorage.setItem("entities", JSON.stringify(nodes))
  },[nodes])

  useEffect(()=>{ //on first load it gets the nodes from the local storage and then adds the setOpen
    setNodes(prevNodes=>{return prevNodes.map(node => { //this adds the setOpen function back into the nodes bc JSON can't save it
        return {
          ...node,
          data: {
            ...node.data,
            setOpen: setOpen,
            setDialogEntityId: setDialogEntityId,
          }
        }
    })})
  },[])

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
    },
    [],
  );
 
  return (
    <>
      <Header setNodes={setNodes} nodes={nodes} size={size} setOpen={setOpen} setDialogEntityId={setDialogEntityId}/>
      <div id="ReactFlowContainer">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          fitView
        >
          <Controls showInteractive={false}/>
          <Background variant="dots" gap={50} size={1} />
        </ReactFlow>
      </div>
      {open && <EditEntity open={open} setOpen={setOpen} entityId={dialogEntityId} nodes={nodes} setNodes={setNodes}/>}
    </>
  );
}