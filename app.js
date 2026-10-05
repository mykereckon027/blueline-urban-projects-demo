(function(){
  const d=window.BLUELINE_DATA;
  const header=document.querySelector('header');
  if(header){window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20));}
  const projectCards=(items, target)=>{
    if(!target)return;
    target.innerHTML=items.map(p=>`<article class="project-card"><a href="project.html?slug=${p.slug}"><div class="project-image"><img src="${p.image}" alt="${p.name} project photograph" loading="lazy"></div><div class="project-copy"><div class="project-meta"><span>${p.category}</span><span>${p.location}</span></div><div class="project-name">${p.name}</div><div class="project-desc">${p.description}</div><div class="arrow"><span>View project</span><span>↗</span></div></div></a></article>`).join('');
  };
  const homeGrid=document.querySelector('[data-home-projects]'); if(homeGrid) projectCards(d.projects.slice(0,4),homeGrid);
  const projectGrid=document.querySelector('[data-projects]');
  if(projectGrid){
    let active='All', q='';
    const render=()=>{let items=d.projects.filter(p=>(active==='All'||p.category===active||p.status===active)&&(p.name+' '+p.location+' '+p.description).toLowerCase().includes(q.toLowerCase()));projectCards(items,projectGrid);document.querySelector('[data-result-count]').textContent=`${items.length} project${items.length===1?'':'s'}`};
    document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');active=btn.dataset.filter;render()}));
    const s=document.querySelector('[data-search]'); if(s)s.addEventListener('input',e=>{q=e.target.value;render()}); render();
  }
  const projectPage=document.querySelector('[data-project-page]');
  if(projectPage){
    const slug=new URLSearchParams(location.search).get('slug'); const p=d.projects.find(x=>x.slug===slug)||d.projects[0];
    document.title=`${p.name} — Blueline Urban Projects`;
    const facts=p.facts.map(([label,val])=>`<div class="fact"><div class="value">${val}</div><div class="label">${label}</div></div>`).join('');
    const team=(p.team||[]).map(([role,name])=>`<div class="team-row"><div>${role}</div><div>${name}</div></div>`).join('');
    projectPage.innerHTML=`<main><div class="case-hero"><div class="container"><div class="case-hero-grid"><div><div class="mono">${p.category} · ${p.location}</div><h1>${p.name}</h1><p class="body-copy">${p.description}</p><div class="actions"><a class="cta dark" href="start-a-project.html">Start a Project</a><a class="cta" href="projects.html">Explore Projects</a></div></div><div class="case-image"><img src="${p.image}" alt="${p.name} project"/></div></div><div class="facts-grid">${facts}</div></div></div><div class="page-body"><div class="container"><div class="case-sections"><div><div class="mono eyebrow">Project overview</div><h2>Documented work, presented with context.</h2><p class="body-copy">${p.description}</p><p class="note">Historical project record. Current status and any details that have changed should be confirmed directly with Blueline before production publication.</p></div><div><div class="mono eyebrow">Blueline role</div><h2>${p.role}</h2><div class="team">${team||'<div class="note">[CONTENT REQUIRED FROM BLUELINE]</div>'}</div><p class="note">Source: <a href="${p.source}" target="_blank" rel="noreferrer">Blueline project archive ↗</a></p></div></div><div class="gallery"><div><img src="${p.image}" alt="${p.name} project image" loading="lazy"></div><div><img src="${p.image}" alt="${p.name} project image" loading="lazy"></div></div></div></div><div class="band"><div class="container band-inner"><div><div class="mono">Next step</div><h2>Planning a project?</h2><p>Tell Blueline what you're building and what stage you're at.</p></div><a class="cta" href="start-a-project.html">Start a Project →</a></div></div></main>`;
  }
  const form=document.querySelector('[data-inquiry]'); if(form){form.addEventListener('submit',e=>{e.preventDefault();form.style.display='none';const s=document.querySelector('[data-success]');if(s)s.style.display='block';});}
})();
