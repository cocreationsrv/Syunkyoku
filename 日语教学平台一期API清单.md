# 日语教学平台一期 API 清单

## 1. 文档目的

本清单用于定义一期 MVP 的接口范围，服务于以下工作：

- 后端模块拆分
- 前后端联调
- 数据模型校对
- 开发排期

说明：

- 本文档当前关注接口边界，不展开到最终字段级详细协议
- 接口命名以 REST 风格为主
- 管理后台与教师后台共用一套后台 API，通过角色权限控制

## 2. API 分层

建议按以下分组组织接口：

- 认证与当前用户
- 公众号咨询
- 学员端
- 教师/后台端
- 支付与订单
- 消息与任务
- 报表与统计

## 3. 认证与当前用户

### 3.1 认证接口

- `POST /api/v1/auth/wechat/login`
  - 小程序微信登录

- `POST /api/v1/auth/admin/login`
  - 后台账号登录

- `POST /api/v1/auth/logout`
  - 退出登录

- `POST /api/v1/auth/refresh`
  - 刷新登录态

### 3.2 当前用户接口

- `GET /api/v1/me`
  - 获取当前用户基本信息、角色、会员状态

- `GET /api/v1/me/permissions`
  - 获取当前用户权限点

- `PATCH /api/v1/me/profile`
  - 更新个人资料

## 4. 公众号咨询接口

### 4.1 咨询表单

- `POST /api/v1/leads`
  - 提交咨询线索

- `GET /api/v1/leads/public-config`
  - 获取咨询表单配置项

## 5. 学员端 API

## 5.1 会员与权益

- `GET /api/v1/memberships/plans`
  - 获取会员方案列表

- `GET /api/v1/memberships/current`
  - 获取当前会员状态

- `GET /api/v1/memberships/benefits`
  - 获取当前用户生效中的会员权益

### 5.2 课程

- `GET /api/v1/courses`
  - 获取课程列表

- `GET /api/v1/courses/{course_id}`
  - 获取课程详情

- `GET /api/v1/courses/{course_id}/purchase-preview`
  - 获取课程购买预览信息

### 5.3 班级与课表

- `GET /api/v1/classes/my`
  - 获取我的班级列表

- `GET /api/v1/classes/{class_id}`
  - 获取班级详情

- `GET /api/v1/schedule/my`
  - 获取我的课表

- `POST /api/v1/leave-requests`
  - 提交请假申请

- `GET /api/v1/leave-requests/my`
  - 获取我的请假记录

### 5.4 作业

- `GET /api/v1/homeworks/my`
  - 获取我的作业列表

- `GET /api/v1/homeworks/{assignment_id}`
  - 获取作业详情

- `POST /api/v1/homeworks/{assignment_id}/submit`
  - 提交作业

- `GET /api/v1/homeworks/{assignment_id}/feedback`
  - 获取作业反馈

### 5.5 每日任务

- `GET /api/v1/daily-tasks/today`
  - 获取今日每日任务

- `GET /api/v1/daily-tasks/history`
  - 获取每日任务历史

- `POST /api/v1/daily-tasks/{task_id}/complete`
  - 提交每日任务完成结果

- `POST /api/v1/daily-tasks/{task_id}/make-up`
  - 补打卡

### 5.6 活动

- `GET /api/v1/activities`
  - 获取活动列表

- `GET /api/v1/activities/{activity_id}`
  - 获取活动详情

- `POST /api/v1/activities/{activity_id}/register`
  - 活动报名

- `POST /api/v1/activities/{activity_id}/cancel`
  - 取消活动报名

- `GET /api/v1/activities/my`
  - 获取我的活动记录

### 5.7 学习档案

- `GET /api/v1/study-profile`
  - 获取学习档案首页数据

- `GET /api/v1/study-profile/attendance`
  - 获取到课记录

- `GET /api/v1/study-profile/homeworks`
  - 获取作业完成情况

- `GET /api/v1/study-profile/daily-tasks`
  - 获取每日任务完成情况

- `GET /api/v1/study-profile/feedbacks`
  - 获取教师反馈和阶段总结

### 5.8 消息提醒

- `GET /api/v1/notifications`
  - 获取消息提醒列表

- `POST /api/v1/notifications/{notification_id}/read`
  - 标记已读

## 6. 支付与订单 API

### 6.1 下单

- `POST /api/v1/orders/membership`
  - 创建会员订单

- `POST /api/v1/orders/course`
  - 创建课程订单

- `POST /api/v1/orders/activity`
  - 创建活动订单

### 6.2 订单查询

- `GET /api/v1/orders/my`
  - 获取我的订单列表

- `GET /api/v1/orders/{order_id}`
  - 获取订单详情

### 6.3 支付

- `POST /api/v1/payments/wechat/create`
  - 创建微信支付单

- `POST /api/v1/payments/wechat/callback`
  - 微信支付回调

### 6.4 退款

- `POST /api/v1/refunds`
  - 用户提交退款申请

- `GET /api/v1/refunds/my`
  - 获取我的退款记录

## 7. 教师/后台端 API

## 7.1 学员与线索

- `GET /api/v1/admin/leads`
  - 获取咨询线索列表

- `GET /api/v1/admin/leads/{lead_id}`
  - 获取咨询线索详情

- `PATCH /api/v1/admin/leads/{lead_id}`
  - 更新线索状态、记录跟进

- `GET /api/v1/admin/students`
  - 获取学员列表

- `GET /api/v1/admin/students/{student_id}`
  - 获取学员详情

- `PATCH /api/v1/admin/students/{student_id}`
  - 更新学员档案

## 7.2 会员与权益

- `GET /api/v1/admin/memberships/plans`
  - 获取会员方案列表

- `POST /api/v1/admin/memberships/plans`
  - 创建会员方案

- `PATCH /api/v1/admin/memberships/plans/{plan_id}`
  - 更新会员方案

- `GET /api/v1/admin/membership-benefits`
  - 获取会员权益模板

- `PUT /api/v1/admin/membership-benefits/{plan_id}`
  - 更新指定会员方案的权益配置

- `GET /api/v1/admin/students/{student_id}/benefits`
  - 获取单个学员当前权益

- `PATCH /api/v1/admin/students/{student_id}/benefits`
  - 人工调整学员权益

## 7.3 教师管理

- `GET /api/v1/admin/teachers`
  - 获取教师列表

- `POST /api/v1/admin/teachers`
  - 创建教师档案

- `PATCH /api/v1/admin/teachers/{teacher_id}`
  - 更新教师档案

## 7.4 课程管理

- `GET /api/v1/admin/courses`
  - 获取课程列表

- `POST /api/v1/admin/courses`
  - 创建课程

- `GET /api/v1/admin/courses/{course_id}`
  - 获取课程详情

- `PATCH /api/v1/admin/courses/{course_id}`
  - 更新课程

## 7.5 班级与课表管理

- `GET /api/v1/admin/classes`
  - 获取班级列表

- `POST /api/v1/admin/classes`
  - 创建班级

- `GET /api/v1/admin/classes/{class_id}`
  - 获取班级详情

- `PATCH /api/v1/admin/classes/{class_id}`
  - 更新班级

- `POST /api/v1/admin/classes/{class_id}/enrollments`
  - 学员分班

- `DELETE /api/v1/admin/classes/{class_id}/enrollments/{enrollment_id}`
  - 移出班级

- `GET /api/v1/admin/sessions`
  - 获取课次列表

- `POST /api/v1/admin/sessions`
  - 创建课次

- `PATCH /api/v1/admin/sessions/{session_id}`
  - 更新课次

## 7.6 请假、调课、补课

- `GET /api/v1/admin/leave-requests`
  - 获取请假申请列表

- `PATCH /api/v1/admin/leave-requests/{request_id}`
  - 审核请假申请

- `POST /api/v1/admin/reschedules`
  - 创建调课/补课记录

- `GET /api/v1/admin/reschedules`
  - 获取调课/补课记录

## 7.7 作业资源与作业管理

- `GET /api/v1/admin/homework-resources`
  - 获取作业资源列表

- `POST /api/v1/admin/homework-resources`
  - 创建作业资源

- `PATCH /api/v1/admin/homework-resources/{resource_id}`
  - 更新作业资源

- `POST /api/v1/admin/homework-assignments`
  - 分配作业到班级、课次或学员

- `GET /api/v1/admin/homework-assignments`
  - 获取作业分配记录

- `GET /api/v1/admin/homework-submissions`
  - 获取作业提交列表

- `GET /api/v1/admin/homework-submissions/{submission_id}`
  - 获取作业提交详情

- `POST /api/v1/admin/homework-submissions/{submission_id}/feedback`
  - 教师点评作业

## 7.8 每日任务管理

- `GET /api/v1/admin/daily-task-templates`
  - 获取每日任务模板列表

- `POST /api/v1/admin/daily-task-templates`
  - 创建每日任务模板

- `PATCH /api/v1/admin/daily-task-templates/{template_id}`
  - 更新每日任务模板

- `POST /api/v1/admin/daily-task-generate`
  - 触发每日任务生成

- `GET /api/v1/admin/daily-task-records`
  - 获取每日任务完成记录

## 7.9 活动管理

- `GET /api/v1/admin/activities`
  - 获取活动列表

- `POST /api/v1/admin/activities`
  - 创建活动

- `GET /api/v1/admin/activities/{activity_id}`
  - 获取活动详情

- `PATCH /api/v1/admin/activities/{activity_id}`
  - 更新活动

- `GET /api/v1/admin/activities/{activity_id}/registrations`
  - 获取活动报名名单

- `PATCH /api/v1/admin/activities/{activity_id}/registrations/{registration_id}`
  - 处理活动报名取消或状态调整

## 7.10 订单与退款管理

- `GET /api/v1/admin/orders`
  - 获取订单列表

- `GET /api/v1/admin/orders/{order_id}`
  - 获取订单详情

- `PATCH /api/v1/admin/orders/{order_id}`
  - 人工调整订单状态/补单

- `GET /api/v1/admin/refunds`
  - 获取退款申请列表

- `GET /api/v1/admin/refunds/{refund_id}`
  - 获取退款详情

- `PATCH /api/v1/admin/refunds/{refund_id}`
  - 处理退款申请

## 7.11 学习档案与反馈

- `GET /api/v1/admin/students/{student_id}/study-profile`
  - 获取学员学习档案

- `POST /api/v1/admin/students/{student_id}/stage-feedback`
  - 录入阶段性学习反馈

## 7.12 消息与跟进任务

- `GET /api/v1/admin/notifications`
  - 获取消息任务列表

- `GET /api/v1/admin/followups`
  - 获取跟进任务列表

- `PATCH /api/v1/admin/followups/{followup_id}`
  - 更新跟进任务状态

## 8. 报表与统计 API

- `GET /api/v1/admin/reports/overview`
  - 获取总览看板数据

- `GET /api/v1/admin/reports/students`
  - 获取学员明细报表

- `GET /api/v1/admin/reports/students/{student_id}`
  - 获取单个学员维度统计

## 9. 系统任务接口

- `POST /api/v1/system/jobs/daily-tasks`
  - 生成每日任务

- `POST /api/v1/system/jobs/reminders`
  - 生成提醒任务

- `POST /api/v1/system/jobs/metrics`
  - 聚合日报表数据

## 10. 一期优先实现顺序

### 第一批接口

- 认证与当前用户
- 咨询表单
- 会员方案与当前会员状态
- 课程列表/详情
- 订单创建与支付回调
- 班级/课表
- 请假申请
- 作业提交
- 每日任务获取与完成
- 活动报名
- 后台课程/班级/作业/学员管理

### 第二批接口

- 会员权益配置
- 学习档案
- 退款申请与后台退款处理
- 活动取消报名
- 报表统计

### 第三批接口

- 更细的运营统计
- 内容配置增强
- 批量导入预留接口
