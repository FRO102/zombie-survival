import { OUTFIT_PRESETS, SKIN_PRESETS, CUSTOM_STORAGE_KEY } from './constants.js';

export const playerLook = {
  outfit: 'militia',
  skin: 'warm',
  body: OUTFIT_PRESETS.militia.body,
  bodyDk: OUTFIT_PRESETS.militia.bodyDk,
  skinColor: SKIN_PRESETS.warm
};

let customPreviewCtx = null;
let customPreviewCanvas = null;

export function initCharacter() {
  const preview = document.getElementById('custom-preview');
  if(preview) {
    customPreviewCanvas = preview;
    customPreviewCtx = preview.getContext('2d');
  }
  loadCharacterLook();
}

export function applyCharacterLook(outfit, skin, save) {
  const outfitDef = OUTFIT_PRESETS[outfit] || OUTFIT_PRESETS.militia;
  const skinColor = SKIN_PRESETS[skin] || SKIN_PRESETS.warm;
  playerLook.outfit = OUTFIT_PRESETS[outfit] ? outfit : 'militia';
  playerLook.skin = SKIN_PRESETS[skin] ? skin : 'warm';
  playerLook.body = outfitDef.body;
  playerLook.bodyDk = outfitDef.bodyDk;
  playerLook.skinColor = skinColor;
  const customOutfit = document.getElementById('custom-outfit');
  const customSkin = document.getElementById('custom-skin');
  if(customOutfit) customOutfit.value = playerLook.outfit;
  if(customSkin) customSkin.value = playerLook.skin;
  drawCharacterPreview();
  if(save !== false) saveCharacterLook();
}

export function drawCharacterPreview() {
  if(!customPreviewCtx) return;
  const pctx = customPreviewCtx;
  const canvas = customPreviewCanvas;
  pctx.clearRect(0,0,canvas.width,canvas.height);
  pctx.fillStyle = '#0b0d08';
  pctx.fillRect(0,0,canvas.width,canvas.height);
  pctx.fillStyle = 'rgba(0,0,0,0.35)';
  pctx.beginPath();
  pctx.ellipse(60,76,20,9,0,0,Math.PI*2);
  pctx.fill();
  pctx.fillStyle = playerLook.body;
  pctx.beginPath();
  pctx.ellipse(60,62,20,17,0,0,Math.PI*2);
  pctx.fill();
  pctx.fillStyle = playerLook.bodyDk;
  pctx.beginPath();
  pctx.ellipse(60,68,17,10,0,0,Math.PI*2);
  pctx.fill();
  pctx.fillStyle = '#2a2a24';
  pctx.fillRect(76,58,20,7);
  pctx.fillStyle = playerLook.skinColor;
  pctx.beginPath();
  pctx.arc(67,62,10,0,Math.PI*2);
  pctx.fill();
}

export function loadCharacterLook() {
  try{
    const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if(!raw) return;
    const parsed = JSON.parse(raw);
    if(parsed && OUTFIT_PRESETS[parsed.outfit] && SKIN_PRESETS[parsed.skin]) {
      applyCharacterLook(parsed.outfit, parsed.skin, false);
    }
  } catch(err){}
}

export function saveCharacterLook() {
  try{
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify({
      outfit: playerLook.outfit,
      skin: playerLook.skin
    }));
  } catch(err){}
}