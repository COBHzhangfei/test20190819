package com.tarena.dao;

import java.util.List;

import com.tarena.entity.User;
import com.tarena.vo.Page;


public interface UserMapper {

	//添加用户
	void addUser(User user);
	//删除用户
	void deleteUser(String id);
	//修改用户
	void updateUser(User user);
	//通过关键字查询用户总数
	int getCount(String userKW);
	//查询用户
	List<User> findUserByPage(Page page);

	
}
