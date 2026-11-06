'use client';
import {useState} from 'react';
import {Download, FileText} from 'lucide-react';
import {Button} from '@/components/ui/button';

type FontFile={name:string;path:string;type:string;size:number};
const url=(path:string)=>'/files/'+path.split('/').map(encodeURIComponent).join('/');
export function FontLibrary({files}:{files:FontFile[]}){
 const [style,setStyle]=useState('All styles');
 const [preview,setPreview]=useState('Build something great.');
 const fonts=files.filter(f=>f.type==='TTF');
 const visible=fonts.filter(f=>style==='All styles'||f.path.split('/')[1]===style);
 return <div className="font-library">
 <div className="notice"><FileText size={20}/><p>Download a font, install the TTF file on your computer, then select it in your design app. The category ZIP includes font licenses and available static weights. <a href={url('Fonts/Font Guide.pdf')} download>Download the font guide</a></p></div>
 <div className="library-top"><div className="search-box"><input aria-label="Font preview text" maxLength={100} placeholder="Type your own preview…" value={preview} onChange={e=>setPreview(e.target.value)}/></div><select aria-label="Font style" value={style} onChange={e=>setStyle(e.target.value)}>{['All styles','Clean','Gaming','Headline'].map(s=><option key={s}>{s}</option>)}</select></div>
 <div className="font-grid">{visible.map(f=>{const index=fonts.indexOf(f);const family='LibraryFont'+index;const directory=f.path.slice(0,f.path.lastIndexOf('/'));return <article className="asset-card" key={f.path}>
 <style>{`@font-face{font-family:'${family}';src:url('${url(f.path)}') format('truetype');font-display:swap;}`}</style>
 <div className="font-sample" style={{fontFamily:`'${family}',sans-serif`}}>{preview.trim()||'Build something great.'}</div>
 <div className="asset-info"><h3>{f.name}</h3><p>{f.path.split('/')[1]} · {f.path.includes('VariableFont')?'Variable font':'Regular'} · {Math.ceil(f.size/1024)} KB</p><Button variant="outline" size="sm" asChild><a href={url(f.path)} download><Download/> Download TTF</a></Button><a className="font-license" href={url(directory+'/OFL.txt')} download>Download license</a></div>
 </article>})}</div>
 {visible.length===0&&files.every(f=>f.type==='TTF')&&<div className="empty"><h2>No matching fonts</h2><p>Try another search, file type, or font style.</p><Button variant="outline" onClick={()=>setStyle('All styles')}>Show all styles</Button></div>}
 {files.filter(f=>f.type!=='TTF').map(f=><div className="panel" key={f.path}><h3>{f.name}</h3><Button variant="outline" size="sm" asChild><a href={url(f.path)} download><Download/> Download {f.type}</a></Button></div>)}
 </div>
}
