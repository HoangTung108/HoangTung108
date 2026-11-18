import{j as o,a as s}from"./react-vendor-goSCRwrB.js";import{C as G,u as U,a as _}from"./react-three-ZOdezmhi.js";import{k as E,F as z,l as S}from"./three-CobOv_u-.js";const R=()=>null;function V(t){let e=t>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function A(t){return Math.sqrt(-2*Math.log(Math.max(t(),1e-4)))*Math.cos(2*Math.PI*t())}function L({reduceMotion:t,swirl:e}){const{viewport:d}=U(),a=s.useRef(null),n=Math.min(d.width*.48,d.height*.68),l=s.useMemo(()=>({pixelRatio:{value:1.5},time:{value:0},swirl:e,radius:{value:n}}),[n,e]);_(({clock:m})=>{a.current&&(a.current.uniforms.time.value=t?0:m.elapsedTime,a.current.uniforms.swirl.value=e.value)});const r=s.useMemo(()=>{const g=new Float32Array(15e3),i=new Float32Array(5e3*3),x=new Float32Array(5e3),v=new Float32Array(5e3*3),p=V(108),w=.39,y=Math.cos(w),f=Math.sin(w);for(let c=0;c<5e3;c+=1){const h=Math.pow(p(),.72),M=c%3,b=M*Math.PI*2/3+h*5.8+A(p)*.24,j=Math.cos(b)*h*n,C=Math.sin(b)*h*n*.48+A(p)*n*.025,P=c*3;v[P]=Math.pow(h,1/.72),v[P+1]=b-h*5.8,v[P+2]=A(p)*.12,g[P]=j*y-C*f,g[P+1]=j*f+C*y,g[P+2]=-1.2+Math.sin(b)*h*1.6+A(p)*.16;const F=Math.exp(-h*5);i[P]=.48+F*.5+(M===1?.12:0),i[P+1]=.62+F*.25,i[P+2]=1-F*.18,x[c]=c%41===0?5+p()*3:1+p()*1.6}const u=new E;return u.setAttribute("position",new z(g,3)),u.setAttribute("color",new z(i,3)),u.setAttribute("size",new z(x,1)),u.setAttribute("orbit",new z(v,3)),u},[n]);return s.useEffect(()=>()=>r.dispose(),[r]),o.jsx("points",{geometry:r,raycast:R,children:o.jsx("shaderMaterial",{ref:a,transparent:!0,depthWrite:!1,blending:S,uniforms:l,vertexShader:`attribute vec3 color; attribute vec3 orbit; attribute float size; varying vec3 vColor; varying float brightness; uniform float pixelRatio; uniform float time; uniform float swirl; uniform float radius;
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
        }`})})}function k({reduceMotion:t,foreground:e=!1}){const{viewport:d}=U(),a=s.useRef(null),n=s.useMemo(()=>({time:{value:0}}),[]);_(({clock:r})=>{a.current&&(a.current.uniforms.time.value=t?0:r.elapsedTime)});const l=s.useMemo(()=>{const r=V(e?712:902),m=[],g=[],i=[];for(let v=0;v<(e?65:850);v++){const p=e?3+r()*4:-5-r()*12,w=(19-p)/19*1.15;m.push((r()-.5)*d.width*w,(r()-.5)*d.height*w,p),g.push(e?2+r()*5:v%67===0?10:1.2+r()*2.2);const y=r()>.8;i.push(y?1:.65,y?.83:.8,y?.67:1)}const x=new E;return x.setAttribute("position",new z(m,3)),x.setAttribute("size",new z(g,1)),x.setAttribute("color",new z(i,3)),x},[d.width,d.height,e]);return s.useEffect(()=>()=>l.dispose(),[l]),o.jsx("points",{geometry:l,raycast:R,children:o.jsx("shaderMaterial",{ref:a,transparent:!0,depthWrite:!1,blending:S,uniforms:n,vertexShader:`attribute float size; attribute vec3 color; uniform float time;
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
        }`})})}function T(t,e,d){const a=V(d),n=Math.ceil(t.length/4),l=Math.min(1.35,e.width*.055,e.height*.07),r=Math.max(.5,e.width*.5-l-.35),m=Math.max(.5,e.height*.5-l-.45),g=Math.max(e.width*.12,-r),i=Math.min(e.width*.38,r),x=Math.min(e.height*.34,m),v=[];for(let f=0;f<n;f+=1){let u=null;for(let c=0;c<60;c+=1){const h=g+a()*(i-g),M=(a()*2-1)*x;if(u=[h,M],v.every(([b,j])=>Math.hypot(b-h,j-M)>Math.min(2.8,e.width*.12)))break}v.push(u)}const p=[],w=Array.from({length:n},()=>[]);t.forEach((f,u)=>{const c=Math.min(n-1,Math.floor(u*n/t.length)),[h,M]=v[c],b=w[c],j=l*(.25+a()*.75),C=a()*Math.PI*2,P=[h+Math.cos(C)*j,M+Math.sin(C)*j*.82,(a()-.5)*.8];p[u]=P,b.push(u)});const y=[];return w.forEach(f=>{if(f.length<2)return;const[u,c]=v[w.indexOf(f)],h=[...f].sort((M,b)=>{const j=p[M],C=p[b];return Math.atan2(j[1]-c,j[0]-u)-Math.atan2(C[1]-c,C[0]-u)});h.forEach((M,b)=>{const j=h[(b+1)%h.length];y.push(...p[M],...p[j])}),h.length>=4&&y.push(...p[h[0]],...p[h[2]])}),{positions:p,connectionPositions:new Float32Array(y)}}function W({swirl:t}){const{viewport:e}=U(),d=s.useRef(null);_(()=>{d.current&&(d.current.uniforms.swirl.value=t.value)});const a=s.useMemo(()=>({swirl:t}),[t]),n=Math.min(e.width*.48,e.height*.68);return o.jsxs("mesh",{position:[0,0,-1.5],rotation:[0,0,.39],raycast:R,children:[o.jsx("planeGeometry",{args:[n*2.3,n*1.5]}),o.jsx("shaderMaterial",{ref:d,transparent:!0,depthWrite:!1,blending:S,uniforms:a,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; uniform float swirl; void main() {
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
        }`})]})}function B({index:t,viewWidth:e,viewHeight:d}){const a=s.useRef(null),n=s.useRef(null),l=s.useMemo(()=>({opacity:{value:0}}),[]),r=s.useRef(t*2.4),m=6.5+t*1.8,g=2.8+t*.25,i=e*.72,x=-d*(.34+t*.08),v=Math.atan2(x,i),p=Math.min(e*(.23+t*.02),5.5);return _((w,y)=>{if(!a.current||document.hidden)return;r.current+=Math.min(y,.05);const f=r.current%m,u=f/g,c=f<g;a.current.visible=c,c&&(a.current.position.set(-e*(.16+t*.07)+u*i,d*(.4-t*.12)+u*x,1.7+t*.25),n.current&&(n.current.uniforms.opacity.value=Math.sin(u*Math.PI)**.6))}),o.jsx("group",{ref:a,visible:!1,rotation:[0,0,v],children:o.jsxs("mesh",{position:[-p*.42,0,0],raycast:R,children:[o.jsx("planeGeometry",{args:[p,.38]}),o.jsx("shaderMaterial",{ref:n,transparent:!0,depthWrite:!1,blending:S,uniforms:l,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; uniform float opacity; void main() {
            float along = vUv.x;
            float width = mix(0.19, 0.045, along);
            float crossTail = exp(-pow((vUv.y - 0.5) / width, 2.0));
            float tail = pow(along, 1.25) * (1.0 - smoothstep(0.91, 1.0, along)) * crossTail;
            vec2 headUV = (vUv - vec2(0.92, 0.5)) * vec2(15.0, 3.0);
            float head = exp(-dot(headUV, headUV) * 18.0);
            vec3 color = mix(vec3(0.30, 0.55, 1.0), vec3(0.92, 0.97, 1.0), along);
            float halo = exp(-dot(headUV, headUV) * 2.5) * 0.22;
            gl_FragColor = vec4(color, (tail * 0.85 + head + halo) * opacity);
          }`})]})})}function D({repositories:t,positions:e,onSelect:d,onHoldStart:a,onHoldEnd:n}){const l=s.useRef(null),r=s.useRef(!1),m=s.useMemo(()=>{const i=new E;return i.setAttribute("position",new z(e.flat(),3)),i.setAttribute("size",new z(t.map(x=>25+Math.min(Math.log2(x.stargazers_count+1)*4,20)),1)),i},[e,t]);s.useEffect(()=>()=>m.dispose(),[m]),s.useEffect(()=>()=>{clearTimeout(l.current),document.body.style.cursor=""},[]);const g=()=>{clearTimeout(l.current),n()};return o.jsx("points",{geometry:m,onPointerOver:i=>{i.stopPropagation(),document.body.style.cursor="pointer"},onPointerOut:()=>{g(),document.body.style.cursor=""},onPointerDown:i=>{i.stopPropagation(),r.current=!1,g(),a();const x=t[i.index];l.current=setTimeout(()=>{r.current=!0,d(x)},460)},onPointerUp:g,onPointerCancel:g,onClick:i=>{i.stopPropagation(),r.current||d(t[i.index]),r.current=!1},children:o.jsx("shaderMaterial",{transparent:!0,depthWrite:!1,blending:S,vertexShader:"attribute float size; void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * p; gl_PointSize = size * (19.0 / -p.z); }",fragmentShader:"void main() { float d = length(gl_PointCoord - 0.5) * 2.0; float glow = exp(-d * d * 7.0); float core = exp(-d * d * 100.0); gl_FragColor = vec4(mix(vec3(0.40, 0.72, 1.0), vec3(1.0), core), glow * 0.75 + core); }"})})}function I(){const{viewport:t}=U();return o.jsxs("mesh",{position:[t.width*.2,0,-4],raycast:R,children:[o.jsx("planeGeometry",{args:[t.width*1.1,t.height*1.2]}),o.jsx("shaderMaterial",{transparent:!0,depthWrite:!1,blending:S,vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`varying vec2 vUv; void main() {
        vec2 p = vUv - 0.5;
        float ribbon = p.y - p.x * 0.4 + sin(p.x * 9.0) * 0.065;
        float clouds = exp(-ribbon * ribbon * 48.0);
        float lane = 1.0 - exp(-pow(ribbon + 0.025, 2.0) * 900.0) * 0.85;
        float wisps = 0.65 + 0.35 * sin(p.x * 23.0 + sin(p.y * 17.0));
        float edge = (1.0 - smoothstep(0.2, 0.5, abs(p.x))) * (1.0 - smoothstep(0.2, 0.5, abs(p.y)));
        vec3 color = mix(vec3(0.18, 0.38, 0.65), vec3(0.48, 0.22, 0.62), smoothstep(-0.3, 0.3, p.x));
        gl_FragColor = vec4(color, clouds * lane * wisps * edge * 0.15);
      }`})]})}function H({repositories:t,onSelect:e,onHoldStart:d,onHoldEnd:a,reduceMotion:n}){const{viewport:l,invalidate:r}=U(),m=s.useRef(null),g=s.useRef(null),i=s.useRef(null),x=s.useMemo(()=>({value:0}),[]),v=s.useRef({x:0,y:0}),p=s.useRef(108),w=s.useMemo(()=>T(t,l,p.current),[t,l.width,l.height]),y=s.useMemo(()=>{const f=new E;return f.setAttribute("position",new z(w.connectionPositions,3)),f},[w.connectionPositions]);return s.useEffect(()=>()=>y.dispose(),[y]),s.useEffect(()=>{if(n)return;const f=c=>{v.current.x=c.clientX/window.innerWidth*2-1,v.current.y=c.clientY/window.innerHeight*2-1},u=()=>{document.hidden||r()};return window.addEventListener("pointermove",f,{passive:!0}),document.addEventListener("visibilitychange",u),r(),()=>{window.removeEventListener("pointermove",f),document.removeEventListener("visibilitychange",u)}},[r,n]),_((f,u)=>{if(!m.current||n||document.hidden)return;x.value+=Math.min(u,.05)*.225;const c=1-Math.exp(-Math.min(u,.05)*2.5);m.current.rotation.y+=(v.current.x*.035-m.current.rotation.y)*c,m.current.rotation.x+=(-v.current.y*.025-m.current.rotation.x)*c;for(const[h,M]of[[g.current,.08],[i.current,.48]])h&&(h.position.x+=(-v.current.x*M-h.position.x)*c,h.position.y+=(v.current.y*M-h.position.y)*c);f.invalidate()}),o.jsxs(o.Fragment,{children:[o.jsxs("group",{ref:g,children:[o.jsx(k,{reduceMotion:n}),o.jsx(I,{})]}),o.jsxs("group",{ref:m,children:[o.jsxs("group",{position:[l.width*.24,l.height*.04,0],children:[o.jsx(L,{reduceMotion:n,swirl:x}),o.jsx(W,{swirl:x})]}),!n&&[0,1,2].map(f=>o.jsx(B,{index:f,viewWidth:l.width,viewHeight:l.height},f)),w.connectionPositions.length>0&&o.jsx("lineSegments",{geometry:y,raycast:R,children:o.jsx("lineBasicMaterial",{color:"#9dd9ff",transparent:!0,opacity:.22,blending:S,depthWrite:!1})}),o.jsx(D,{repositories:t,positions:w.positions,onSelect:e,onHoldStart:d,onHoldEnd:a})]}),o.jsx("group",{ref:i,children:o.jsx(k,{reduceMotion:n,foreground:!0})})]})}function O({repositories:t,onSelect:e,onHoldStart:d,onHoldEnd:a,onBackgroundClick:n,reduceMotion:l,onUnavailable:r}){return o.jsx(G,{className:"galaxy-canvas",camera:{position:[0,0,19],fov:52},dpr:1.5,raycaster:{params:{Points:{threshold:.24}}},fallback:o.jsx("span",{className:"sr-only",children:"3D unavailable. Use the project list."}),onCreated:({gl:m})=>{m.domElement.addEventListener("webglcontextlost",r,{once:!0})},frameloop:"demand",gl:{alpha:!0,antialias:!1,powerPreference:"high-performance",stencil:!1,depth:!0,preserveDrawingBuffer:!1},performance:{min:.55},onPointerMissed:n,children:o.jsx(H,{repositories:t,onSelect:e,onHoldStart:d,onHoldEnd:a,reduceMotion:l})})}export{O as default};
