$(function() {
	$("form #inputName").val(getCookie("loginName"));
	//添加登录点击事件
	$(".container form").submit(function() {
		return login();
	})
})

//登录方法
function login() {
	//获取表单中的用户名和密码
	var loginName = $("#inputName").val();
	var password = $("#inputPassword").val();
	
	//获取是否选择记住密码
	var remeber=$("form input[type=checkbox]").get(0).checked;
	//ajax异步请求
	$.ajax({
		url:basePath+"user/login/"+loginName+"/"+password,
		type:"get",
		dataType:"json",
		success:function(result){
			if(result.status==1){
				window.location.href="index.html";
				if(remeber){
					addCookie("loginName",loginName,5);
				}else{
					delCookie("loginName");
				}
			}else if(result.status==0){
				alert(result.message);
			}
		},
		error:function(XMLResponse){
			alert("请求失败!");
			alert(XMLResponse.responseText);
		}
	});
	return false;
}