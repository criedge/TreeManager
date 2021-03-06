$(document).ready(function(){
	
	UserManager.checkSession(function(user){
		if(user != null){
			var uid = user.uid;
			$("#noLogin").html("");
			 var loginHtml = "<div  class='imglogo'>"+
			 user.username+
             "</div><ul class='logoin-div'>"+
             "<li><a href='personalInfo.html?userId="+ uid +"'>个人信息</a></li>"+
             "<li><a href='#' id='logout'>退出登录</a></li></ul>"
			$("#login-div").html(loginHtml);
			bindLogoutEvent();
			showMessage();
		}
	});

})

//绑定退出事件
function bindLogoutEvent(){
     $("#logout").click(function(){
    	UserManager.quit();	 
	    location.href="index.html";
     });
}

function showMessage(){
	var url = decodeURI(window.location.href);
	dwr.engine.setAsync(false);
	var wordname = url.split("?")[1];
	var uid = wordname.split("=")[1];
	UserManager.getById(uid,function(user){
		console.log(user);
		var account = user.account;
		var username = user.username;
		var age = user.age;
		var role = user.flag;
		$("#changeHeadPic").html(username);
		$("#accountName").html(account);
		$("#nickname").html(username);
		$("#age").html(age);
		
		var manager = '<li><a href="personalInfo.html?userId='+uid+'" id="personalInfoBut">个人信息</a></li>'+
		   '<li><a href="discuss.html?userId='+uid+'" id="editPersonalInfoBut">我回答过的问题</a></li>'+
		   '<li><a href="modifyPersonalPassword.html?userId='+uid+'" id="modPasswordBut">修改密码</a></li>';
		$("#menu").html(manager);
		
		if(role==1){
			$("#role").html("老师");
			$("#editPersonalInfoBut").html("我提过的问题");
		}else{
			$("#role").html("学生");
		}
		
	});
}