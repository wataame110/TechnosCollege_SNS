// iPhoneまたは、Androidの場合は振り分けを判断

 //confirm(getCookie('select')+'版で開きます');
/*
if (document.referrer.indexOf('sealuckpal.co.jp') == -1 && (getCookie('select') == '') && ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0))) {
		if(confirm('総合学院テクノスカレッジにようこそ。\nこのサイトにはスマートフォン用のサイトがあります。\n表示しますか？')) {
			document.cookie ='select=sp';
    		 location.href = 'http://www.technosac.jp/sp/';
		}
}
*/


// -- function 達 --
//Check cookie
    function getCookie(c_name){
        var st="";
        var ed="";
        if (document.cookie.length>0){
            st=document.cookie.indexOf(c_name + "=");
            if (st!=-1){ 
                st=st+c_name.length+1;
                ed=document.cookie.indexOf(";",st);
                if (ed==-1) ed=document.cookie.length;
                return unescape(document.cookie.substring(st,ed));
            } 
        }
        return "";
    }

//onclick="setCookie( 'select', pc' )	
function setCookie(c_name,value){
        // クッキーに保存する文字列を生成
        var s="";
		//現在の日付データを取得
		date0 = new Date();
	
		//30日後の日付データを作成
		date0.setTime(date1.getTime() + 3*60*60*1000);

		//GMT形式に変換して変数date2に格納する
		date = date0.toGMTString();
	
        s = "select=pc;expires="+ date;
        // クッキーに保存
        document.cookie=s;
    }
// -------------------------- 	