/* Copy Pre Content */
for(var preClick=document.getElementsByTagName("pre"),i=0;i<preClick.length;i++)preClick[i].addEventListener("dblclick",function(){var e=getSelection(),o=document.createRange();o.selectNodeContents(this),e.removeAllRanges(),e.addRange(o),document.execCommand("copy"),e.removeAllRanges(),toastNotif(PuSet.preCopy.copiedMes);vibRate(75)},!1);