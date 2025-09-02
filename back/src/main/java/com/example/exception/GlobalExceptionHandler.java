/**
 * 全局异常处理类
 */

package com.example.exception;

//全局异常处理

import com.example.common.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice("com.example.controller")
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    //捕获系统异常
    @ExceptionHandler(Exception.class)
    @ResponseBody //将Result转化为json
    public Result error(Exception e) {
        log.error("系统异常{}", e.getMessage());
        return Result.error("系统异常 " + e.getMessage());
    }

    //捕获自定义异常
    @ExceptionHandler(CustomerException.class)
    @ResponseBody //将Result转化为json
    public Result customerError(CustomerException e) {
        log.error("自定义异常{}", e.getMsg());
        return Result.error(e.getCode(), "自定义异常 " + e.getMsg());
    }
}
