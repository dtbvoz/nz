var autoChapterIndex,showChapterRelated;!function(a,n){var e,c={homePage:"https://www.fineshopdesign.com",titleLength:"auto",containerId:"aChp",newTabLink:!1,callBack:function(){}};for(e in autoChapterConfig)c[e]=("undefined"==autoChapterConfig[e]?c:autoChapterConfig)[e];function r(e){var t=a.createElement("script");t.async="async",t.rel="preload",t.src=e,n.appendChild(t)}function s(e){var t,a,n=e.length;if(0===n)return!1;for(;--n;)t=Math.floor(Math.random()*(n+1)),a=e[n],e[n]=e[t],e[t]=a;return e}var l="object"==typeof labelArray&&0<labelArray.length?"/-/"+s(labelArray)[0]:"";autoChapterIndex=function(e){var t=e.feed.openSearch$totalResults.$t-2,e=(e=1,t=0<t?t:1,Math.floor(Math.random()*(t-e+1))+e);r(c.homePage.replace(/\/$/,"")+"/feeds/posts/summary"+l+"?alt=json-in-script&orderby=updated&start-index="+e+"&max-results=2&callback=showChapterRelated")},showChapterRelated=function(e){var t,a,n=document.getElementById(c.containerId),r=s(e.feed.entry),l="<div class='chpN'>",o=c.newTabLink?' target="_blank"':"";if(n){for(var i=0;i<2&&i!=r.length;i++){a=r[i].title.$t,a="auto"!==c.titleLength&&c.titleLength<a.length?a.substring(0,c.titleLength)+"&hellip;":a;for(var h=0,d=r[i].link.length;h<d;h++)t="alternate"==r[i].link[h].rel?r[i].link[h].href:"#";l+='<a href="'+t+'" '+o+' data-text="'+a+'"></a>'}n.innerHTML=l+="</div>",c.callBack()}},r(c.homePage.replace(/\/$/,"")+"/feeds/posts/summary"+l+"?alt=json-in-script&orderby=updated&max-results=0&callback=autoChapterIndex")}((window,document),document.getElementsByTagName("head")[0]);