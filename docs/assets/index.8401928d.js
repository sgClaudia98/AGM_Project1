import{S as e,P as n,W as t,T as o,M as s,a as i,b as a,A as c,C as d,B as r,c as l,d as w,G as m,e as v,f as u,V as y,O as p,g as f,h as g,i as h,j as x}from"./vendor.5c1c9c2e.js";const z=new e,b=new n(75,window.innerWidth/window.innerHeight,.1,1e3),E=new t({canvas:document.querySelector("#bg")});E.setPixelRatio(window.devicePixelRatio),E.setSize(window.innerWidth,window.innerHeight),b.position.setZ(30),b.position.setX(-3),E.render(z,b);const L=new o(10,3,16,100),M=new s({color:16737095});new i(L,M);const A=new a(16777215);A.position.set(5,5,5);const k=new c(16777215);z.add(A,k),Array(100).fill().forEach((function(){const e=new l(.1,24,24),n=new s({color:16777215}),t=new i(e,n),[o,a,c]=Array(3).fill().map((()=>w.randFloatSpread(100)));t.position.set(o,a,c),z.add(t)}));const H=new d("black");let P;function W(e,n,t,o){var s=(new v).load(e),a=new u({map:s}),c=new i(t,a);return c.position.set(n.x,n.y,n.z),c.rotateY(o),c}z.background=H,(new m).load("./assets/hand_low_poly/hand.gltf",(function(e){P=e.scene,P.position.z=-5,P.position.x=2,P.position.y=0,P.rotation.y=-.6,P.scale.set(3,3,3),z.add(P)}));var X=new r(3,1.7,1);const j=W("./assets/webgl.png",{x:10,y:-1,z:5},X,-1.4);z.add(j);const B=W("./assets/01-vuejs.jpg",{x:15,y:-.85,z:9.8},X=new r(2,1,.5),-1.5);z.add(B);const C=W("./assets/HTML5.png",{x:15,y:-4,z:9},X=new r(3,1.7,1),-1.4);z.add(C);const I=W("./assets/react-logo.jpg",{x:6,y:1,z:10.2},X=new r(2,1,.5),-1.8);z.add(I);const R=[j,B,C,I];function S(){const e=document.body.getBoundingClientRect().top;b.position.z=-.01*e,b.position.x=-2e-4*e,b.rotation.y=.001*e}var Y;document.body.onscroll=()=>{S()},S(),window.addEventListener("mousemove",(function(e){const n=new y(e.clientX/window.innerWidth*2-1,-e.clientY/window.innerHeight*2+1);Y&&R.forEach((e=>{e.position.x+=.3*(Y.x-n.x),e.position.y+=.3*(Y.y-n.y),e.rotation.x-=.5*(Y.x-n.x),e.rotation.y+=.5*(Y.y-n.y),e.rotation.z-=.5*(Y.y-n.y)})),Y=n})),function e(){if(requestAnimationFrame(e),P){var n=Math.sin(.005*Date.now());P.rotation.y+=.01*n,P.rotation.z+=.04*n}E.render(z,b)}();var q=new e,F=new p(-1,1,1/1.33,-.5/1.33,.01,1e5);F.position.z=400,F.scale.set(1.5,1.5,1.5),F.lookAt(new f(0,0,0));var O=document.getElementById("scene2-body"),T=new t({alpha:!0});T.setSize(O.clientWidth,O.clientHeight),console.log(O.clientWidth,O.clientHeight);var _=T.domElement;O.appendChild(_);const D=new a(16777215,.7);D.position.set(15,5,25);const G=new c(16777215,.7);q.add(D,G);var V=new g;q.add(V);var Z=[];!async function(){var e=new m;await e.loadAsync("./assets/CartoonTree.gltf").then((e=>{e.scene.position.set(-2,-.2,0),e.scene.scale.set(.18,.18,.18),Z.push(e.scene),V.add(e.scene)})),await e.loadAsync("./assets/Mill.gltf").then((e=>{e.scene.position.set(0,-.2,0),e.scene.rotation.set(0,.8,0),Z.push(e.scene),V.add(e.scene)})),await e.loadAsync("./assets/Low-Poly-Racing-Car.gltf").then((e=>{e.scene.position.set(2,-.4,0),e.scene.scale.set(.7,.7,.7),e.scene.rotation.set(0,4,0),Z.push(e.scene),V.add(e.scene)}))}();var J=document.getElementById("previous"),K=document.getElementById("next"),N=0;function Q(){N<1&&(N++,h.to(V.position,.5,{x:-2*N,ease:x.easeOut})),1==N?K.classList.add("invisible"):-1==N||J.visibility||J.classList.remove("invisible")}function U(){N>-1&&(N--,h.to(V.position,.5,{x:-2*N,ease:x.easeOut})),-1==N?J.classList.add("invisible"):1==N||K.visibility||K.classList.remove("invisible")}K.addEventListener("click",(function(){Q()})),J.addEventListener("click",(function(){U()})),document.addEventListener("keydown",(function(e){"ArrowLeft"===e.code?U():"ArrowRight"===e.code&&Q()}));var $,ee=!1,ne=new f,te=new f;T.domElement.addEventListener("mousedown",(function(e){ee=!0,e.clientX}),!1),T.domElement.addEventListener("mousemove",(function(e){if(ee){console.log($),$||(console.log(Z,1+N),$=Z[1+N],ne.x=$.rotation.x,ne.y=$.rotation.y,ne.z=$.rotation.z,te=ne.copy());var n=e.movementX||e.mozMovementX||e.webkitMovementX||0,t=e.movementY||e.mozMovementY||e.webkitMovementY||0;te.y-=.01*n,te.x-=.01*t,te.x=Math.max(-Math.PI/2,Math.min(Math.PI/2,te.x)),$.rotation.set(te.x,te.y,te.z)}}),!1),T.domElement.addEventListener("mouseup",(function(e){ee=!1,$&&(console.log($.rotation,ne),$.rotation.set(ne.x,ne.y,ne.z),$=void 0,ne=new f)}),!1),function e(){requestAnimationFrame(e),T.render(q,F)}();