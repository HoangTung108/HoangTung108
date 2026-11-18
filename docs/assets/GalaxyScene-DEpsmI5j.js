import{j as o,a as h}from"./react-vendor-goSCRwrB.js";import{C as G,u as U,a as _}from"./react-three-ZOdezmhi.js";import{k as E,F as z,l as C}from"./three-CobOv_u-.js";const A=()=>null;function V(t){let e=t>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function R(t){return Math.sqrt(-2*Math.log(Math.max(t(),1e-4)))*Math.cos(2*Math.PI*t())}function L({reduceMotion:t,swirl:e}){const{viewport:m}=U(),c=h.useRef(null),u=Math.min(m.width*.48,m.height*.68),p=h.useMemo(()=>({pixelRatio:{value:1.5},time:{value:0},swirl:e,radius:{value:u}}),[u,e]);_(({clock:g})=>{c.current&&(c.current.uniforms.time.value=t?0:g.elapsedTime,c.current.uniforms.swirl.value=e.value)});const n=h.useMemo(()=>{const f=new Float32Array(15e3),v=new Float32Array(5e3*3),r=new Float32Array(5e3),i=new Float32Array(5e3*3),a=V(108),b=.39,x=Math.cos(b),y=Math.sin(b);for(let d=0;d<5e3;d+=1){const l=Math.pow(a(),.72),w=d%3,M=w*Math.PI*2/3+l*5.8+R(a)*.24,j=Math.cos(M)*l*u,S=Math.sin(M)*l*u*.48+R(a)*u*.025,P=d*3;i[P]=Math.pow(l,1/.72),i[P+1]=M-l*5.8,i[P+2]=R(a)*.12,f[P]=j*x-S*y,f[P+1]=j*y+S*x,f[P+2]=-1.2+Math.sin(M)*l*1.6+R(a)*.16;const F=Math.exp(-l*5);v[P]=.48+F*.5+(w===1?.12:0),v[P+1]=.62+F*.25,v[P+2]=1-F*.18,r[d]=d%41===0?5+a()*3:1+a()*1.6}const s=new E;return s.setAttribute("position",new z(f,3)),s.setAttribute("color",new z(v,3)),s.setAttribute("size",new z(r,1)),s.setAttribute("orbit",new z(i,3)),s},[u]);return h.useEffect(()=>()=>n.dispose(),[n]),o.jsx("points",{geometry:n,raycast:A,children:o.jsx("shaderMaterial",{ref:c,transparent:!0,depthWrite:!1,blending:C,uniforms:p,vertexShader:`attribute vec3 color; attribute vec3 orbit; attribute float size; varying vec3 vColor; varying float brightness; uniform float pixelRatio; uniform float time; uniform float swirl; uniform float radius;
          void main() {
            // Stars stream inward along spiral arms; the disc itself stays fixed.
            float phase = fract(orbit.x - swirl * 0.09);
            float r = pow(phase, 0.72);
            float theta = orbit.y + r * 5.8 + swirl * 0.18;
            float x = cos(theta) * r * radius;
            float y = sin(theta) * r * radius * 0.48;
            float c = cos(0.39), s = sin(0.39);
            vec3 moved = vec3(x * c - y * s, x * s + y * c,
              -1.2 + sin(theta) * r * 1.6 + orbit.z);
            float fade = smoothstep(0.0, 0.045, phase) * (1.0 - smoothstep(0.92, 1.0, phase));
            vColor = mix(color, vec3(1.0, 0.88, 0.78), exp(-r * 5.0) * 0.6);
            brightness = (0.85 + 0.15 * sin(time * 0.8 + orbit.y * 7.0)) * fade;
            vec4 p = modelViewMatrix * vec4(moved, 1.0);
            gl_Position = projectionMatrix * p;
            gl_PointSize = clamp(size * 19.0 / -p.z, 1.0, 9.0) * pixelRatio;
          }`,fragmentShader:`varying vec3 vColor; varying float brightness; void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float alpha = exp(-d * d * 3.0) * (1.0 - smoothstep(0.4, 1.0, d));
          gl_FragColor = vec4(vColor, alpha * 0.78 * brightness);
        }`})})}function k({reduceMotion:t,foreground:e=!1}){const{viewport:m}=U(),c=h.useRef(null),u=h.useMemo(()=>({time:{value:0}}),[]);_(({clock:n})=>{c.current&&(c.current.uniforms.time.value=t?0:n.elapsedTime)});const p=h.useMemo(()=>{const n=V(e?712:902),g=[],f=[],v=[];for(let i=0;i<(e?65:850);i++){const a=e?3+n()*4:-5-n()*12,b=(19-a)/19*1.15;g.push((n()-.5)*m.width*b,(n()-.5)*m.height*b,a),f.push(e?2+n()*5:i%67===0?10:1.2+n()*2.2);const x=n()>.8;v.push(x?1:.65,x?.83:.8,x?.67:1)}const r=new E;return r.setAttribute("position",new z(g,3)),r.setAttribute("size",new z(f,1)),r.setAttribute("color",new z(v,3)),r},[m.width,m.height,e]);return h.useEffect(()=>()=>p.dispose(),[p]),o.jsx("points",{geometry:p,raycast:A,children:o.jsx("shaderMaterial",{ref:c,transparent:!0,depthWrite:!1,blending:C,uniforms:u,vertexShader:`attribute float size; attribute vec3 color; uniform float time;
        varying vec3 tint; varying float brightness; varying float sparkle;
        void main() {
          tint = color; sparkle = step(8.0, size);
          float depthFade = mix(0.38, 0.82, smoothstep(-17.0, 7.0, position.z));
          brightness = depthFade * (0.85 + 0.15 * sin(time * 0.65 + position.x * 11.0));
          vec4 p = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * p;
          gl_PointSize = max(1.0, size * 28.5 / -p.z);
        }`,fragmentShader:`varying vec3 tint; varying float brightness; varying float sparkle;
        void main() {
          vec2 p = (gl_PointCoord - 0.5) * 2.0;
          float r = length(p);
          float halo = exp(-r * r * 5.0) * 0.5;
          float core = exp(-r * r * 65.0);
          float rays = (exp(-abs(p.x) * 38.0) + exp(-abs(p.y) * 38.0)) * exp(-r * 4.0) * sparkle * 0.35;
          float edge = 1.0 - smoothstep(0.65, 1.0, r);
          gl_FragColor = vec4(tint, (halo + core + rays) * edge * brightness);
        }`})})}function W(t,e,m){const c=V(m),u=Math.ceil(t.length/4),p=Math.min(1.35,e.width*.055,e.height*.07),n=Math.max(.5,e.width*.5-p-.35),g=Math.max(.5,e.height*.5-p-.45),f=Math.max(e.width*.12,-n),v=Math.min(e.width*.38,n),r=Math.min(e.height*.34,g),i=[];for(let y=0;y<u;y+=1){let s=null;for(let d=0;d<60;d+=1){const l=f+c()*(v-f),w=(c()*2-1)*r;if(s=[l,w],i.every(([M,j])=>Math.hypot(M-l,j-w)>Math.min(2.8,e.width*.12)))break}i.push(s)}const a=[],b=Array.from({length:u},()=>[]);t.forEach((y,s)=>{const d=Math.min(u-1,Math.floor(s*u/t.length)),[l,w]=i[d],M=b[d],j=p*(.25+c()*.75),S=c()*Math.PI*2,P=[l+Math.cos(S)*j,w+Math.sin(S)*j*.82,(c()-.5)*.8];a[s]=P,M.push(s)});const x=[];return b.forEach(y=>{if(y.length<2)return;const[s,d]=i[b.indexOf(y)],l=[...y].sort((w,M)=>{const j=a[w],S=a[M];return Math.atan2(j[1]-d,j[0]-s)-Math.atan2(S[1]-d,S[0]-s)});l.forEach((w,M)=>{const j=l[(M+1)%l.length];x.push(...a[w],...a[j])}),l.length>=4&&x.push(...a[l[0]],...a[l[2]])}),{positions:a,connectionPositions:new Float32Array(x)}}function T({swirl:t}){const{viewport:e}=U(),m=h.useRef(null);_(()=>{m.current&&(m.current.uniforms.swirl.value=t.value)});const c=h.useMemo(()=>({swirl:t}),[t]),u=Math.min(e.width*.48,e.height*.68);return o.jsxs("mesh",{position:[0,0,-1.5],rotation:[0,0,.39],raycast:A,children:[o.jsx("planeGeometry",{args:[u*2.3,u*1.5]}),o.jsx("shaderMaterial",{ref:m,transparent:!0,depthWrite:!1,blending:C,uniforms:c,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; uniform float swirl; void main() {
          vec2 p = (vUv - 0.5) * vec2(2.3, 3.125);
          float r = length(p);
          float angle = atan(p.y, p.x + 0.00001);
          float arms = pow(0.5 + 0.5 * cos((angle - swirl * 0.18) * 3.0 - r * 17.4), 3.0);
          float fade = 1.0 - smoothstep(0.55, 1.0, r);
          float haze = exp(-r * r * 3.5) * 0.12;
          float spiral = arms * smoothstep(0.06, 0.25, r) * 0.10;
          float core = exp(-r * r * 85.0) * (0.48 + 0.035 * sin(swirl * 4.0));
          vec3 color = mix(vec3(0.30, 0.39, 0.85), vec3(1.0, 0.83, 0.68), exp(-r * r * 35.0));
          gl_FragColor = vec4(color, (haze + spiral + core) * fade);
        }`})]})}function B({index:t,viewWidth:e,viewHeight:m}){const c=h.useRef(null),u=h.useRef(null),p=h.useMemo(()=>({opacity:{value:0}}),[]),n=h.useRef(t*2.4),g=6.5+t*1.8,f=2.8+t*.25,v=e*.72,r=-m*(.34+t*.08),i=Math.atan2(r,v),a=Math.min(e*(.23+t*.02),5.5);return _((b,x)=>{if(!c.current||document.hidden)return;n.current+=Math.min(x,.05);const y=n.current%g,s=y/f,d=y<f;c.current.visible=d,d&&(c.current.position.set(-e*(.16+t*.07)+s*v,m*(.4-t*.12)+s*r,1.7+t*.25),u.current&&(u.current.uniforms.opacity.value=Math.sin(s*Math.PI)**.6))}),o.jsx("group",{ref:c,visible:!1,rotation:[0,0,i],children:o.jsxs("mesh",{position:[-a*.42,0,0],raycast:A,children:[o.jsx("planeGeometry",{args:[a,.38]}),o.jsx("shaderMaterial",{ref:u,transparent:!0,depthWrite:!1,blending:C,uniforms:p,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; uniform float opacity; void main() {
            float along = vUv.x;
            float width = mix(0.19, 0.045, along);
            float crossTail = exp(-pow((vUv.y - 0.5) / width, 2.0));
            float tail = pow(along, 1.25) * (1.0 - smoothstep(0.91, 1.0, along)) * crossTail;
            vec2 headUV = (vUv - vec2(0.92, 0.5)) * vec2(15.0, 3.0);
            float head = exp(-dot(headUV, headUV) * 18.0);
            vec3 color = mix(vec3(0.30, 0.55, 1.0), vec3(0.92, 0.97, 1.0), along);
            float halo = exp(-dot(headUV, headUV) * 2.5) * 0.22;
            gl_FragColor = vec4(color, (tail * 0.85 + head + halo) * opacity);
          }`})]})})}function I({repositories:t,positions:e,selectedRepository:m,previewRepository:c,onSelect:u,onPreview:p}){var v;const n=(v=c||m)==null?void 0:v.id,g=h.useMemo(()=>{const r=new E;return r.setAttribute("position",new z(e.flat(),3)),r.setAttribute("size",new z(t.map(i=>55+Math.min(Math.log2((i.stargazers_count??0)+1)*4,20)),1)),r.setAttribute("highlighted",new z(t.map(i=>i.id===n?1:0),1)),r},[e,t,n]);h.useEffect(()=>()=>g.dispose(),[g]),h.useEffect(()=>()=>{document.body.style.cursor=""},[]);const f=r=>{if(r.pointerType==="touch")return;r.stopPropagation();const i=t[r.index];i&&(document.body.style.cursor="pointer",p(i))};return o.jsx("points",{geometry:g,onPointerOver:f,onPointerMove:f,onPointerOut:r=>{const i=r.intersections.find(a=>a.object===r.object);i&&r.pointerType!=="touch"?p(t[i.index]||null):(document.body.style.cursor="",p(null))},onClick:r=>{r.stopPropagation(),t[r.index]&&u(t[r.index])},children:o.jsx("shaderMaterial",{transparent:!0,depthWrite:!1,blending:C,vertexShader:`attribute float size; attribute float highlighted; varying float highlight;
        void main() { highlight = highlighted; vec4 p = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * p; gl_PointSize = size * (1.0 + highlighted * 0.55) * (19.0 / -p.z); }`,fragmentShader:`varying float highlight; void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float glow = exp(-d * d * 4.5);
        float core = exp(-d * d * 55.0);
        vec3 color = mix(vec3(0.48, 0.78, 1.0), vec3(1.0), min(1.0, core + highlight * 0.3));
        gl_FragColor = vec4(color, glow * (0.85 + highlight * 0.35) + core);
      }`})})}function D(){const{viewport:t}=U();return o.jsxs("mesh",{position:[t.width*.2,0,-4],raycast:A,children:[o.jsx("planeGeometry",{args:[t.width*1.1,t.height*1.2]}),o.jsx("shaderMaterial",{transparent:!0,depthWrite:!1,blending:C,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; void main() {
        vec2 p = vUv - 0.5;
        float ribbon = p.y - p.x * 0.4 + sin(p.x * 9.0) * 0.065;
        float clouds = exp(-ribbon * ribbon * 48.0);
        float lane = 1.0 - exp(-pow(ribbon + 0.025, 2.0) * 900.0) * 0.85;
        float wisps = 0.65 + 0.35 * sin(p.x * 23.0 + sin(p.y * 17.0));
        float edge = (1.0 - smoothstep(0.2, 0.5, abs(p.x))) * (1.0 - smoothstep(0.2, 0.5, abs(p.y)));
        vec3 color = mix(vec3(0.18, 0.38, 0.65), vec3(0.48, 0.22, 0.62), smoothstep(-0.3, 0.3, p.x));
        gl_FragColor = vec4(color, clouds * lane * wisps * edge * 0.15);
      }`})]})}function H({repositories:t,selectedRepository:e,previewRepository:m,onSelect:c,onPreview:u,reduceMotion:p}){const{viewport:n,invalidate:g}=U(),f=h.useRef(null),v=h.useRef(null),r=h.useRef(null),i=h.useMemo(()=>({value:0}),[]),a=h.useRef({x:0,y:0}),b=h.useRef(108),x=h.useMemo(()=>W(t,n,b.current),[t,n.width,n.height]),y=h.useMemo(()=>{const s=new E;return s.setAttribute("position",new z(x.connectionPositions,3)),s},[x.connectionPositions]);return h.useEffect(()=>()=>y.dispose(),[y]),h.useEffect(()=>{if(p)return;const s=l=>{a.current.x=l.clientX/window.innerWidth*2-1,a.current.y=l.clientY/window.innerHeight*2-1},d=()=>{document.hidden||g()};return window.addEventListener("pointermove",s,{passive:!0}),document.addEventListener("visibilitychange",d),g(),()=>{window.removeEventListener("pointermove",s),document.removeEventListener("visibilitychange",d)}},[g,p]),_((s,d)=>{if(!f.current||p||document.hidden)return;i.value+=Math.min(d,.05)*.225;const l=1-Math.exp(-Math.min(d,.05)*2.5);f.current.rotation.y+=(a.current.x*.035-f.current.rotation.y)*l,f.current.rotation.x+=(-a.current.y*.025-f.current.rotation.x)*l;for(const[w,M]of[[v.current,.08],[r.current,.48]])w&&(w.position.x+=(-a.current.x*M-w.position.x)*l,w.position.y+=(a.current.y*M-w.position.y)*l);s.invalidate()}),o.jsxs(o.Fragment,{children:[o.jsxs("group",{ref:v,children:[o.jsx(k,{reduceMotion:p}),o.jsx(D,{})]}),o.jsxs("group",{ref:f,children:[o.jsxs("group",{position:[n.width*.24,n.height*.04,0],children:[o.jsx(L,{reduceMotion:p,swirl:i}),o.jsx(T,{swirl:i})]}),!p&&[0,1,2].map(s=>o.jsx(B,{index:s,viewWidth:n.width,viewHeight:n.height},s)),x.connectionPositions.length>0&&o.jsx("lineSegments",{geometry:y,raycast:A,children:o.jsx("lineBasicMaterial",{color:"#b9e8ff",transparent:!0,opacity:.55,blending:C,depthWrite:!1})}),o.jsx(I,{repositories:t,positions:x.positions,selectedRepository:e,previewRepository:m,onSelect:c,onPreview:u})]}),o.jsx("group",{ref:r,children:o.jsx(k,{reduceMotion:p,foreground:!0})})]})}function O({repositories:t,selectedRepository:e,previewRepository:m,onSelect:c,onPreview:u,onBackgroundClick:p,reduceMotion:n,onUnavailable:g}){return o.jsx(G,{className:"galaxy-canvas",camera:{position:[0,0,19],fov:52},dpr:1.5,raycaster:{params:{Points:{threshold:.42}}},fallback:o.jsx("span",{className:"sr-only",children:"3D unavailable. Use the project list."}),onCreated:({gl:f})=>{f.domElement.addEventListener("webglcontextlost",g,{once:!0})},frameloop:"demand",gl:{alpha:!0,antialias:!1,powerPreference:"high-performance",stencil:!1,depth:!0,preserveDrawingBuffer:!1},performance:{min:.55},onPointerMissed:p,children:o.jsx(H,{repositories:t,selectedRepository:e,previewRepository:m,onSelect:c,onPreview:u,reduceMotion:n})})}export{O as default};
