"use client";
import {Button} from '@/components/ui/button';
import Contribute from './contribute';
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';

// Planned directions only; none of these ship in the current version.
const plans=[
  {title:'Monthly automatic updates',body:'An AI agent searches for newly published neuroimaging databases every month and adds them to the catalog automatically.'},
  {title:'AI-managed catalog with RAG',body:'Retrieval-augmented generation lets AI organise, search and maintain the database, grounding every answer in the stored records and source papers.'},
  {title:'Local models for privacy',body:'Train and run models on local hardware, so research needs and data never leave your own environment.'},
  {title:'An AI agent for beginners',body:'A guided AI agent teaches newcomers step by step how to find, access and use each database.'},
];

export default function Roadmap(){
  return <Dialog>
    <DialogTrigger asChild><Button variant="outline" size="sm">Roadmap</Button></DialogTrigger>
    <DialogContent className="roadmap max-h-[90vh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Future directions</DialogTitle>
        <DialogDescription>Where Open Brain Science is heading. These features are planned and not yet available.</DialogDescription>
      </DialogHeader>
      <ol>{plans.map((p,i)=><li key={p.title}><span className="step">{i+1}</span><div><h3>{p.title}</h3><p>{p.body}</p></div></li>)}</ol>
      <Contribute/>
    </DialogContent>
  </Dialog>;
}
