(this.webpackJsonppokemon=this.webpackJsonppokemon||[]).push([[0],{133:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(12),r=a.n(s),o=a(54),i=a.n(o),l=a(57),j=a(76),u=a(18),d=(a(179),a(180)),b=a(181),m=a(182),h=a(170),p=a(188),x=a(187),O=a(191),g=a(183),f=a(185),y=a(186),k=a(168),v=a(189),N=a(184),w=a(77),S=a(172),A=a(174),C=a(175),F=a(176),R=a(190),z=a(177),E=a(178),P=a(49),_=a(173),q=a(42),B=a.n(q),I=a(5),L=Object(k.a)((function(e){return Object(v.a)({paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary,cursor:"pointer"},media:{padding:0,height:200,backgroundSize:"auto 80%",backgroundColor:"#F2F2F2"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:P.a[500]},chip:{margin:2},progressBar:{flex:1,height:10,borderRadius:2},statName:{flex:"50% 0 0",paddingRight:10,margin:0,color:"#777",textAlign:"right"},baseStatName:{color:"#115293",width:30,display:"inline-block"},boxProgress:{margin:"5px 0"},subName:{color:"#999"},pokemonName:{fontFamily:"Righteous, Raleway, Arial"},cardExpanded:{border:"5px solid #efefef"}})})),W=function(e){var t=e.pokemon,a=L(),s=c.a.useState(!1),r=Object(u.a)(s,2),o=r[0],i=r[1],l=Object(n.useState)(!1),j=Object(u.a)(l,2),d=j[0],b=j[1],m=Object(n.useState)({}),x=Object(u.a)(m,2),O=x[0],g=x[1];return Object(n.useEffect)((function(){b(!0),t.url&&B.a.get(t.url).then((function(e){g(e.data),b(!1)})).catch((function(e){console.log(e),b(!1)}))}),[t.url]),Object(I.jsx)(h.a,{item:!0,xs:12,sm:4,children:Object(I.jsxs)(S.a,{onClick:function(){i(!o)},className:"".concat(!0===o?a.cardExpanded:""),children:[d?Object(I.jsx)(_.a,{variant:"rect",width:"100%",height:200}):Object(I.jsx)(A.a,{className:a.media,image:Object.keys(O).length?O.sprites.other.dream_world.front_default:"https://img1.gratispng.com/20171220/kqw/pokeball-png-5a3a4a7e247ce7.9167778215137695981495.jpg",title:"Pokem\xf3n ".concat(t.name)}),Object(I.jsxs)(C.a,{children:[Object(I.jsxs)(F.a,{gutterBottom:!0,variant:"h4",component:"h2",align:"center",className:a.pokemonName,children:[t.name," ",Object(I.jsxs)("span",{className:a.subName,children:["N\xba",O.id]})]}),Object(I.jsxs)(p.a,{marginY:2,children:["Abilities:",d?Object(I.jsx)(_.a,{variant:"text"}):Object.keys(O).length&&O.abilities.map((function(e,t){return Object(I.jsx)(R.a,{className:a.chip,color:"secondary",size:"medium",label:e.ability.name},t)}))]})]}),Object(I.jsx)(z.a,{in:o,timeout:"auto",unmountOnExit:!0,children:Object(I.jsx)(C.a,{children:Object(I.jsx)(p.a,{marginY:2,children:Object.keys(O).length&&O.stats.map((function(e,t){return Object(I.jsxs)(p.a,{display:"flex",alignItems:"center",className:a.boxProgress,children:[Object(I.jsxs)("p",{className:a.statName,children:[e.stat.name,Object(I.jsx)("strong",{className:a.baseStatName,children:e.base_stat})]}),Object(I.jsx)(E.a,{className:a.progressBar,variant:"determinate",value:e.base_stat})]},t)}))})})})]})})},Y=B.a.create({baseURL:"https://pokeapi.co/api/v2",headers:{"Content-Type":"Application/json"}}),M=a(85),T=Object(k.a)((function(e){return Object(v.a)({root:{flexGrow:1,fontFamily:"Righteous, Raleway, Arial"},input:{margin:10,maxWidth:250,width:"100%"},container:{paddingTop:20},selectArea:{maxWidth:250,width:"100%",margin:10},btnSearch:{padding:8,minWidth:30}})}));var J=function(){var e=T(),t=Object(n.useState)({count:0,next:"pokemon?limit=10&offset=0",previous:"",results:[]}),a=Object(u.a)(t,2),s=a[0],r=a[1],o=Object(n.useState)({}),k=Object(u.a)(o,2),v=k[0],S=k[1],A=Object(n.useState)([]),C=Object(u.a)(A,2),F=C[0],R=C[1],z=Object(n.useState)("default"),E=Object(u.a)(z,2),P=E[0],_=E[1],q=Object(n.useState)(""),B=Object(u.a)(q,2),L=B[0],J=B[1],D=Object(n.useState)({}),G=Object(u.a)(D,2),U=G[0],H=G[1];function K(){return(K=Object(j.a)(i.a.mark((function e(t){var a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.get("location-area?offset=".concat(t.length,"&limit=20"));case 2:return a=e.sent,n=a.data.results.map((function(e){return{value:e.id,label:e.name}})),e.abrupt("return",{options:n,hasMore:a.data.next});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Q=function(){Y.get(s.next).then((function(e){r((function(t){return{results:[].concat(Object(l.a)(t.results),Object(l.a)(e.data.results)),next:e.data.next,count:e.data.count,previous:e.data.previous}}))})).catch((function(e){console.log(e)}))},V=function(){"by-area"===P&&Object.keys(U).length>0?(console.log(U),U.hasOwnProperty("label")&&Y.get("location-area/".concat(U.label)).then((function(e){var t=e.data.pokemon_encounters.map((function(e){return e.pokemon}));R(t)})).catch((function(e){R([]),console.log(e)}))):"by-name"===P&&L.length>0?Y.get("pokemon/".concat(L)).then((function(e){S({name:e.data.name,url:"https://pokeapi.co/api/v2/pokemon/".concat(e.data.id,"/")})})).catch((function(e){S({}),console.log(e)})):"default"===P&&Q()};return Object(n.useEffect)((function(){V()}),[]),Object(I.jsxs)(c.a.Fragment,{children:[Object(I.jsx)(d.a,{}),Object(I.jsxs)("div",{className:e.root,children:[Object(I.jsx)(b.a,{position:"fixed",color:"inherit",children:Object(I.jsx)(m.a,{children:Object(I.jsx)(h.a,{container:!0,spacing:3,children:Object(I.jsx)(h.a,{item:!0,xs:12,children:Object(I.jsxs)(p.a,{display:"flex",justifyContent:"center",alignItems:"center",children:[Object(I.jsxs)(x.a,{className:e.input,size:"small",select:!0,label:"Pesquisar por",value:P,onChange:function(e){return _(e.target.value)},variant:"outlined",children:[Object(I.jsx)(O.a,{value:"default",children:"Todos"},"default"),Object(I.jsx)(O.a,{value:"by-area",children:"Localiza\xe7\xe3o"},"by-area"),Object(I.jsx)(O.a,{value:"by-name",children:"Nome"},"by-name")]}),"by-area"===P?Object(I.jsx)(M.a,{className:e.selectArea,value:U,loadOptions:function(e){return K.apply(this,arguments)},onChange:function(e){H(e)}}):Object(I.jsx)(x.a,{className:e.input,size:"small",placeholder:"Pesquisar...",value:L,onChange:function(e){J(e.target.value)},disabled:"default"===P,label:"Digite aqui...",type:"search",variant:"standard"}),Object(I.jsx)(p.a,{display:"flex",alignItems:"center",children:Object(I.jsx)(g.a,{size:"large",variant:"contained",onClick:V,color:"primary",className:e.btnSearch,children:Object(I.jsx)(N.a,{})})})]})})})})}),Object(I.jsx)(m.a,{}),Object(I.jsxs)(f.a,{maxWidth:"lg",className:e.container,children:["default"===P&&Object(I.jsx)(w.a,{style:{overflow:"inherit"},dataLength:s.results.length,next:Q,hasMore:!!s.next.length,loader:Object(I.jsx)(y.a,{}),endMessage:Object(I.jsx)("p",{style:{textAlign:"center"},children:Object(I.jsx)("b",{children:"Yay! You have seen it all"})}),children:Object(I.jsx)(h.a,{container:!0,spacing:3,children:s.results.map((function(e,t){return Object(I.jsx)(W,{pokemon:e},t)}))})}),Object(I.jsxs)(h.a,{container:!0,spacing:3,children:["by-name"===P&&(Object.keys(v).length?Object(I.jsx)(W,{pokemon:v}):Object(I.jsxs)("p",{children:['Nenhum pokemon encontrado para o nome "',L,'"']})),"by-area"===P&&(F.length?F.map((function(e,t){return Object(I.jsx)(W,{pokemon:e},t)})):Object(I.jsxs)("p",{children:['Nenhum pokemon encontrado para \xe1rea "',L,'"']}))]})]})]})]})};r.a.render(Object(I.jsx)(c.a.Fragment,{children:Object(I.jsx)(J,{})}),document.getElementById("root"))}},[[133,1,2]]]);
//# sourceMappingURL=main.b5b9db08.chunk.js.map