/* =============================================================
   GEMEINSAME FUNKTIONEN – von index.html UND projekt.html genutzt.
   Liest projekt.txt-Dateien und wandelt sie in JS-Objekte um.
   ============================================================= */

function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

// Wandelt den Inhalt einer projekt.txt in ein Projekt-Objekt um.
function parseProjekt(text, folder){
  const lines = text.split(/\r?\n/);
  const p = { folder, tags: [], images: [] };
  let desc = null;
  for(const line of lines){
    if(desc !== null){ desc.push(line); continue; }
    if(/^\s*#/.test(line) || line.trim() === "") continue;
    const m = line.match(/^\s*([\wäöüÄÖÜ]+)\s*:\s*(.*)$/);
    if(!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if(key === "titel") p.title = val;
    else if(key === "untertitel") p.subtitle = val;
    else if(key === "kategorie" || key === "kategorien") p.category = val;
    else if(key === "jahr") p.year = val;
    else if(key === "tags") p.tags = val.split(",").map(s => s.trim()).filter(Boolean);
    else if(key === "link") p.link = val;
    else if(key === "linktext") p.linkText = val;
    else if(key === "nummer" || key === "num") p.num = val;
    else if(key === "featured") p.featured = /^(ja|yes|true|1)$/i.test(val);
    else if(key === "bild" || key === "bilder") p.images = val.split(",").map(s => s.trim()).filter(Boolean).map(b => "projekte/" + folder + "/" + b);
    else if(key === "beschreibung") desc = [val];
  }
  if(desc !== null) p.desc = desc.join("\n").trim();
  p.image = p.images[0] || "";
  return p;
}

// Lädt die Ordnerliste + alle projekt.txt-Dateien. Gibt ein Array von Projekt-Objekten zurück.
async function loadAllProjects(){
  const listeTxt = await fetch("projekte/liste.txt").then(r => { if(!r.ok) throw 0; return r.text(); });
  const folders = listeTxt.split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith("#"));
  const projects = [];
  for(const f of folders){
    try{
      const txt = await fetch("projekte/" + f + "/projekt.txt").then(r => { if(!r.ok) throw 0; return r.text(); });
      const p = parseProjekt(txt, f);
      if(p.title) projects.push(p);
    }catch(e){ console.warn("Ordner konnte nicht gelesen werden:", f); }
  }
  // Automatische Nummerierung in Listen-Reihenfolge (01, 02, ...)
  projects.forEach((p, i) => { if(!p.num) p.num = String(i+1).padStart(2, "0"); });
  return projects;
}
