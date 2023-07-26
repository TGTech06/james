async function d(o){const c=(await o.from("documents").select("name:metadata->>file_name, size:metadata->>file_size",{count:"exact"})).data.reduce((t,s)=>(t.find(r=>r.name===s.name)||t.push(s),t),[]);return c.sort((t,s)=>parseInt(s.size)-parseInt(t.size)),c}function p(o,i){o.from("documents").select("name:metadata->>file_name, size:metadata->>file_size",{count:"exact"}).then(n=>{const t=n.data.reduce((e,a)=>(e.find(m=>m.name===a.name)||e.push(a),e),[]);t.sort((e,a)=>parseInt(a.size)-parseInt(e.size));const s=t.length,u=t.reduce((e,a)=>e+parseInt(a.size),0),r=document.getElementById("displayText");r.innerHTML=`
        <p>Total Documents: ${s}</p>
        <p>Total Size (bytes): ${u}</p>
      `,t.forEach(e=>{`${e.name}`,r.innerHTML+=`
        <p><strong>${e.name}</strong> (${e.size} bytes) <button data-doc-name="${e.name}" onclick="handleDeleteDocument(event)">❌</button></p>
      `})}).catch(n=>{console.error("Error:",n)})}async function f(o,i){try{return(await o.from("documents").delete().match({"metadata->>file_name":i})).error==null}catch(n){return console.error("Error:",n),!1}}export{p as b,f as d,d as g};
