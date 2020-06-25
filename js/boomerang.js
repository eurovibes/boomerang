/* SPDX-License-Identifier: GPL-2.0-only */
/* Copyright (c) 2020 Benedikt Spranger */

import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.min.js'

function init() {
    var app = new Vue({
	el: '#app',
	data: {
	    message: 'You loaded this page on ' + new Date().toLocaleString(),
	    alpha: {angle: 'a', ts: 'now'},
	    beta: {angle: 'b', ts: 'now'},
	    gamma: {angle: 'c', ts: 'now'},
	    event: 'now',
	    doe: 'unknown',
	},
	created: function () {
	    console.log('created');
	    if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation',
					detectOrientationChange, false);
		this.doe = "supported!";
	    }
	    else
		this.doe = "not supported!";
	},
	destroyed: function () {
	    console.log('destroyed');
	    window.removeEventListener('deviceorientation',
				       detectOrientationChange);
	    this.orientation = "unknown.";
	},
    });

    function detectOrientationChange(event) {
	console.log(event);
	var ts = new Date().toLocaleString();
	var update = 0;
	app.event = ts;
	if (debounce(app.alpha.angle, event.alpha)) {
	    app.alpha.angle = event.alpha;
	    app.alpha.ts = ts.repeat(1);
	    update = 1;
	}

	if (debounce(app.beta.angle, event.beta)) {
	    app.beta.angle = event.beta;
	    app.beta.ts = ts.repeat(1);
	    update = 1;
	}

	if (debounce(app.gamma.angle, event.gamma)) {
	    app.gamma.angle = event.gamma;
	    app.gamma.ts = ts.repeat(1);
	    update = 1;
	}

	if (update) {
	    var vid = document.getElementById("videoplayer");
	    if (app.beta.angle > 0 && app.beta.angle < 45) {
		if (!vid.paused)
		    vid.pause();
		if (!vid.controls)
		    vid.controls = true;
	    } else {
		if (vid.controls)
		    vid.controls = false;
		if (vid.paused)
		    vid.play();
	    }

	    if (app.gamma.angle < -45)
		vid.currentTime--;
	    else if (app.gamma.angle > 45)
		vid.currentTime++;
	}
    }

    function timer() {
	app.message = 'Update on ' + new Date().toLocaleString();
    }

    function debounce(a, b) {
	return (Math.abs(a - b) < 1) ? 0 : 1;
    }

    var updateTimer = setInterval (timer, 5000);
}

init();
