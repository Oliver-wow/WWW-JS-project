import './index.css'
import Header from "./components/Header"
import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, Controls, Background, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EntityNode from './components/Entity';

import EditEntity from './components/EditEntity';

const size = 100;

const initialNodes = localStorage.getItem("entities")===null ? [] : JSON.parse(localStorage.getItem("entities"))

const entityOrderLoad = localStorage.getItem("entityOrder")===null ? [] : JSON.parse(localStorage.getItem("entityOrder"))

const playingIndexLoad = localStorage.getItem("playingIndex")===null ? 0 : JSON.parse(localStorage.getItem("playingIndex"))

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

  const [entityOrder, setEntityOrder] = useState(entityOrderLoad)
  const [playingIndex, setPlayingIndex] = useState(playingIndexLoad) //the index of the node in entityOrder that is playing

  function startBattle(){
    let iniSet = true; //initiative is set for all entities
    nodes.forEach(node=>{if(!/^-*\d+$/.test(node.data.initiative)) iniSet=false})
    if (!iniSet){
      window.alert("At least one initiative values isn't set or is set incorrectly.\nIn order to start the battle you must set the initiative of all entities to a number.")
      return;
    }
    const sorted = nodes.sort((a,b)=>(Number(a.data.initiative) < Number(b.data.initiative)) ? 1 : (Number(b.data.initiative)<Number(a.data.initiative)) ? -1 : 0)
    setEntityOrder(sorted)

    //have to put this here so that it's easier to execute this
    setNodes(prevNodes=>{
      return prevNodes.map(node=>{
        if(node.id === sorted[playingIndex].id){
          return{
            ...node,
            data:{
              ...node.data,
              selected: true
            }
          }
        }
        else{
          return node
        }
      })
    })
    setPlayingIndex(prev=>prev+=1)
  }

  useEffect(()=>{localStorage.setItem("entityOrder", JSON.stringify(entityOrder))},[entityOrder])
  useEffect(()=>{localStorage.setItem("playingIndex", JSON.stringify(playingIndex))},[playingIndex])

  function highlightNextEntity(){
    setNodes(prevNodes=>{
      return prevNodes.map(node=>{
        if(node.id === entityOrder[(playingIndex-1+prevNodes.length)%prevNodes.length].id){
          return{
            ...node,
            data:{
              ...node.data,
              selected: false
            }
          }
        }
        else if(node.id === entityOrder[playingIndex%nodes.length].id){
          return{
            ...node,
            data:{
              ...node.data,
              selected: true
            }
          }
        }
        else{
          return node
        }
      })
    })
    setPlayingIndex(prev=>prev+=1)
  }
 
  return (
    <>
      <Header setNodes={setNodes} 
              nodes={nodes} 
              size={size} 
              setOpen={setOpen} 
              setDialogEntityId={setDialogEntityId} 
              disabled={entityOrder.length>=1}
              setEntityOrder={setEntityOrder}
              setPlayingIndex={setPlayingIndex}/>
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
      {nodes.length>=2 && !(entityOrder.length>=1) &&<button className="StartBattle" onClick={()=>startBattle()}>Start Battle</button>}
      {entityOrder.length>=1 && <button className='NextCreature' onClick={()=>highlightNextEntity()}>Next creature</button>}
    </>
  );
}