/**
 * 自定义异常类
 */


package com.example.exception;

//自定义异常（运行时异常）

public class CustomerException extends RuntimeException {
    private String msg;
    private String code;

    public CustomerException(String msg, String code) {
        this.msg = msg;
        this.code = code;
    }

    public CustomerException(String msg) {
        this.msg = msg;
        this.code = "500";
    }

    public CustomerException() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
