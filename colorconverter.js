function HSV(r,t,a){r<=0&&(r=0),t<=0&&(t=0),a<=0&&(a=0),360<r&&(r=360),100<t&&(t=100),100<a&&(a=100),this.h=r,this.s=t,this.v=a}function HSL(r,t,a){r<=0&&(r=0),t<=0&&(t=0),a<=0&&(a=0),360<r&&(r=360),100<t&&(t=100),100<a&&(a=100),this.h=r,this.s=t,this.l=a}function RGB(r,t,a){r<=0&&(r=0),t<=0&&(t=0),a<=0&&(a=0),255<r&&(r=255),255<t&&(t=255),255<a&&(a=255),this.r=r,this.g=t,this.b=a}function CMYK(r,t,a,n){r<=0&&(r=0),t<=0&&(t=0),a<=0&&(a=0),n<=0&&(n=0),100<r&&(r=100),100<t&&(t=100),100<a&&(a=100),100<n&&(n=100),this.c=r,this.m=t,this.y=a,this.k=n}var ColorConverter={_RGBtoHSV:function(t){var a=new HSV(0,0,0);r=t.r/255,g=t.g/255,b=t.b/255;var n=Math.min(r,g,b),h=Math.max(r,g,b),o=h-n;return a.v=h,0==o?(a.h=0,a.s=0):(a.s=o/h,t=((h-r)/6+o/2)/o,n=((h-g)/6+o/2)/o,o=((h-b)/6+o/2)/o,r==h?a.h=o-n:g==h?a.h=1/3+t-o:b==h&&(a.h=2/3+n-t),a.h<0&&(a.h+=1),1<a.h&&--a.h),a.h=Math.round(360*a.h),a.s=Math.round(1e3*a.s)/10,a.v=Math.round(1e3*a.v)/10,a},_HSVtoRGB:function(r){var t=new RGB(0,0,0),a=r.h/360,n=r.s/100,r=r.v/100;return 0==n?(t.r=255*r,t.g=255*r,t.v=255*r):(var_h=6*a,var_i=Math.floor(var_h),var_1=r*(1-n),var_2=r*(1-n*(var_h-var_i)),var_3=r*(1-n*(1-(var_h-var_i))),var_b=0==var_i?(var_r=r,var_g=var_3,var_1):1==var_i?(var_r=var_2,var_g=r,var_1):2==var_i?(var_r=var_1,var_g=r,var_3):3==var_i?(var_r=var_1,var_g=var_2,r):4==var_i?(var_r=var_3,var_g=var_1,r):(var_r=r,var_g=var_1,var_2),t.r=255*var_r,t.g=255*var_g,t.b=255*var_b,t.r=Math.round(t.r),t.g=Math.round(t.g),t.b=Math.round(t.b)),t},_RGBtoHSL:function(t){var a=new HSL(0,0,0);r=t.r/255,g=t.g/255,b=t.b/255;var n=Math.max(r,g,b),t=Math.min(r,g,b);if(a.l=(n+t)/2,n==t)a.h=a.s=0;else{var h=n-t;switch(a.s=.5<a.l?h/(2-n-t):h/(n+t),n){case r:a.h=(g-b)/h+(g<b?6:0);break;case g:a.h=(b-r)/h+2;break;case b:a.h=(r-g)/h+4}}return a.h=Math.round(60*a.h),a.s=Math.round(1e3*a.s)/10,a.l=Math.round(1e3*a.l)/10,a},_HSLtoRGB:function(r){var t=new RGB(0,0,0),a=r.h/360,n=r.s/100,r=r.l/100;function h(r,t,a){return a<0&&(a+=1),1<a&&--a,a<1/6?r+6*(t-r)*a:a<.5?t:a<2/3?r+(t-r)*(2/3-a)*6:r}return 0==n?t.r=t.g=t.b=r:(n=2*r-(r=r<.5?r*(1+n):r+n-r*n),t.r=h(n,r,a+1/3),t.g=h(n,r,a),t.b=h(n,r,a-1/3)),t.r=Math.round(255*t.r),t.g=Math.round(255*t.g),t.b=Math.round(255*t.b),t},_CMYKtoRGB:function(r){var t=new RGB(0,0,0);return c=r.c/100,m=r.m/100,y=r.y/100,k=r.k/100,t.r=1-Math.min(1,c*(1-k)+k),t.g=1-Math.min(1,m*(1-k)+k),t.b=1-Math.min(1,y*(1-k)+k),t.r=Math.round(255*t.r),t.g=Math.round(255*t.g),t.b=Math.round(255*t.b),t},_RGBtoCMYK:function(t){var a=new CMYK(0,0,0,0);return r=t.r/255,g=t.g/255,b=t.b/255,a.k=Math.min(1-r,1-g,1-b),1-a.k==0?(a.c=0,a.m=0,a.y=0):(a.c=(1-r-a.k)/(1-a.k),a.m=(1-g-a.k)/(1-a.k),a.y=(1-b-a.k)/(1-a.k)),a.c=Math.round(100*a.c),a.m=Math.round(100*a.m),a.y=Math.round(100*a.y),a.k=Math.round(100*a.k),a},toRGB:function(r){return r instanceof RGB?r:r instanceof HSV?this._HSVtoRGB(r):r instanceof HSL?this._HSLtoRGB(r):r instanceof CMYK?this._CMYKtoRGB(r):void 0},toHSV:function(r){return r instanceof HSV?r:r instanceof RGB?this._RGBtoHSV(r):r instanceof CMYK?this._RGBtoHSV(this._CMYKtoRGB(r)):void 0},toHSL:function(r){return r instanceof HSL?r:r instanceof RGB?this._RGBtoHSL(r):void 0},toCMYK:function(r){return r instanceof CMYK?r:r instanceof RGB?this._RGBtoCMYK(r):r instanceof HSV?this._RGBtoCMYK(this._HSVtoRGB(r)):void 0}};