/**
 * 管理员映射接口
 */

package com.example.mapper;

import com.example.entity.Admin;

import java.util.List;

public interface AdminMapper {
    List<Admin> selectAll();

}
