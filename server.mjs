import http from 'node:http';
import {createHash,timingSafeEqual} from 'node:crypto';
import {createReadStream} from 'node:fs';
import {stat,realpath} from 'node:fs/promises';
import path from 'node:path';
const root=await realpath('dist');
const user=process.env.SITE_USER || 'owner';
const password=process.env.SITE_PASSWORD;
const hash=s=>createHash('sha256').update(s).digest();
const expected=password?hash(`${user}:${password}`):null;
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.mp4':'video/mp4','.json':'application/json'};
http.createServer(async(req,res)=>{
 res.setHeader('Cache-Control','private, no-store');
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('X-Robots-Tag','noindex, nofollow');
 if(req.url==='/healthz'){res.writeHead(200);return res.end('ok');}
 if(!expected){res.writeHead(503);return res.end('Private library is not configured.');}
 const header=req.headers.authorization||'';
 let provided='';
 if(header.startsWith('Basic '))provided=Buffer.from(header.slice(6),'base64').toString('utf8');
 if(!timingSafeEqual(hash(provided),expected)){
  res.writeHead(401,{'WWW-Authenticate':'Basic realm="Private build library", charset="UTF-8"'});return res.end('Sign in required.');
 }
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
 try{
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(name.endsWith('/'))name+='index.html';
  const file=await realpath(path.join(root,name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  const info=await stat(file);if(!info.isFile())throw new Error('not a file');
  const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
  let start=0,end=info.size-1,status=200;
  if(req.headers.range){
   const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});return res.end();}
   if(!m[1])start=Math.max(0,info.size-Number(m[2]));
   else {start=Number(m[1]);if(m[2])end=Math.min(end,Number(m[2]));}
   if(start>end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});return res.end();}
   status=206;headers['Content-Range']=`bytes ${start}-${end}/${info.size}`;
  }
  headers['Content-Length']=end-start+1;res.writeHead(status,headers);
  if(req.method==='HEAD')return res.end();
  createReadStream(file,{start,end}).on('error',()=>res.destroy()).pipe(res);
 }catch{if(!res.headersSent)res.writeHead(404);res.end('Not found.');}
}).listen(Number(process.env.PORT||3000),'0.0.0.0');
