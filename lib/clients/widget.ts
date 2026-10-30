/**
 * Bouton « Laisser un retour » injecté avant </body> dans chaque page HTML de maquette.
 * Tout vit dans un shadow DOM : aucun style de la maquette ne fuit dedans, aucun style du
 * bouton ne fuit dans la maquette. Les événements clavier et souris sont arrêtés à la frontière,
 * pour ne pas déclencher les raccourcis ni le compteur de clics de la maquette.
 */

type ConfigWidget = {
  api: string;
  base: string;
  version: string;
  projet: string;
};

function jsonPourScript(valeur: unknown) {
  return JSON.stringify(valeur)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const STYLE = `
:host { all: initial; }
* { box-sizing: border-box; }
[hidden] { display: none !important; }
.racine {
  --fond: #ffffff; --encre: #09090b; --encre-2: #52525b; --filet: #e4e4e7; --champ: #fafafa;
  --accent: #059669; --accent-texte: #047857; --erreur: #b91c1c; --ombre: 0 18px 48px -12px rgba(9,9,11,.35), 0 4px 12px -4px rgba(9,9,11,.18);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 14px; line-height: 1.45; color: var(--encre); -webkit-font-smoothing: antialiased;
}
:host([data-sombre]) .racine {
  --fond: #18181b; --encre: #fafafa; --encre-2: #a1a1aa; --filet: #3f3f46; --champ: #09090b;
  --accent: #10b981; --accent-texte: #34d399; --erreur: #f87171; --ombre: 0 18px 48px -12px rgba(0,0,0,.7), 0 4px 12px -4px rgba(0,0,0,.5);
}
.onglet {
  position: fixed; right: 0; top: 58%; z-index: 2147483000;
  transform: translateY(-50%); writing-mode: vertical-rl; rotate: 180deg;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 9px; border: 1px solid #27272a; border-left: 0;
  background: #09090b; color: #fafafa; cursor: pointer;
  font-family: inherit; font-size: 13px; font-weight: 500; line-height: 1; letter-spacing: .01em;
  box-shadow: 0 6px 18px -6px rgba(9,9,11,.45);
  transition: background-color .18s cubic-bezier(.16,1,.3,1), box-shadow .18s cubic-bezier(.16,1,.3,1);
}
.onglet:hover { background: #27272a; box-shadow: 0 10px 24px -6px rgba(9,9,11,.55); }
.onglet:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.onglet .point { width: 6px; height: 6px; background: #10b981; display: inline-block; }
.onglet[aria-expanded="true"] { visibility: hidden; }
.panneau {
  position: fixed; right: 16px; bottom: 16px; z-index: 2147483001;
  width: min(380px, calc(100vw - 32px)); max-height: calc(100vh - 32px); overflow: auto;
  background: var(--fond); color: var(--encre); border: 1px solid var(--filet); box-shadow: var(--ombre);
  opacity: 0; translate: 0 8px; transition: opacity .2s cubic-bezier(.16,1,.3,1), translate .2s cubic-bezier(.16,1,.3,1);
}
.panneau.ouvert { opacity: 1; translate: 0 0; }
.panneau[hidden] { display: none; }
.tete { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px 12px; border-bottom: 1px solid var(--filet); }
.titre { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: -.01em; display: flex; align-items: center; gap: 8px; }
.titre .point { width: 6px; height: 6px; background: var(--accent); display: inline-block; }
.fermer { border: 1px solid transparent; background: transparent; color: var(--encre-2); cursor: pointer; width: 30px; height: 30px; display: grid; place-items: center; }
.fermer:hover { color: var(--encre); border-color: var(--filet); }
.fermer:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
form { display: grid; gap: 12px; padding: 14px 16px 16px; margin: 0; }
.ligne { display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: end; }
label { display: grid; gap: 5px; font-size: 12px; font-weight: 500; color: var(--encre-2); }
input, textarea {
  width: 100%; font: inherit; font-size: 14px; color: var(--encre); background: var(--champ);
  border: 1px solid var(--filet); border-radius: 0; padding: 8px 10px; margin: 0;
}
textarea { min-height: 120px; resize: vertical; }
input::placeholder, textarea::placeholder { color: var(--encre-2); opacity: .8; }
.version { font-size: 12px; font-weight: 600; padding: 9px 10px; border: 1px solid var(--filet); color: var(--encre); white-space: nowrap; }
.aide { margin: 0; font-size: 12px; color: var(--encre-2); }
.compteur { font-variant-numeric: tabular-nums; }
.actions { display: flex; gap: 8px; justify-content: flex-end; align-items: center; }
.btn { font: inherit; font-size: 13px; font-weight: 500; padding: 9px 14px; border: 1px solid var(--encre); cursor: pointer; border-radius: 0; }
.btn.plein { background: var(--encre); color: var(--fond); }
.btn.plein:hover { opacity: .88; }
.btn.plein:disabled { opacity: .5; cursor: progress; }
.btn.discret { background: transparent; color: var(--encre); border-color: var(--filet); }
.btn.discret:hover { border-color: var(--encre); }
.etat { margin: 0; font-size: 13px; min-height: 0; }
.etat.erreur { color: var(--erreur); }
.merci { padding: 22px 16px 18px; display: grid; gap: 10px; }
.merci p { margin: 0; }
.merci strong { display: flex; align-items: center; gap: 8px; font-size: 15px; color: var(--accent-texte); }
.merci strong .point { width: 6px; height: 6px; background: var(--accent); display: inline-block; }
@media (max-width: 480px) {
  .panneau { right: 8px; left: 8px; bottom: 8px; width: auto; }
  .onglet { top: auto; bottom: 120px; }
}
@media (prefers-reduced-motion: reduce) { .panneau, .onglet { transition: none; } }
`;

const HTML = `
<div class="racine">
  <button type="button" class="onglet" aria-expanded="false" aria-controls="ms-panneau"><span class="point" aria-hidden="true"></span>Laisser un retour</button>
  <section class="panneau" id="ms-panneau" role="dialog" aria-labelledby="ms-titre" hidden>
    <div class="tete">
      <p class="titre" id="ms-titre"><span class="point" aria-hidden="true"></span>Votre retour sur la maquette</p>
      <button type="button" class="fermer" aria-label="Fermer">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>
      </button>
    </div>
    <form novalidate>
      <div class="ligne">
        <label>Page concernée<input name="page" maxlength="300" autocomplete="off"></label>
        <span class="version" title="Version de la maquette"></span>
      </div>
      <label>Votre remarque<textarea name="texte" maxlength="4000" required placeholder="Ce qui vous gêne, ce qui manque…"></textarea></label>
      <p class="aide">Envoyé à Medica Studio avec votre prénom. <span class="compteur">0 / 4000</span></p>
      <p class="etat" role="status" aria-live="polite"></p>
      <div class="actions">
        <button type="button" class="btn discret annuler">Annuler</button>
        <button type="submit" class="btn plein">Envoyer</button>
      </div>
    </form>
    <div class="merci" hidden>
      <strong><span class="point" aria-hidden="true"></span>Retour bien reçu, merci.</strong>
      <p class="aide">Vous pouvez en laisser un autre à tout moment.</p>
      <div class="actions"><button type="button" class="btn discret autre">Laisser un autre retour</button><button type="button" class="btn plein fini">Fermer</button></div>
    </div>
  </section>
</div>`;

const SCRIPT = `
(function () {
  if (window.__medicaRetour) return; window.__medicaRetour = true;
  var cfg = __CONFIG__;
  var hote = document.createElement("div");
  hote.setAttribute("data-medica-retour", "");
  var ombre = hote.attachShadow({ mode: "open" });
  ombre.innerHTML = "<style>" + __STYLE__ + "</style>" + __HTML__;
  ["click", "mousedown", "mouseup", "pointerdown", "pointerup", "keydown", "keyup", "keypress", "input", "change", "focusin", "focusout", "submit"].forEach(function (t) {
    hote.addEventListener(t, function (e) { e.stopPropagation(); });
  });
  var $ = function (s) { return ombre.querySelector(s); };
  var onglet = $(".onglet"), panneau = $(".panneau"), form = $("form"), merci = $(".merci");
  var champPage = form.elements.page, champTexte = form.elements.texte, etat = $(".etat"), envoyer = $(".btn.plein"), compteur = $(".compteur");
  $(".version").textContent = cfg.version;

  function sombre() {
    var t = document.documentElement.getAttribute("data-theme");
    var auto = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (t === "dark" || (t !== "light" && auto)) hote.setAttribute("data-sombre", ""); else hote.removeAttribute("data-sombre");
  }
  sombre();
  try { new MutationObserver(sombre).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] }); } catch (e) {}
  try { window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", sombre); } catch (e) {}

  function pageCourante() {
    var p = location.pathname;
    try { p = decodeURIComponent(p); } catch (e) {}
    if (p.indexOf(cfg.base) === 0) p = p.slice(cfg.base.length);
    var titre = "";
    var h = document.querySelector("main h1, h1");
    if (h && h.textContent) titre = h.textContent.replace(/\\s+/g, " ").trim().slice(0, 80);
    return (p + location.hash + (titre ? " · " + titre : "")).slice(0, 300);
  }
  function ouvrir() {
    champPage.value = pageCourante();
    form.hidden = false; merci.hidden = true; etat.textContent = ""; etat.className = "etat";
    panneau.hidden = false; onglet.setAttribute("aria-expanded", "true");
    requestAnimationFrame(function () { panneau.classList.add("ouvert"); champTexte.focus(); });
  }
  function fermer() {
    panneau.classList.remove("ouvert"); panneau.hidden = true;
    onglet.setAttribute("aria-expanded", "false"); onglet.focus();
  }
  onglet.addEventListener("click", ouvrir);
  $(".fermer").addEventListener("click", fermer);
  $(".annuler").addEventListener("click", fermer);
  $(".fini").addEventListener("click", fermer);
  $(".autre").addEventListener("click", function () { champTexte.value = ""; compteur.textContent = "0 / 4000"; ouvrir(); });
  panneau.addEventListener("keydown", function (e) { if (e.key === "Escape") fermer(); });
  champTexte.addEventListener("input", function () { compteur.textContent = champTexte.value.length + " / 4000"; });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var texte = champTexte.value.trim();
    if (!texte) { etat.textContent = "Écrivez votre remarque avant d'envoyer."; etat.className = "etat erreur"; champTexte.focus(); return; }
    envoyer.disabled = true; envoyer.textContent = "Envoi…"; etat.textContent = ""; etat.className = "etat";
    fetch(cfg.api, {
      method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texte: texte, page: champPage.value.slice(0, 300), version: cfg.version })
    }).then(function (r) {
      if (r.ok) { champTexte.value = ""; compteur.textContent = "0 / 4000"; form.hidden = true; merci.hidden = false; merci.querySelector(".fini").focus(); return; }
      etat.className = "etat erreur";
      etat.textContent = r.status === 401
        ? "Votre session a expiré. Rouvrez l'espace client puis réessayez ; votre texte est conservé ici."
        : r.status === 413 ? "Texte trop long : 4000 caractères au plus."
        : r.status === 429 ? "Trop d'envois rapprochés. Réessayez dans une minute."
        : "Envoi impossible pour le moment. Réessayez dans un instant.";
    }).catch(function () {
      etat.className = "etat erreur"; etat.textContent = "Pas de connexion. Votre texte est conservé ; réessayez quand le réseau revient.";
    }).then(function () { envoyer.disabled = false; envoyer.textContent = "Envoyer"; });
  });

  (document.body || document.documentElement).appendChild(hote);
})();
`;

export function widgetRetour(config: ConfigWidget): string {
  const script = SCRIPT.replace("__CONFIG__", () => jsonPourScript(config))
    .replace("__STYLE__", () => jsonPourScript(STYLE))
    .replace("__HTML__", () => jsonPourScript(HTML));
  return `\n<!-- Medica Studio : retours clients -->\n<script>${script}</script>\n`;
}

/** Insère le bouton juste avant la dernière balise </body>, ou à la fin du document. */
export function injecterWidget(html: string, config: ConfigWidget): string {
  const bloc = widgetRetour(config);
  const i = html.toLowerCase().lastIndexOf("</body>");
  return i === -1 ? html + bloc : html.slice(0, i) + bloc + html.slice(i);
}
