package com.tarena.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tarena.dao.UserMapper;
import com.tarena.entity.User;
import com.tarena.service.UserService;
import com.tarena.util.PageUtil;
import com.tarena.util.UUIDUtil;
import com.tarena.vo.Page;
import com.tarena.vo.Result;

@Service(value="userService")
public class UserServiceImpl implements UserService {

	@Resource(name="userMapper")
	private UserMapper userMapper;
	
	@Resource(name="pageUtil")
	private PageUtil pageUtil;

	//增加用户
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public Result addUser(String username) {
		Result result = new Result();
		User user = new User();
		user.setId(UUIDUtil.getUUID());
		user.setUsername(username);
		userMapper.addUser(user);
		result.setStatus(1);
		result.setMessage("用户添加成功");
		return result;
	}

	//删除用户
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public Result deleteUser(String id) {
		Result result = new Result();
		userMapper.deleteUser(id);
		result.setStatus(1);
		result.setMessage("用户删除成功");
		return result;
	}

	//修改用户
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Exception.class)
	@Override
	public Result updateUser(User user) {
		Result result = new Result();
		userMapper.updateUser(user);
		result.setStatus(1);
		result.setMessage("用户删除成功");
		return result;
	}

	//查询用户
	@Override
	public Result findUser(Page page) {
		Result result = new Result();
		
		//获取模糊查询的关键字
		String userKW = page.getUserKeyword();
		userKW = "undefined".equals(userKW)?"%%":"%"+userKW+"%";
		page.setUserKeyword(userKW);
		//查询数据库，获取总记录数
		int totalCount = userMapper.getCount(userKW);
		page.setTotalCount(totalCount);
		//从配置文件获取一页显示的用户数
		int pageSize = pageUtil.getPageSize();
		page.setPageSize(pageSize);
		//计算总页数
		int totalPage = totalCount%pageSize==0?totalCount/pageSize:totalCount/pageSize+1;
		page.setTotalPage(totalPage);
		//计算前一页
		if(page.getCurrentPage()==1){
			page.setPreviousPage(1);
		}else{
			page.setPreviousPage(page.getCurrentPage()-1);
		}
		//计算后一页
		if(page.getCurrentPage()==totalPage){
			page.setNextPage(page.getCurrentPage());
		}else{
			page.setNextPage(page.getCurrentPage()+1);
		}
		//查询此页数据
		List<User> users = userMapper.findUserByPage(page);
		page.setData(users);
		//计算html页面上分页组件的超链接个数
		page.setNums(pageUtil.getFenYe_a_Num(page.getCurrentPage(), pageSize, totalCount, totalPage));
		
		result.setStatus(1);
		result.setMessage("查询成功");
		result.setData(page);
		return result;
	}


	
}
