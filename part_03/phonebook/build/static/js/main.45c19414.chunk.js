(this.webpackJsonpphone_book=this.webpackJsonpphone_book||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(1),a=t(15),u=t.n(a),o=t(6),i=t(3),s=function(e){var n=e.filter,t=e.filterValueChange;return Object(r.jsxs)("div",{children:["filter with: ",Object(r.jsx)("input",{value:n,onChange:t})]})},f=function(e){var n=e.formActionListeners,t=e.newName,c=e.newNumber,a=n.addName,u=n.nameValueChange,o=n.numberValueChange;return Object(r.jsxs)("form",{onSubmit:a,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:t,onChange:u})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:c,onChange:o})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.name,t=e.number,c=e.deleteNumberHandler;return Object(r.jsxs)("p",{children:[n," ",t," ",Object(r.jsx)("button",{onClick:c,children:"delete"})]})},d=function(e){var n=e.notification,t=e.error;return null===n?null:t?Object(r.jsx)("h1",{className:"message error",children:n}):Object(r.jsx)("h1",{className:"message notification",children:n})},b=t(4),j=t.n(b),m="/api/persons",h=function(){return j.a.get(m).then((function(e){return e.data}))},O=function(e){return j.a.post(m,e).then((function(e){return e.data}))},v=function(e){return j.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},p=function(e){return j.a.delete("".concat(m,"/").concat(e))},x=(t(39),function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],u=Object(c.useState)(""),b=Object(i.a)(u,2),j=b[0],m=b[1],x=Object(c.useState)(""),g=Object(i.a)(x,2),w=g[0],C=g[1],N=Object(c.useState)(""),k=Object(i.a)(N,2),y=k[0],S=k[1],V=Object(c.useState)([null,!1]),L=Object(i.a)(V,2),P=L[0],A=L[1];Object(c.useEffect)((function(){h().then((function(e){return a(e)}))}),[]);var E={nameValueChange:function(e){return m(e.target.value)},numberValueChange:function(e){return C(e.target.value)},addName:function(e){if(e.preventDefault(),0!==j.trim().length){var n=t.find((function(e){return e.name===j}));if(n){if(window.confirm("".concat(j," is already in the phonebook! Update number?"))){var r=Object(o.a)(Object(o.a)({},n),{},{number:w});v(r).then((function(e){var r=t.map((function(n){return n.id===e.id?e:n}));a(r),A(["Phone number of ".concat(n.name," successfully updated!"),!1])})).catch((function(e){return A([e.response.data.error,!0])}))}}else{var c={name:j,number:w};O(c).then((function(e){a(t.concat(e)),A(["New phone number for ".concat(c.name," successfully added!"),!1])})).catch((function(e){return A([e.response.data.error,!0])}))}m(""),C("")}}},H=t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));return setTimeout((function(){A([null,!1])}),1e4),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(d,{notification:P[0],error:P[1]}),Object(r.jsx)(s,{filter:y,filterValueChange:function(e){return S(e.target.value.trim())}}),Object(r.jsx)("h2",{children:"add a new"}),Object(r.jsx)(f,{formActionListeners:E,newName:j,newNumber:w}),Object(r.jsx)("h2",{children:"Numbers"}),H.map((function(e){return Object(r.jsx)(l,{name:e.name,number:e.number,deleteNumberHandler:(n=e.id,function(){var e=t.find((function(e){return e.id===n}));window.confirm("Really delete ".concat(e.name,"?"))&&p(n).then((function(){var r=t.filter((function(e){return e.id!==n}));a(r),A(["Phone number of ".concat(e.name," deleted!"),!0])})).catch((function(e){A(["Information for this person does not exist on the server!",!0])}))})},e.name);var n}))]})});u.a.render(Object(r.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.45c19414.chunk.js.map