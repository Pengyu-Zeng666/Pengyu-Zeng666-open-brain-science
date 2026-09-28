"use client";
import {useState} from 'react';
import data from './catalog.json';

type Resource=typeof data[number];
const fmt=(n:number)=>n.toLocaleString('en-US');
const missing=(v:unknown)=>v==null?'Not reported':String(v);

// Hover tooltip shared by both charts; values are also printed next to each bar.
function useTip(){
  const [tip,setTip]=useState<{x:number,y:number,text:string}|null>(null);
  const bind=(text:string)=>({
    onMouseMove:(e:React.MouseEvent)=>{const box=(e.currentTarget.closest('.viz') as HTMLElement).getBoundingClientRect();setTip({x:e.clientX-box.left,y:e.clientY-box.top,text});},
    onMouseLeave:()=>setTip(null),
    'aria-label':text,
  });
  const node=tip&&<div className="viz-tip" style={{left:tip.x,top:tip.y}}>{tip.text}</div>;
  return {bind,node};
}

function Participants({rows}:{rows:Resource[]}){
  const {bind,node}=useTip();
  const max=Math.max(1,...rows.map(r=>r.total??0));
  return <section className="viz">
    <h3>Participants</h3>
    <p className="fine">Total sample size reported in the source.</p>
    <div className="bars">{rows.map(r=><div className="bar-row" key={r.id}>
      <span className="bar-label" title={r.name}>{r.name}</span>
      {r.total==null
        ?<span className="bar-none">Not reported</span>
        :<span className="bar-track"><span className="bar-area"><span className="bar-fill" style={{width:`calc((100% - 56px) * ${r.total/max})`}} {...bind(`${r.name}: ${fmt(r.total)} participants`)}/><span className="bar-value">{fmt(r.total)}</span></span></span>}
    </div>)}</div>
    {node}
  </section>;
}

function SexSplit({rows}:{rows:Resource[]}){
  const {bind,node}=useTip();
  return <section className="viz">
    <h3>Sex composition</h3>
    <div className="legend"><span><i className="sw male"/>Male</span><span><i className="sw female"/>Female</span></div>
    <div className="bars">{rows.map(r=>{
      const known=r.male!=null&&r.female!=null;const sum=known?r.male!+r.female!:0;
      return <div className="bar-row" key={r.id}>
        <span className="bar-label" title={r.name}>{r.name}</span>
        {!known||sum===0
          ?<span className="bar-none">Not reported</span>
          :<span className="bar-track">
            <span className="stack">
              {r.male!>0&&<span className="seg male" style={{flexGrow:r.male!}} {...bind(`${r.name}: ${fmt(r.male!)} male (${Math.round(r.male!/sum*100)}%)`)}/>}
              {r.female!>0&&<span className="seg female" style={{flexGrow:r.female!}} {...bind(`${r.name}: ${fmt(r.female!)} female (${Math.round(r.female!/sum*100)}%)`)}/>}
            </span>
            <span className="bar-value">{fmt(r.male!)} M · {fmt(r.female!)} F</span>
          </span>}
        {known&&r.total!=null&&sum!==r.total&&<span className="bar-note">⚠ Sex counts add up to {fmt(sum)}, not the reported {fmt(r.total)}.</span>}
      </div>;})}</div>
    {node}
  </section>;
}

export default function CompareView({ids,onRemove}:{ids:number[],onRemove:(id:number)=>void}){
  const rows=data.filter(r=>ids.includes(r.id));
  if(!rows.length)return <p className="fine">Select up to three resources in Explore or from an AI recommendation.</p>;
  const facts:[string,(r:Resource)=>React.ReactNode][]=[
    ['Type',r=>r.type],
    ['Year',r=>r.year],
    ['Population',r=>r.population],
    ['Age',r=>missing(r.age)],
    ['Access in source',r=>missing(r.access)],
    ['Paper',r=><a href={r.doi} target="_blank" rel="noreferrer">Read paper ↗</a>],
  ];
  return <div className="compare">
    <div className="table-wrap"><table className="facts">
      <thead><tr><th/>{rows.map(r=><th key={r.id} scope="col">{r.name}<button className="remove" onClick={()=>onRemove(r.id)} aria-label={`Remove ${r.name}`}>×</button></th>)}</tr></thead>
      <tbody>{facts.map(([label,get])=><tr key={label}><th scope="row">{label}</th>{rows.map(r=><td key={r.id}>{get(r)}</td>)}</tr>)}</tbody>
    </table></div>
    <div className="viz-grid"><Participants rows={rows}/><SexSplit rows={rows}/></div>
  </div>;
}
