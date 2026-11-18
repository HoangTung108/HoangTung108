import{j as o,a}from"./react-vendor-goSCRwrB.js";import{C as O,u as L,a as T}from"./react-three-ZOdezmhi.js";import{k as B,F as C,l as k}from"./three-CobOv_u-.js";function D(t){let i=t>>>0;return()=>(i=i*1664525+1013904223>>>0,i/4294967296)}function q(t,i,s,p){const c=t.length;if(!c)return{positions:[],connectionPositions:new Float32Array,spacing:1/0};const g=D(p),e=Math.min(30,s.width*.04,s.height*.06),d=s.width*.52+e,f=s.width-e,m=Math.min(100,s.height*.2),u=s.height-e,n=Math.max(0,f-d),l=Math.max(0,u-m);let h=1,x=-1/0;for(let v=1;v<=c;v+=1){const r=Math.ceil(c/v),A=v>1?n/(v-1):1/0,E=r>1?l/(r-1):1/0,V=Math.min(A,E);V>x&&(h=v,x=V)}const z=Math.ceil(c/h),y=h>1?n/(h-1):0,b=z>1?l/(z-1):0,w=Math.min(80,s.width*.145),P=Math.min(.48,Math.max(0,1-w/x)),M=t.map((v,r)=>{const A=Math.floor(r/h),E=Math.min(h,c-A*h),V=r%h,j=(h-E)/2+(A%2?E-1-V:V),U=h>1?d+j*y:(d+f)/2,I=z>1?m+A*b:(m+u)/2,W=(g()-.5)*y*P,F=(g()-.5)*b*P,R=Math.max(d,Math.min(f,U+W)),X=Math.max(m,Math.min(u,I+F));return[R/s.width*i.width-i.width/2,i.height/2-X/s.height*i.height,0]}),S=[],_=new Set(M.map((v,r)=>r));for(;_.size;){const v=_.values().next().value;_.delete(v);const r=[M[v]];for(;r.length<4&&_.size;){const j=r.reduce((F,R)=>F+R[0],0)/r.length,U=r.reduce((F,R)=>F+R[1],0)/r.length;let I,W=1/0;for(const F of _){const R=M[F],X=Math.hypot(R[0]-j,R[1]-U);X<W&&(I=F,W=X)}_.delete(I),r.push(M[I])}if(r.length<2)continue;const A=r.reduce((j,U)=>j+U[0],0)/r.length,E=r.reduce((j,U)=>j+U[1],0)/r.length;r.sort((j,U)=>Math.atan2(j[1]-E,j[0]-A)-Math.atan2(U[1]-E,U[0]-A));const V=r.length===2?1:r.length;for(let j=0;j<V;j+=1)S.push(...r[j],...r[(j+1)%r.length]);r.length===4&&S.push(...r[0],...r[2])}return{positions:M,connectionPositions:new Float32Array(S),spacing:x*(1-P)}}const G=()=>null;function Y(t){return Math.sqrt(-2*Math.log(Math.max(t(),1e-4)))*Math.cos(2*Math.PI*t())}function H({reduceMotion:t,swirl:i}){const{viewport:s}=L(),p=a.useRef(null),c=Math.min(s.width*.48,s.height*.68),g=a.useMemo(()=>({pixelRatio:{value:1.5},time:{value:0},swirl:i,radius:{value:c}}),[c,i]);T(({clock:d})=>{p.current&&(p.current.uniforms.time.value=t?0:d.elapsedTime,p.current.uniforms.swirl.value=i.value)});const e=a.useMemo(()=>{const f=new Float32Array(15e3),m=new Float32Array(5e3*3),u=new Float32Array(5e3),n=new Float32Array(5e3*3),l=D(108),h=.39,x=Math.cos(h),z=Math.sin(h);for(let b=0;b<5e3;b+=1){const w=Math.pow(l(),.72),P=b%3,M=P*Math.PI*2/3+w*5.8+Y(l)*.24,S=Math.cos(M)*w*c,_=Math.sin(M)*w*c*.48+Y(l)*c*.025,v=b*3;n[v]=Math.pow(w,1/.72),n[v+1]=M-w*5.8,n[v+2]=Y(l)*.12,f[v]=S*x-_*z,f[v+1]=S*z+_*x,f[v+2]=-1.2+Math.sin(M)*w*1.6+Y(l)*.16;const r=Math.exp(-w*5);m[v]=.48+r*.5+(P===1?.12:0),m[v+1]=.62+r*.25,m[v+2]=1-r*.18,u[b]=b%41===0?5+l()*3:1+l()*1.6}const y=new B;return y.setAttribute("position",new C(f,3)),y.setAttribute("color",new C(m,3)),y.setAttribute("size",new C(u,1)),y.setAttribute("orbit",new C(n,3)),y},[c]);return a.useEffect(()=>()=>e.dispose(),[e]),o.jsx("points",{geometry:e,raycast:G,children:o.jsx("shaderMaterial",{ref:p,transparent:!0,depthWrite:!1,blending:k,uniforms:g,vertexShader:`attribute vec3 color; attribute vec3 orbit; attribute float size; varying vec3 vColor; varying float brightness; uniform float pixelRatio; uniform float time; uniform float swirl; uniform float radius;
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
        }`})})}function N({reduceMotion:t,foreground:i=!1}){const{viewport:s}=L(),p=a.useRef(null),c=a.useMemo(()=>({time:{value:0}}),[]);T(({clock:e})=>{p.current&&(p.current.uniforms.time.value=t?0:e.elapsedTime)});const g=a.useMemo(()=>{const e=D(i?712:902),d=[],f=[],m=[];for(let n=0;n<(i?65:850);n++){const l=i?3+e()*4:-5-e()*12,h=(19-l)/19*1.15;d.push((e()-.5)*s.width*h,(e()-.5)*s.height*h,l),f.push(i?2+e()*5:n%67===0?10:1.2+e()*2.2);const x=e()>.8;m.push(x?1:.65,x?.83:.8,x?.67:1)}const u=new B;return u.setAttribute("position",new C(d,3)),u.setAttribute("size",new C(f,1)),u.setAttribute("color",new C(m,3)),u},[s.width,s.height,i]);return a.useEffect(()=>()=>g.dispose(),[g]),o.jsx("points",{geometry:g,raycast:G,children:o.jsx("shaderMaterial",{ref:p,transparent:!0,depthWrite:!1,blending:k,uniforms:c,vertexShader:`attribute float size; attribute vec3 color; uniform float time;
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
        }`})})}function J({swirl:t}){const{viewport:i}=L(),s=a.useRef(null);T(()=>{s.current&&(s.current.uniforms.swirl.value=t.value)});const p=a.useMemo(()=>({swirl:t}),[t]),c=Math.min(i.width*.48,i.height*.68);return o.jsxs("mesh",{position:[0,0,-1.5],rotation:[0,0,.39],raycast:G,children:[o.jsx("planeGeometry",{args:[c*2.3,c*1.5]}),o.jsx("shaderMaterial",{ref:s,transparent:!0,depthWrite:!1,blending:k,uniforms:p,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; uniform float swirl; void main() {
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
        }`})]})}function K({index:t,viewWidth:i,viewHeight:s}){const p=a.useRef(null),c=a.useRef(null),g=a.useMemo(()=>({opacity:{value:0}}),[]),e=a.useRef(t*2.4),d=6.5+t*1.8,f=2.8+t*.25,m=i*.72,u=-s*(.34+t*.08),n=Math.atan2(u,m),l=Math.min(i*(.23+t*.02),5.5);return T((h,x)=>{if(!p.current||document.hidden)return;e.current+=Math.min(x,.05);const z=e.current%d,y=z/f,b=z<f;p.current.visible=b,b&&(p.current.position.set(-i*(.16+t*.07)+y*m,s*(.4-t*.12)+y*u,1.7+t*.25),c.current&&(c.current.uniforms.opacity.value=Math.sin(y*Math.PI)**.6))}),o.jsx("group",{ref:p,visible:!1,rotation:[0,0,n],children:o.jsxs("mesh",{position:[-l*.42,0,0],raycast:G,children:[o.jsx("planeGeometry",{args:[l,.38]}),o.jsx("shaderMaterial",{ref:c,transparent:!0,depthWrite:!1,blending:k,uniforms:g,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; uniform float opacity; void main() {
            float along = vUv.x;
            float width = mix(0.19, 0.045, along);
            float crossTail = exp(-pow((vUv.y - 0.5) / width, 2.0));
            float tail = pow(along, 1.25) * (1.0 - smoothstep(0.91, 1.0, along)) * crossTail;
            vec2 headUV = (vUv - vec2(0.92, 0.5)) * vec2(15.0, 3.0);
            float head = exp(-dot(headUV, headUV) * 18.0);
            vec3 color = mix(vec3(0.30, 0.55, 1.0), vec3(0.92, 0.97, 1.0), along);
            float halo = exp(-dot(headUV, headUV) * 2.5) * 0.22;
            gl_FragColor = vec4(color, (tail * 0.85 + head + halo) * opacity);
          }`})]})})}function Q({repositories:t,positions:i,spacing:s,selectedRepository:p,previewRepository:c,onSelect:g,onPreview:e}){var u;const d=(u=c||p)==null?void 0:u.id,f=a.useMemo(()=>{const n=new B;n.setAttribute("position",new C(i.flat(),3));const l=s*3/2.55*.9;return n.setAttribute("size",new C(t.map(h=>Math.min(l,55+Math.min(Math.log2((h.stargazers_count??0)+1)*4,20))),1)),n.setAttribute("highlighted",new C(t.map(h=>h.id===d?1:0),1)),n},[i,t,s,d]);a.useEffect(()=>()=>f.dispose(),[f]),a.useEffect(()=>()=>{document.body.style.cursor=""},[]);const m=n=>{if(n.pointerType==="touch")return;n.stopPropagation();const l=t[n.index];l&&(document.body.style.cursor="pointer",e(l))};return o.jsx("points",{geometry:f,onPointerOver:m,onPointerMove:m,onPointerOut:n=>{const l=n.intersections.find(h=>h.object===n.object);l&&n.pointerType!=="touch"?e(t[l.index]||null):(document.body.style.cursor="",e(null))},onClick:n=>{n.stopPropagation(),t[n.index]&&g(t[n.index])},children:o.jsx("shaderMaterial",{transparent:!0,depthWrite:!1,blending:k,vertexShader:`attribute float size; attribute float highlighted; varying float highlight;
        void main() { highlight = highlighted; vec4 p = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * p; gl_PointSize = size * (1.0 + highlighted * 0.55) * (19.0 / -p.z); }`,fragmentShader:`varying float highlight; void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float glow = exp(-d * d * 4.5);
        float core = exp(-d * d * 55.0);
        vec3 color = mix(vec3(0.48, 0.78, 1.0), vec3(1.0), min(1.0, core + highlight * 0.3));
        gl_FragColor = vec4(color, glow * (0.85 + highlight * 0.35) + core);
      }`})})}function Z(){const{viewport:t}=L();return o.jsxs("mesh",{position:[t.width*.2,0,-4],raycast:G,children:[o.jsx("planeGeometry",{args:[t.width*1.1,t.height*1.2]}),o.jsx("shaderMaterial",{transparent:!0,depthWrite:!1,blending:k,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; void main() {
        vec2 p = vUv - 0.5;
        float ribbon = p.y - p.x * 0.4 + sin(p.x * 9.0) * 0.065;
        float clouds = exp(-ribbon * ribbon * 48.0);
        float lane = 1.0 - exp(-pow(ribbon + 0.025, 2.0) * 900.0) * 0.85;
        float wisps = 0.65 + 0.35 * sin(p.x * 23.0 + sin(p.y * 17.0));
        float edge = (1.0 - smoothstep(0.2, 0.5, abs(p.x))) * (1.0 - smoothstep(0.2, 0.5, abs(p.y)));
        vec3 color = mix(vec3(0.18, 0.38, 0.65), vec3(0.48, 0.22, 0.62), smoothstep(-0.3, 0.3, p.x));
        gl_FragColor = vec4(color, clouds * lane * wisps * edge * 0.15);
      }`})]})}function $({repositories:t,selectedRepository:i,previewRepository:s,onSelect:p,onPreview:c,reduceMotion:g}){const{viewport:e,size:d,raycaster:f,invalidate:m}=L(),u=a.useRef(null),n=a.useRef(null),l=a.useRef(null),h=a.useMemo(()=>({value:0}),[]),x=a.useRef({x:0,y:0}),z=a.useRef(108),y=a.useMemo(()=>q(t,e,d,z.current),[t,e.width,e.height,d.width,d.height]);a.useEffect(()=>{f.params.Points.threshold=Math.min(.42,y.spacing*.45*e.width/d.width)},[f,y.spacing,e.width,d.width]);const b=a.useMemo(()=>{const w=new B;return w.setAttribute("position",new C(y.connectionPositions,3)),w},[y.connectionPositions]);return a.useEffect(()=>()=>b.dispose(),[b]),a.useEffect(()=>{if(g)return;const w=M=>{x.current.x=M.clientX/window.innerWidth*2-1,x.current.y=M.clientY/window.innerHeight*2-1},P=()=>{document.hidden||m()};return window.addEventListener("pointermove",w,{passive:!0}),document.addEventListener("visibilitychange",P),m(),()=>{window.removeEventListener("pointermove",w),document.removeEventListener("visibilitychange",P)}},[m,g]),T((w,P)=>{if(!u.current||g||document.hidden)return;h.value+=Math.min(P,.05)*.225;const M=1-Math.exp(-Math.min(P,.05)*2.5);u.current.rotation.y+=(x.current.x*.035-u.current.rotation.y)*M,u.current.rotation.x+=(-x.current.y*.025-u.current.rotation.x)*M;for(const[S,_]of[[n.current,.08],[l.current,.48]])S&&(S.position.x+=(-x.current.x*_-S.position.x)*M,S.position.y+=(x.current.y*_-S.position.y)*M);w.invalidate()}),o.jsxs(o.Fragment,{children:[o.jsxs("group",{ref:n,children:[o.jsx(N,{reduceMotion:g}),o.jsx(Z,{})]}),o.jsxs("group",{ref:u,children:[o.jsxs("group",{position:[e.width*.24,e.height*.04,0],children:[o.jsx(H,{reduceMotion:g,swirl:h}),o.jsx(J,{swirl:h})]}),!g&&[0,1,2].map(w=>o.jsx(K,{index:w,viewWidth:e.width,viewHeight:e.height},w)),y.connectionPositions.length>0&&o.jsx("lineSegments",{geometry:b,raycast:G,children:o.jsx("lineBasicMaterial",{color:"#b9e8ff",transparent:!0,opacity:.55,blending:k,depthWrite:!1})}),o.jsx(Q,{repositories:t,positions:y.positions,spacing:y.spacing,selectedRepository:i,previewRepository:s,onSelect:p,onPreview:c})]}),o.jsx("group",{ref:l,children:o.jsx(N,{reduceMotion:g,foreground:!0})})]})}function nt({repositories:t,selectedRepository:i,previewRepository:s,onSelect:p,onPreview:c,onBackgroundClick:g,reduceMotion:e,onUnavailable:d}){return o.jsx(O,{className:"galaxy-canvas",camera:{position:[0,0,19],fov:52},dpr:1.5,raycaster:{params:{Points:{threshold:.42}}},fallback:o.jsx("span",{className:"sr-only",children:"3D unavailable. Use the project list."}),onCreated:({gl:f})=>{f.domElement.addEventListener("webglcontextlost",d,{once:!0})},frameloop:"demand",gl:{alpha:!0,antialias:!1,powerPreference:"high-performance",stencil:!1,depth:!0,preserveDrawingBuffer:!1},performance:{min:.55},onPointerMissed:g,children:o.jsx($,{repositories:t,selectedRepository:i,previewRepository:s,onSelect:p,onPreview:c,reduceMotion:e})})}export{nt as default};
