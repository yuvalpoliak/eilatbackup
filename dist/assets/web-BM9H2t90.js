import{W as t}from"./index-C5eucBmb.js";class a extends t{async getCurrentPosition(e){return new Promise((i,n)=>{navigator.geolocation.getCurrentPosition(o=>{i(o)},o=>{n(o)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))})}async watchPosition(e,i){const n=navigator.geolocation.watchPosition(o=>{i(o)},o=>{i(null,o)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e));return"".concat(n)}async clearWatch(e){window.navigator.geolocation.clearWatch(parseInt(e.id,10))}async checkPermissions(){if(typeof navigator>"u"||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");const e=await window.navigator.permissions.query({name:"geolocation"});return{location:e.state,coarseLocation:e.state}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}}const c=new a;export{c as Geolocation,a as GeolocationWeb};
