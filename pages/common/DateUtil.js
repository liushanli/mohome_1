function yearTime(e){
	var a = new Date();
	var y=a.getFullYear();
	var m=a.getMonth()+1;
	m = m<10? "0"+m:m;
	var d=a.getDate();
	d = d<10? "0"+d:d;
	
	var h=a.getHours();
	h = h<10? "0"+h:h;
	var mm=a.getMinutes();
	mm = mm<10? "0"+mm:mm;
	var s=a.getSeconds();
	s = s<10? "0"+s:s;
	
	if(e == 'year'){
		return y + '/' + m + '/' + d;
	}
	if(e == 'time'){
		return h + ':' + mm + ':' + s;
	}
	if(e == 'HH'){
		return h;
	}
	if(e == 'mm'){
		return mm;
	}
	if(e == 'yearTime'){
		return y + '/' + m + '/' + d + '  ' + h + ':' + mm + ':' + s;
	}
	return y + '/' + m + '/' + d;
}

function week(day){
	var a = new Date();
	var h=(a.getDay()-1)+day;
	var we=['星期一','星期二','星期三','星期四','星期五','星期六','星期七']
	return we[h]
}

function appleTime(){
	// 苹果时间
	var end = Date.now()
	var start = 1000*60*60*8
	var interval = end + start; //结束 - 开始 = 毫秒值
	var a =new Date(interval);
	var y=a.getFullYear();
	var m=a.getMonth()+1;
	m = m<10? "0"+m:m;
	var d=a.getDate();
	d = d<10? "0"+d:d;
	
	var h=a.getHours();
	h = h<10? "0"+h:h;
	var mm=a.getMinutes();
	mm = mm<10? "0"+mm:mm;
	var s=a.getSeconds();
	s = s<10? "0"+s:s;
	
	return y + '/' + m + '/' + d + '  ' + h + ':' + mm + ':' + s;
}


export {
	yearTime,
	week,
	appleTime
	
}
