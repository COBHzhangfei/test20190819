package com.tarena.service;

import com.tarena.entity.User;
import com.tarena.vo.Page;
import com.tarena.vo.Result;

public interface UserService {

	//增加用户
	Result addUser(String username);
	//删除用户
	Result deleteUser(String id);
	//修改用户
	Result updateUser(User user);
	//查询用户
	Result findUser(Page page);
	

	
}
