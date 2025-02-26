import * as dashjs from '../dash.all.min.js';

const url = "../videos/trailer_extraido.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);