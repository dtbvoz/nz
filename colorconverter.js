function HSV(h, s, v) {
	if (h <= 0) { h = 0; }
	if (s <= 0) { s = 0; }
	if (v <= 0) { v = 0; }
 
	if (h > 360) { h = 360; }
	if (s > 100) { s = 100; }
	if (v > 100) { v = 100; }
 
	this.h = h;
	this.s = s;
	this.v = v;
}

function HSL(h, s, l) {
	if (h <= 0) { h = 0; }
	if (s <= 0) { s = 0; }
	if (l <= 0) { l = 0; }
 
	if (h > 360) { h = 360; }
	if (s > 100) { s = 100; }
	if (l > 100) { l = 100; }
 
	this.h = h;
	this.s = s;
	this.l = l;
}
 
function RGB(r, g, b) {
	if (r <= 0) { r = 0; }
	if (g <= 0) { g = 0; }
	if (b <= 0) { b = 0; }
 
	if (r > 255) { r = 255; }
	if (g > 255) { g = 255; }
	if (b > 255) { b = 255; }
 
	this.r = r;
	this.g = g;
	this.b = b;
}
 
function CMYK(c, m, y, k) {
	if (c <= 0) { c = 0; }
	if (m <= 0) { m = 0; }
	if (y <= 0) { y = 0; }
	if (k <= 0) { k = 0; }
 
	if (c > 100) { c = 100; }
	if (m > 100) { m = 100; }
	if (y > 100) { y = 100; }
	if (k > 100) { k = 100; }
 
	this.c = c;
	this.m = m;
	this.y = y;
	this.k = k;
}
 
var ColorConverter = {
 
	_RGBtoHSV : function  (RGB) {
		var result = new HSV(0, 0, 0);
 
		r = RGB.r / 255;
		g = RGB.g / 255;
		b = RGB.b / 255;
 
		var minVal = Math.min(r, g, b);
		var maxVal = Math.max(r, g, b);
		var delta = maxVal - minVal;
 
		result.v = maxVal;
 
		if (delta == 0) {
			result.h = 0;
			result.s = 0;
		} else {
			result.s = delta / maxVal;
			var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
			var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
			var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;
 
			if (r == maxVal) { result.h = del_B - del_G; }
			else if (g == maxVal) { result.h = (1 / 3) + del_R - del_B; }
			else if (b == maxVal) { result.h = (2 / 3) + del_G - del_R; }
 
			if (result.h < 0) { result.h += 1; }
			if (result.h > 1) { result.h -= 1; }
		}
 
		result.h = Math.round(result.h * 360);
		result.s = Math.round(result.s * 1000)/10;
		result.v = Math.round(result.v * 1000)/10;
 
		return result;
	},
 
	_HSVtoRGB : function  (HSV) {
		var result = new RGB(0, 0, 0);
 
		var h = HSV.h / 360;
		var s = HSV.s / 100;
		var v = HSV.v / 100;
 
		if (s == 0) {
			result.r = v * 255;
			result.g = v * 255;
			result.v = v * 255;
		} else {
			var_h = h * 6;
			var_i = Math.floor(var_h);
			var_1 = v * (1 - s);
			var_2 = v * (1 - s * (var_h - var_i));
			var_3 = v * (1 - s * (1 - (var_h - var_i)));
 
			if (var_i == 0) {var_r = v; var_g = var_3; var_b = var_1}
			else if (var_i == 1) {var_r = var_2; var_g = v; var_b = var_1}
			else if (var_i == 2) {var_r = var_1; var_g = v; var_b = var_3}
			else if (var_i == 3) {var_r = var_1; var_g = var_2; var_b = v}
			else if (var_i == 4) {var_r = var_3; var_g = var_1; var_b = v}
			else {var_r = v; var_g = var_1; var_b = var_2};
 
			result.r = var_r * 255;
			result.g = var_g * 255;
			result.b = var_b * 255;
 
			result.r = Math.round(result.r);
			result.g = Math.round(result.g);
			result.b = Math.round(result.b);
		}
 
		return result;
	},

	_RGBtoHSL : function  (RGB) {
		var result = new HSL(0, 0, 0);
 
		r = RGB.r / 255;
		g = RGB.g / 255;
		b = RGB.b / 255;
 
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  result.l=(max + min) / 2;

  if (max == min) {
    result.h = result.s = 0; // achromatic
  } else {
    var d = max - min;
    result.s = result.l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: result.h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: result.h = (b - r) / d + 2; break;
      case b: result.h = (r - g) / d + 4; break;
    }
  } 
    result.h=Math.round(result.h*60);
    result.s=Math.round(result.s*1000)/10;
    result.l=Math.round(result.l*1000)/10;
 
		return result;
	},

	_HSLtoRGB : function  (HSL) {
		var result = new RGB(0, 0, 0);
    var h=HSL.h/360;
    var s=HSL.s/100;
    var l=HSL.l/100;
      
  if (s == 0) {
    result.r = result.g = result.b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    result.r = hue2rgb(p, q, h + 1/3);
    result.g = hue2rgb(p, q, h);
    result.b = hue2rgb(p, q, h - 1/3);
  }
  result.r=Math.round(result.r*255);
  result.g=Math.round(result.g*255);
  result.b=Math.round(result.b*255);
  
		return result;
	},
     
	_CMYKtoRGB : function (CMYK){
		var result = new RGB(0, 0, 0);
 
		c = CMYK.c / 100;
		m = CMYK.m / 100;
		y = CMYK.y / 100;
		k = CMYK.k / 100;
 
		result.r = 1 - Math.min( 1, c * ( 1 - k ) + k );
		result.g = 1 - Math.min( 1, m * ( 1 - k ) + k );
		result.b = 1 - Math.min( 1, y * ( 1 - k ) + k );
 
		result.r = Math.round( result.r * 255 );
		result.g = Math.round( result.g * 255 );
		result.b = Math.round( result.b * 255 );
 
		return result;
	},
 
	_RGBtoCMYK : function (RGB){
		var result = new CMYK(0, 0, 0, 0);
 
		r = RGB.r / 255;
		g = RGB.g / 255;
		b = RGB.b / 255;
 
		result.k = Math.min( 1 - r, 1 - g, 1 - b );
		if ((1 - result.k) == 0 ){
		  result.c = 0 ;
		  result.m = 0 ;
		  result.y = 0 ;
    } else {
		result.c = ( 1 - r - result.k ) / ( 1 - result.k );
		result.m = ( 1 - g - result.k ) / ( 1 - result.k );
		result.y = ( 1 - b - result.k ) / ( 1 - result.k );
    }
		result.c = Math.round( result.c * 100 );
		result.m = Math.round( result.m * 100 );
		result.y = Math.round( result.y * 100 );
		result.k = Math.round( result.k * 100 );
 
		return result;
	},
 
	toRGB : function (o) {
		if (o instanceof RGB) { return o; }
		if (o instanceof HSV) {	return this._HSVtoRGB(o); }
		if (o instanceof HSL) {	return this._HSLtoRGB(o); }
		if (o instanceof CMYK) { return this._CMYKtoRGB(o); }
	},
 
	toHSV : function (o) {
		if (o instanceof HSV) { return o; }
		if (o instanceof RGB) { return this._RGBtoHSV(o); }
		if (o instanceof CMYK) { return this._RGBtoHSV(this._CMYKtoRGB(o)); }
	},

	toHSL : function (o) {
		if (o instanceof HSL) { return o; }
		if (o instanceof RGB) { return this._RGBtoHSL(o); }
		//if (o instanceof CMYK) { return this._RGBtoHSV(this._CMYKtoRGB(o)); }
	},
 
	toCMYK : function (o) {
		if (o instanceof CMYK) { return o; }
		if (o instanceof RGB) { return this._RGBtoCMYK(o); }
		if (o instanceof HSV) { return this._RGBtoCMYK(this._HSVtoRGB(o)); }
	}
 
}