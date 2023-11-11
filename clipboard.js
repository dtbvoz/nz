function copyStringToClipboard(str) {
   var el = document.createElement('textarea');
   el.value = str;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   var ret=document.execCommand('copy');
   document.body.removeChild(el);
   return ret;
}

function tempAlert(msg,duration){
 var el = document.createElement("div");
 var left=(window.innerWidth-(msg.length*8))/2;
 el.setAttribute("style","position:fixed;top:70%;left:"+left+"px;border:1px solid #000000;color:#fff7e5;background-color:#0000A0;padding:10px");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}