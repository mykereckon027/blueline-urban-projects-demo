(function(){
  const d=window.BLUELINE_DATA;
  const header=document.querySelector('header');
  if(header){
    const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>20); onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
    const menuBtn=header.querySelector('.menu-btn'), mobile=header.querySelector('.mobile-menu');
    if(menuBtn&&mobile){menuBtn.addEventListener('click',()=>{const open=!mobile.classList.contains('open');mobile.classList.toggle('open',open);mobile.setAttribute('aria-hidden',String(!open));menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'Close':'Menu';});}
  }
  const projectCards=(items,target)=>{
    if(!target)return;
    target.innerHTML=items.map((p,i)=>`<article class="project-card ${i===0?'featured':''}"><a href="project.html?slug=${p.slug}"><div class="project-image"><img src="${p.image}" alt="${p.name} project photograph" loading="${i<2?'eager':'lazy'}" referrerpolicy="no-referrer"></div><div class="project-copy"><div class="project-meta"><span>${p.category}</span><span>${p.location}</span></div><div class="project-name">${p.name}</div><div class="project-desc">${p.description}</div><div class="arrow"><span>View project</span><span>↗</span></div></div></a></article>`).join('');
  };
  const homeGrid=document.querySelector('[data-home-projects]'); if(homeGrid) projectCards(d.projects.slice(0,4),homeGrid);
  const projectGrid=document.querySelector('[data-projects]');
  if(projectGrid){
    let active='All', q='';
    const render=()=>{let items=d.projects.filter(p=>(active==='All'||p.category===active||p.status===active)&&(p.name+' '+p.location+' '+p.description).toLowerCase().includes(q.toLowerCase()));projectCards(items,projectGrid);const count=document.querySelector('[data-result-count]');if(count)count.textContent=`${items.length} documented project${items.length===1?'':'s'}`};
    document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');active=btn.dataset.filter;render()}));
    const s=document.querySelector('[data-search]'); if(s)s.addEventListener('input',e=>{q=e.target.value;render()}); render();
  }
  const projectPage=document.querySelector('[data-project-page]');
  if(projectPage){
    const slug=new URLSearchParams(location.search).get('slug'); const p=d.projects.find(x=>x.slug===slug)||d.projects[0];
    document.title=`${p.name} — Blueline Urban Projects`;
    const facts=p.facts.map(([label,val])=>`<div class="fact"><div class="value">${val}</div><div class="label">${label}</div></div>`).join('');
    const team=(p.team||[]).map(([role,name])=>`<div class="team-row"><div>${role}</div><div>${name}</div></div>`).join('');
    const gallery=(p.gallery||[p.image]).slice(0,6).map((src,i)=>`<div><img src="${src}" alt="${p.name} project image ${i+1}" loading="lazy" referrerpolicy="no-referrer"></div>`).join('');
    projectPage.innerHTML=`<main><div class="case-hero"><div class="container"><div class="case-hero-grid"><div><div class="mono">${p.category} · ${p.location}</div><h1>${p.name}</h1><p class="body-copy">${p.description}</p><div class="actions"><a class="cta dark" href="start-a-project.html">Start a Project</a><a class="cta" href="projects.html">Explore Projects</a></div></div><div class="case-image"><img src="${p.image}" alt="${p.name} project" referrerpolicy="no-referrer"/></div></div><div class="facts-grid">${facts}</div></div></div><div class="page-body"><div class="container"><div class="case-sections"><div><div class="mono eyebrow">Project overview</div><h2>What the public record shows.</h2><p class="body-copy">${p.description}</p><p class="note">Historical project record. Current status and any details that have changed should be confirmed directly with Blueline before production publication.</p></div><div><div class="mono eyebrow">Blueline role</div><h2>${p.role}</h2><div class="team">${team||'<div class="note">Project team details were not available in the public record.</div>'}</div><p class="note">Source: <a href="${p.source}" target="_blank" rel="noreferrer">Blueline project archive ↗</a></p></div></div><div class="gallery">${gallery}</div></div></div><div class="band"><div class="container band-inner"><div><div class="mono">Next step</div><h2>Planning a project?</h2><p>Tell Blueline what you are building and what stage you are at.</p></div><a class="cta" href="start-a-project.html">Start a Project →</a></div></div></main>`;
  }
  const form=document.querySelector('[data-inquiry]'); if(form){form.addEventListener('submit',e=>{e.preventDefault();form.style.display='none';const s=document.querySelector('[data-success]');if(s)s.style.display='block';});}
})();
