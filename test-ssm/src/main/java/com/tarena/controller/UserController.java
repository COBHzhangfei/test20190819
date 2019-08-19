package com.tarena.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tarena.entity.User;
import com.tarena.service.UserService;
import com.tarena.vo.Page;
import com.tarena.vo.Result;
@Controller
@RequestMapping("user/")
public class UserController {

	
	@Resource(name="userService")
	UserService userService;
	//增加用户
	@RequestMapping(value="addUser",method=RequestMethod.POST)
	@ResponseBody
	public Result addUser(String username){
		System.out.println(username);
		Result result = userService.addUser(username);
		return result;
	}
	
	//删除用户
	@RequestMapping(value="deleteUser",method=RequestMethod.DELETE)
	@ResponseBody
	public Result deleteUser(String user_id){
		System.out.println(user_id);
		/*Result result = userService.deleteUser(user_id);*/
		Result result = new Result();
		result.setStatus(1);
		return result;
	}
	
	//修改用户
	@RequestMapping(value="updateUser",method=RequestMethod.POST)
	@ResponseBody
	public Result updateUser(User user){
		Result result = userService.updateUser(user);
		return result;
	}
	
	//查询用户
	@RequestMapping(value="findUser",method=RequestMethod.GET)
	@ResponseBody
	public Result findUser(Page page){
		Result result = userService.findUser(page);
		return result;
	}
}
