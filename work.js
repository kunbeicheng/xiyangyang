var rotate_photo=document.getElementById("rotate_photo");
var playBtn=document.getElementById("play");
var bar_width=document.getElementById("bar_width");
var bar=document.getElementById("bar");
var processBtn=document.getElementById("processBtn");
var play_time=document.getElementById("play_time");
var sound_mute=document.getElementById("sound_mute");
var mymusic=document.getElementById("mymusic");
var re_num=document.getElementById("re_num");
var touxiang=document.getElementById("touxiang");
var texts=document.getElementById("w_text");
var re_button=document.getElementById("re_button");
var words_num=document.getElementById("words_num");
var leftb=document.getElementById("leftblock");
var rightb=document.getElementById("rightblock");
var fenyeblock=document.getElementById("fenyeblock");
var nore=document.getElementById("nore");
var rescans=document.getElementsByClassName('re_scan');
var renames=document.getElementsByClassName('re_name');
var retexts=document.getElementsByClassName('re_text');
var retimes=document.getElementsByClassName('re_time');
var redeles=document.getElementsByClassName('re_dele');
var rephotos=document.getElementsByClassName('rephoto');
var redele=document.getElementsByClassName('re_dele');
var idnum,reclass,reidnum=0,yeshu=0;
//音乐播放,进度条,动画,时间
var mini,sou,movelength,barwidth;
playBtn.onclick = function() {
	if(mymusic.paused) {
		var timeId = setInterval(function getIt() {
			if(parseInt(mymusic.currentTime / 60) < 10) {
				mini = '0' + parseInt(mymusic.currentTime / 60);
			} else {
				mini = parseInt(mymusic.currentTime / 60);
			}
			if(parseInt(mymusic.currentTime % 60) < 10) {
				sou = '0' + parseInt(mymusic.currentTime % 60);
			} else {
				sou = parseInt(mymusic.currentTime % 60);
			}
			barwidth=bar_width.clientWidth;
			movelength = parseInt(mymusic.currentTime / mymusic.duration * barwidth);
			bar.style.width = movelength + 'px';
			processBtn.style.left = movelength + 'px';
			play_time.innerHTML = mini + ':' + sou;
			if(mymusic.currentTime == mymusic.duration) {
				playBtn.setAttribute('class', 'play');
			}
		}, 1000)
		mymusic.play();
		playBtn.setAttribute('class', 'zan');
		rotate_photo.setAttribute('class', 'rotate_photoplay active');
	} else {
		mymusic.pause();
		clearInterval(timeId);
		playBtn.setAttribute('class', 'play');
		rotate_photo.setAttribute('class', 'rotate_photoplay paused');
	}
}
//静音效果
sound_mute.onclick=function(){
	if (!mymusic.muted) {
		sound_mute.setAttribute('class','sound_unmute');
		mymusic.muted=true;
	} else{
		sound_mute.setAttribute('class','sound_mute');
		mymusic.muted=false;
	}
}
//评论时间函数
var timeStr;
function getCurrentDate(){
    var curDate=new Date();
    var curYear=curDate.getFullYear();
    var curMonth= (curDate.getMonth()+1)<10?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
    var curDay= (curDate.getDate())<10?'0'+curDate.getDate():curDate.getDate();
    var curHour=curDate.getHours()<10?'0'+curDate.getHours():curDate.getHours();
    var curMin=curDate.getMinutes()<10?'0'+curDate.getMinutes():curDate.getMinutes();
    var curSec=curDate.getSeconds()<10?'0'+curDate.getSeconds():curDate.getSeconds();
    timeStr=curYear+'-'+curMonth+'-'+curDay+' '+curHour+':'+curMin+':'+curSec;
}
//获取评论字数
function getWords(){
	var words;
	words=texts.value.length;
	words_num.innerHTML='已输入'+words+'个字';
}
texts.oninput=function(){
	getWords();
}
//评论条数
function getReNum(){
	var revalue=re_num.innerHTML;
	revalue=1+parseInt(revalue);
	re_num.innerHTML=revalue+'条评论';
}
//评论按钮
re_button.onclick=function(){
	if (texts.value) {
		getReNum();
		saveinfo();
		displayinfo(0);
		texts.value='';
		getWords();
	} else{
		alert('评论不能为空，请输入评论内容！');
	}
}
//保存评论内容
function saveinfo(){
	getCurrentDate();
	var revalue=re_num.innerHTML;
	var textvalue=texts.value;
	var imgsrc=touxiang.src;
	var locat=localStorage['information'];
	if (locat==''||locat==null||locat==undefined) {
		localStorage['information']='[]';
	}
	locat=JSON.parse(localStorage['information']);
	var info={timer:timeStr,name:'喜羊羊',nums:revalue,textvalues:textvalue,imginfo:imgsrc,reID:locat.length};
	locat.push(info);
	localStorage['information']=JSON.stringify(locat);
}
//展示评论内容
function displayinfo(){
	var locat=localStorage['information'];
	locat=JSON.parse(localStorage['information']);
	var j=locat.length;
	if (j>=3) {j=3;}
	for (var i=0;i<3;i++) {
		nore.style.display='none';
		if (i<j) {
			rescans[i].style.display='block';
			redele[i].setAttribute('redeleid',locat[locat.length-(1+i)]['reID']);
			renames[i].innerHTML=locat[locat.length-(1+i)]['name'];
			retexts[i].innerHTML=locat[locat.length-(1+i)]['textvalues'];
			retimes[i].innerHTML=locat[locat.length-(1+i)]['timer'];
			rephotos[i].setAttribute('src',locat[locat.length-(1+i)]['imginfo']);
		}else{
			rescans[i].style.display='none';
		}
	}
	if (rescans[0].style.display=='none'&&rescans[1].style.display=='none'&&rescans[2].style.display=='none') {
			nore.style.display='block';
	}
	for (var s=0;s<j;s++) {
		redele[s].onclick=dele;
	}
	fenyeblock.innerHTML='';
	yeshu=Math.floor((locat.length-1)/3)+1;
	for (var n=0;n<yeshu;n++) {
		var balls=document.createElement('div');
		balls.setAttribute('reid',n);
		balls.setAttribute('class','ball small');
		balls.innerHTML=n+1;
		balls.onclick=huanye;
		fenyeblock.appendChild(balls);
	}
	reclass=document.getElementsByClassName('ball small');
	if (locat.length-1>=0) {
		re_num.innerHTML=locat[locat.length-1]['nums'];
	}else{
		re_num.innerHTML=0+'条评论';
	}
}
//变色
function bianse(){
	for(var k=0;k<reclass.length;k++){
		reclass[k].style.background='gainsboro';
	}
	for(var l=0;l<reclass.length;l++){
		if(reidnum==l){
			reclass[l].style.background='orange';
		}
	}
}
//实现分页的换页效果
function huanye(){
	var locat=localStorage['information'];
	locat=JSON.parse(localStorage['information']);
	idnum=this.getAttribute('reid');
	reidnum=idnum;
	bianse();
	var j=locat.length-3*idnum;
	if (j>=3) {j=3;}
	for (var i=0;i<j;i++) {
		redele[i].setAttribute('redeleid',locat[locat.length-(1+i)-3*idnum]['reID']);
		renames[i].innerHTML=locat[locat.length-(1+i)-3*idnum]['name'];
		retexts[i].innerHTML=locat[locat.length-(1+i)-3*idnum]['textvalues'];
		retimes[i].innerHTML=locat[locat.length-(1+i)-3*idnum]['timer'];
		rephotos[i].setAttribute('src',locat[locat.length-(1+i)-3*idnum]['imginfo']);
	}
}
//上一页
leftb.onclick=function(){
	var locat=localStorage['information'];
	locat=JSON.parse(localStorage['information']);
	reidnum--;
	if (reidnum>=0) {
		bianse();
		var j=locat.length-3*reidnum;
		if (j>=3) {j=3;}
		for (var i=0;i<j;i++) {
			redele[i].setAttribute('redeleid',locat[locat.length-(1+i)-3*reidnum]['reID']);
			renames[i].innerHTML=locat[locat.length-(1+i)-3*reidnum]['name'];
			retexts[i].innerHTML=locat[locat.length-(1+i)-3*reidnum]['textvalues'];
			retimes[i].innerHTML=locat[locat.length-(1+i)-3*reidnum]['timer'];
			rephotos[i].setAttribute('src',locat[locat.length-(1+i)-3*reidnum]['imginfo']);
		}
	}else{
		alert('已经到第一页了');
	}
}
//下一页
rightb.onclick=function(){
	var locat=localStorage['information'];
	locat=JSON.parse(localStorage['information']);
	reidnum++;
	if (reidnum<yeshu) {
		bianse();
		var j=locat.length-3*reidnum;
		if (j>=3) {j=3;}
		for (var i=0;i<j;i++) {
			redele[i].setAttribute('redeleid',locat[locat.length-(1+i)-3*reidnum]['reID']);
			renames[i].innerHTML=locat[locat.length-(1+i)-3*reidnum]['name'];
			retexts[i].innerHTML=locat[locat.length-(1+i)-3*reidnum]['textvalues'];
			retimes[i].innerHTML=locat[locat.length-(1+i)-3*reidnum]['timer'];
			rephotos[i].setAttribute('src',locat[locat.length-(1+i)-3*reidnum]['imginfo']);
		}
	}else{
		alert('已经到最后一页了，没有更多评论了');
	}
}
//删除评论
function dele(){
	var reid=this.getAttribute('redeleid');
	var locat=localStorage["information"];
	locat=JSON.parse(locat);
	for (var h=0;h<locat.length;h++) {
		if (reid==locat[h]["reID"]) {
			locat.splice(h,1);
		}
	}
	for (var f=0;f<locat.length;f++) {
		locat[f]["reID"]=f;
	}
	locat=JSON.stringify(locat);
	localStorage['information']=locat;
	displayinfo();
}
window.onload=function(){
	var locat=localStorage['information'];
	if (locat==''||locat==null||locat==undefined) {
		localStorage['information']='[]';
	}
	displayinfo();	
}
