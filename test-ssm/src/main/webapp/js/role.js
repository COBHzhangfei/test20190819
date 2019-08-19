//@ sourceURL=role.js
var userId;
$(function(){
	//模糊查询后的第一页数据
	findUsersByPage(1);
	//给角色的模糊查询按钮添加一个click事件
	$("#rolePanel .row button").on("click",function(){
		findUsersByPage(1);
	});
	
	//给新增的表单添加一个submit事件
	$("#addPanel form").submit(function(){
		return addUser();
	});
	
	//给编辑跳出的修改表单的确定添加一个submit事件
	$("#editRole form").submit(function(){
		return updateUser();
	});
	
	//给删除跳出的模态框的确定添加一个click事件
	$("#sure_delete").click(function(){
		deleteUser();
	});
});

//删除角色
function deleteUser(){
	alert(userId);
	$.ajax({
		url:basePath+"user/deleteUser",
		type:"delete",
		data:{
			"user_id":userId,
		},
		dataType:"json",
		success:function(result){
			if(result.status==1){
				//删除页面中指定的行
				$("#tr_"+userId).remove();
				//关闭模态框
				$(".bs-example-modal-sm").modal('toggle');
			}else{
				alert("删除角色失败");
			}
		},
		error:function(){
			alert("请求失败!");
		}
	});
}
//给删除按钮添加click点击事件
function deleteClick(uid){
	userId=uid;
}
//修改角色
function updateUser(){
	var newUserName = $("#role_name").val();

	$.ajax({
		url:basePath+"user/updateUser",
		type:"post",
		data:{
			"id":userId,
			"username":newUserName
		},
		dataType:"json",
		success:function(result){
			if(result.status==1){
				//更改页面角色数据
				$("#tr_"+userId).find("td:eq(2)").text(newUserName);
				//关闭模态框
				$("#editRole").modal('hide');
			}else{
				alert("角色修改失败!");
			}
		},
		error:function(){
			alert("请求失败!");
		}	
	});
	return false;
}
//给编辑添加按钮点击事件
function updateClick(uid){
	var rname = $("#tr_"+uid).find("td:eq(2)").text();
	$("#role_name").val(rname);
	userId=uid;
	
}
//新增角色
function addUser(){
	//获取表单中的新增角色名称
	var newUser=$("#roleName").val();
	alert(newUser);
	//发送异步请求
	$.ajax({
		url:basePath+"user/addUser",
		type:"post",
		data:{
			"username":newUser,
		},
		dataType:"json",
		success:function(result){
			if(result.status==1){
				alert(result.message);
			}else{
				alert("角色添加失败!");
			}
		},
		error:function(){
			alert("请求失败!");
		}
	});
	return false;
}

//查询指定页号的数据
function findUsersByPage(currentPage){
	//获取输入查询的模糊关键字
	var userKeyword=$("#rolePanel .row input[type=text]").val();
	if(userKeyword==""){
		userKeyword="undefined";
	}
	$.ajax({
		url:basePath+"user/findUser",
		type:"get",
		data:{
			"currentPage":currentPage,
			"userKeyword":userKeyword
		},
		dataType:"json",
		success:function(result){
			
			if(result.status==1){
				var page=result.data;
				var users=page.data;
				//清空表格
				$("#role_table tbody").html("");
				$(users).each(function(index,user){
					
					//index:遍历到第几个对象,从零开始
					//role:遍历到的那个对象
					var tr1='<tr id="tr_'+user.id+'">'+
			              '<td>'+(index+1)+'</td>'+
			              '<td>'+user.id+'</td>'+
			              '<td>'+user.username+'</td>'+
			              '<td>'+
			                '<a onclick="updateClick(\''+user.id+'\')" href="" data-toggle="modal" data-target="#editRole" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
			                '<a onclick="deleteClick(\''+user.id+'\')" href="" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
			              '</td>'+
			            '</tr>';
					$("#role_table tbody").append(tr1);
					
				});
								
				//清空分页条
				$("#role_pagination").html("");
				if(page.totalPage>1){
					//添加分页条
					var previousPage='<li>'+
										  '<a href="javascript:findUsersByPage('+page.previousPage+')" aria-label="Previous">'+
								            '<span aria-hidden="true">&laquo;</span>'+
								          '</a>'+
								      '</li>';
					$("#role_pagination").append(previousPage);
					$(page.nums).each(function(n,value){
						var middlePage='<li><a href="javascript:findUsersByPage('+value+')">'+value+'</a></li>';
						$("#role_pagination").append(middlePage);
					});
					
					var nextPage='<li>'+
								  '<a href="javascript:findUsersByPage('+page.nextPage+')" aria-label="Next">'+
						            '<span aria-hidden="true">&raquo;</span>'+
						          '</a>'+
						        '</li>';
					$("#role_pagination").append(nextPage);
					
				}
				
				
			}
		},
		error:function(){
			alert("请求失败!");
		}
	});
}