var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 250, height = 250;		//	размер canvas
var colors = [
	'#F08080',	'#DC143C',	'#FF0000',	'#8B0000',	'#FF69B4',	'#FF1493',	'#C71585',	'#FF7F50',	'#FF4500',	'#FF8C00',	'#FFFF00',	'#BDB76B',	'#EE82EE',	'#FF00FF',	'#9370DB',	'#9400D3',	'#800080',	'#4B0082',	'#8B4513',	'#008000'];
var size = 5;
var w = 10;
var hs = vs = false;
var	matrix = [];
var color = colors[getRandomValue(0, colors.length-1)];
var color2 = '#fff';
var bg = false;
var rc = false;

// random value
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// random color
function getRandomColor() {
	var r=Math.floor(Math.random() * (234))+16;
    var g=Math.floor(Math.random() * (234))+16;
    var b=Math.floor(Math.random() * (234))+16;
    var c='#' + r.toString(16) + g.toString(16) + b.toString(16);
console.log('r:'+r+' g:'+g+' b:'+b);
  return c;
}

// random flag (0/1)
function getRandomFlag() {
	return Math.floor(Math.random() * Math.floor(2));
}

// clear canvas
function clear(){
	ctx.fillStyle = '#fff';
	ctx.fillRect(0,0,width,height);
}

// change field size
function resize(){
	size = document.getElementById("size").value;
	size *=1;
	w = Math.floor(width / (size));
	m = Math.floor(size / 2) + 1;
	matrix = [];
	newMatrix();
}

// save pic
download_img = function(el) {
  var imageURI = canvas.toDataURL("image/jpg");
  el.href = imageURI;
};

// generate icon
function draw(){
	clear();
	if (document.getElementById('hs').checked) {hs = true;} else {hs = false;}    
	if (document.getElementById('vs').checked) {vs = true;} else {vs = false;}
	if (document.getElementById('bg').checked) {bg = true;} else {bg = false;}
	if (document.getElementById('rc').checked) {rc = true;} else {rc = false;}
	
	if (rc) {
		color = getRandomColor();
		if (bg) {color2 = getRandomColor();} else {color2='#fff';}
	}else{
		color = colors[getRandomValue(0, colors.length-1)];
		if (bg) {color2 = colors[getRandomValue(0, colors.length-1)];} else {color2='#fff';}
	}
	
	//document.getElementById('h1').style.color = color;
	
	for (let i = 0; i < size; i++){
		for (let j = 0; j < size; j++){
			if (j >= m) {
				if (hs){matrix[i][j] = matrix[i][size-j-1];}
			} else {matrix[i][j] = matrix[i][j];}
			
			
			if (i >= m) {
				if (vs){matrix[i][j] = matrix[size-i-1][j];}
			} else {matrix[i][j] = matrix[i][j];}
			
			if (matrix[i][j] == 1){
				ctx.fillStyle = color;
			}else {
				ctx.fillStyle = color2;
			}
			ctx.fillRect(j*w, i*w, j*w+w, i*w+w);
		}
	}
}

// generate new matrix
function newMatrix(){
	for(let i = 0; i < size; i++){
		matrix[i] = [];
			for(let j = 0; j < size; j++){
				matrix[i][j] = getRandomFlag();
			}
	}
	draw();
}

resize();



