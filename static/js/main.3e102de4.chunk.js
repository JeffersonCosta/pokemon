(this.webpackJsonppokemon=this.webpackJsonppokemon||[]).push([[0],{103:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(11),r=a.n(s),o=a(46),i=a(17),l=(a(149),a(150)),j=a(151),u=a(152),b=a(140),d=a(158),m=a(157),h=a(161),p=a(153),O=a(155),x=a(156),g=a(138),f=a(159),k=a(154),y=a(61),v=a(142),N=a(144),S=a(145),w=a(146),C=a(160),A=a(147),F=a(148),P=a(43),R=a(143),z=a(37),_=a.n(z),q=a(6),B=Object(g.a)((function(e){return Object(f.a)({paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},media:{padding:0,height:200,backgroundSize:"auto 80%",backgroundColor:"#F2F2F2"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:P.a[500]},chip:{margin:2},progressBar:{flex:1,height:10,borderRadius:2},statName:{flex:"50% 0 0",paddingRight:10,margin:0,color:"#777",textAlign:"right"},baseStatName:{color:"#115293",width:30,display:"inline-block"},boxProgress:{margin:"5px 0"},subName:{color:"#999"},pokemonName:{fontFamily:"Righteous, Raleway, Arial"}})})),E=function(e){var t=e.pokemon,a=B(),s=c.a.useState(!1),r=Object(i.a)(s,2),o=r[0],l=r[1],j=Object(n.useState)(!1),u=Object(i.a)(j,2),m=u[0],h=u[1],p=Object(n.useState)({}),O=Object(i.a)(p,2),x=O[0],g=O[1];return Object(n.useEffect)((function(){h(!0),t.url&&_.a.get(t.url).then((function(e){g(e.data),h(!1)})).catch((function(e){console.log(e),h(!1)}))}),[t.url]),Object(q.jsx)(b.a,{item:!0,xs:12,sm:4,children:Object(q.jsxs)(v.a,{onClick:function(){l(!o)},children:[m?Object(q.jsx)(R.a,{variant:"rect",width:"100%",height:200}):Object(q.jsx)(N.a,{className:a.media,image:Object.keys(x).length?x.sprites.other.dream_world.front_default:"https://img1.gratispng.com/20171220/kqw/pokeball-png-5a3a4a7e247ce7.9167778215137695981495.jpg",title:"Pokem\xf3n ".concat(t.name)}),Object(q.jsxs)(S.a,{children:[Object(q.jsxs)(w.a,{gutterBottom:!0,variant:"h4",component:"h2",align:"center",className:a.pokemonName,children:[t.name," ",Object(q.jsxs)("span",{className:a.subName,children:["N\xba",x.id]})]}),Object(q.jsxs)(d.a,{marginY:2,children:["Abilities:",m?Object(q.jsx)(R.a,{variant:"text"}):Object.keys(x).length&&x.abilities.map((function(e,t){return Object(q.jsx)(C.a,{className:a.chip,color:"secondary",size:"medium",label:e.ability.name},t)}))]})]}),Object(q.jsx)(A.a,{in:o,timeout:"auto",unmountOnExit:!0,children:Object(q.jsx)(S.a,{children:Object(q.jsx)(d.a,{marginY:2,children:Object.keys(x).length&&x.stats.map((function(e,t){return Object(q.jsxs)(d.a,{display:"flex",alignItems:"center",className:a.boxProgress,children:[Object(q.jsxs)("p",{className:a.statName,children:[e.stat.name,Object(q.jsx)("strong",{className:a.baseStatName,children:e.base_stat})]}),Object(q.jsx)(F.a,{className:a.progressBar,variant:"determinate",value:e.base_stat})]},t)}))})})})]})})},L=_.a.create({baseURL:"https://pokeapi.co/api/v2",headers:{"Content-Type":"Application/json"}}),Y=Object(g.a)((function(e){return Object(f.a)({root:{flexGrow:1,fontFamily:"Righteous, Raleway, Arial"},input:{margin:10,minWidth:200},container:{paddingTop:20}})}));var I=function(){var e=Y(),t=Object(n.useState)({count:0,next:"pokemon?limit=10&offset=200",previous:"",results:[]}),a=Object(i.a)(t,2),s=a[0],r=a[1],g=Object(n.useState)({}),f=Object(i.a)(g,2),v=f[0],N=f[1],S=Object(n.useState)([]),w=Object(i.a)(S,2),C=w[0],A=w[1],F=Object(n.useState)("default"),P=Object(i.a)(F,2),R=P[0],z=P[1],_=Object(n.useState)(""),B=Object(i.a)(_,2),I=B[0],J=B[1],M=function(){L.get(s.next).then((function(e){r((function(t){return{results:[].concat(Object(o.a)(t.results),Object(o.a)(e.data.results)),next:e.data.next,count:e.data.count,previous:e.data.previous}}))})).catch((function(e){console.log(e)}))},T=function(){"by-area"===R&&I.length>0?L.get("location-area/".concat(I)).then((function(e){var t=e.data.pokemon_encounters.map((function(e){return e.pokemon}));A(t)})).catch((function(e){A([]),console.log(e)})):"by-name"===R&&I.length>0?L.get("pokemon/".concat(I)).then((function(e){N({name:e.data.name,url:"https://pokeapi.co/api/v2/pokemon/".concat(e.data.id,"/")})})).catch((function(e){N({}),console.log(e)})):"default"===R&&M()};return Object(n.useEffect)((function(){T()}),[]),Object(q.jsxs)(c.a.Fragment,{children:[Object(q.jsx)(l.a,{}),Object(q.jsxs)("div",{className:e.root,children:[Object(q.jsx)(j.a,{position:"fixed",color:"inherit",children:Object(q.jsx)(u.a,{children:Object(q.jsx)(b.a,{container:!0,spacing:3,children:Object(q.jsx)(b.a,{item:!0,xs:12,children:Object(q.jsxs)(d.a,{display:"flex",justifyContent:"center",children:[Object(q.jsxs)(m.a,{className:e.input,size:"small",select:!0,label:"Pesquisar por",value:R,onChange:function(e){return z(e.target.value)},variant:"standard",children:[Object(q.jsx)(h.a,{value:"default",children:"Listar todos"},"default"),Object(q.jsx)(h.a,{value:"by-area",children:"Por localiza\xe7\xe3o"},"by-area"),Object(q.jsx)(h.a,{value:"by-name",children:"Por nome"},"by-name")]}),Object(q.jsx)(m.a,{className:e.input,size:"small",placeholder:"Pesquisar...",value:I,onChange:function(e){J(e.target.value)},disabled:"default"===R,label:"Digite aqui...",type:"search",variant:"standard"}),Object(q.jsx)(d.a,{display:"flex",alignItems:"center",children:Object(q.jsx)(p.a,{size:"large",variant:"contained",onClick:T,color:"primary",children:Object(q.jsx)(k.a,{})})})]})})})})}),Object(q.jsx)(u.a,{}),Object(q.jsxs)(O.a,{maxWidth:"lg",className:e.container,children:["default"===R&&Object(q.jsx)(y.a,{style:{overflow:"inherit"},dataLength:s.results.length,next:M,hasMore:!!s.next.length,loader:Object(q.jsx)(x.a,{}),endMessage:Object(q.jsx)("p",{style:{textAlign:"center"},children:Object(q.jsx)("b",{children:"Yay! You have seen it all"})}),children:Object(q.jsx)(b.a,{container:!0,spacing:3,children:s.results.map((function(e,t){return Object(q.jsx)(E,{pokemon:e},t)}))})}),Object(q.jsxs)(b.a,{container:!0,spacing:3,children:["by-name"===R&&(Object.keys(v).length?Object(q.jsx)(E,{pokemon:v}):Object(q.jsxs)("p",{children:['Nenhum pokemon encontrado para o nome "',I,'"']})),"by-area"===R&&(C.length?C.map((function(e,t){return Object(q.jsx)(E,{pokemon:e},t)})):Object(q.jsxs)("p",{children:['Nenhum pokemon encontrado para \xe1rea "',I,'"']}))]})]})]})]})};r.a.render(Object(q.jsx)(c.a.Fragment,{children:Object(q.jsx)(I,{})}),document.getElementById("root"))}},[[103,1,2]]]);
//# sourceMappingURL=main.3e102de4.chunk.js.map