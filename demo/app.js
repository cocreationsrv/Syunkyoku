const data = window.KOTOBALINK_DEMO_DATA;
const state = data.demoState;
const roleMeta = {
  admin: {
    label: "管理员",
    summary: "主要查看管理与经营数据，负责系统配置、角色权限和全局监管",
  },
  operator: {
    label: "教务/运营",
    summary: "负责课程、班级、学员、活动、跟进和日常运营，不处理系统级配置",
  },
  teacher: {
    label: "教师",
    summary: "只关注自己负责的班级、学员、作业批改和阶段反馈",
  },
};

const adminWorkspaceTabs = [
  { key: "admin-dashboard", label: "仪表盘", roles: ["admin"], section: "管理总览" },
  { key: "admin-leads", label: "咨询线索", roles: ["admin", "operator"], section: "运营管理" },
  { key: "admin-memberships", label: "会员权益", roles: ["admin", "operator"], section: "运营管理" },
  { key: "admin-orders", label: "订单列表", roles: ["admin", "operator"], section: "运营管理" },
  { key: "admin-refunds", label: "退款处理", roles: ["admin", "operator"], section: "运营管理" },
  { key: "admin-activities", label: "活动管理", roles: ["admin", "operator"], section: "运营管理" },
  { key: "admin-courses", label: "课程", roles: ["admin", "operator"], section: "教学运营" },
  { key: "admin-class", label: "班级详情", roles: ["admin", "operator", "teacher"], section: "教学运营" },
  { key: "admin-student", label: "学员详情", roles: ["admin", "operator", "teacher"], section: "教学运营" },
  { key: "admin-resources", label: "资源", roles: ["admin", "operator"], section: "教学运营" },
  { key: "admin-homework", label: "作业批改", roles: ["operator", "teacher"], section: "教学运营" },
  { key: "admin-followups", label: "跟进任务", roles: ["operator"], section: "教学运营" },
  { key: "admin-system", label: "系统管理", roles: ["admin"], section: "系统管理" },
  { key: "teacher-progress", label: "学习进度跟进", roles: ["teacher"], section: "教学工作台" },
];

const miniWorkspaceTabs = [
  { key: "mini-home", label: "首页" },
  { key: "mini-course", label: "课程" },
  { key: "mini-task", label: "任务" },
  { key: "mini-messages", label: "消息" },
  { key: "mini-profile", label: "我的" },
];

const views = {
  overview: {
    title: "演示总览",
    subtitle: "四条业务闭环一屏看清",
    tip: "建议从后台仪表盘开始，再依次讲课程管理、班级、作业、订单，最后切到小程序。",
    render: () => `
      <div class="hero">
        <div class="hero-panel">
          <div class="card-kicker">KotobaLink Demo</div>
          <h2>一套围绕课程服务、督学与留存设计的日语教学闭环</h2>
          <p>本次演示重点不是“内容很多”，而是从购课到学习到反馈再到跟进，整条链路都能讲通。</p>
          <div class="hero-stats">
            <div class="hero-stat"><strong>${data.metrics.revenue}</strong><span>累计订单金额</span></div>
            <div class="hero-stat"><strong>${data.metrics.activeStudents}</strong><span>在读学员</span></div>
            <div class="hero-stat"><strong>${data.metrics.attendanceRate}</strong><span>到课率</span></div>
            <div class="hero-stat"><strong>${data.metrics.renewalRate}</strong><span>续费率</span></div>
          </div>
        </div>
        <div class="card highlight">
          <div class="card-title">统一演示故事</div>
          <div class="list">
            <div class="list-item"><div class="list-title">${data.student.name}</div><div class="muted">${data.student.course} / ${data.student.className}</div></div>
            <div class="list-item"><div class="list-title">会员状态</div><div class="muted">${data.student.membership}</div></div>
            <div class="list-item"><div class="list-title">当前续费状态</div><div class="muted">${data.student.renewal}</div></div>
          </div>
        </div>
      </div>
      <div class="split">
        <div class="card">
          <div class="card-title">Demo 要展示的业务闭环</div>
          <div class="timeline">
            <div class="timeline-step"><strong>转化闭环</strong><div class="muted">查看课程 -> 购买课程 -> 自动获得会员权益 -> 进入学习</div></div>
            <div class="timeline-step"><strong>教学闭环</strong><div class="muted">后台建课建班 -> 学员进入班级 -> 课表可见 -> 布置作业</div></div>
            <div class="timeline-step"><strong>督学闭环</strong><div class="muted">系统生成每日任务 -> 学员完成 -> 后台看到完成情况 -> 触发跟进</div></div>
            <div class="timeline-step"><strong>反馈留存闭环</strong><div class="muted">学员提交作业 -> 教师点评 -> 学习档案沉淀 -> 运营跟进</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">后天演示建议顺序</div>
          <div class="list">
            <div class="list-item"><div class="list-title">1. 先看后台仪表盘</div><div class="muted">先建立“这是可运营系统”的认知。</div></div>
            <div class="list-item"><div class="list-title">2. 再看班级、学员、作业</div><div class="muted">解释课程服务如何被管理和沉淀。</div></div>
            <div class="list-item"><div class="list-title">3. 切到小程序学员端</div><div class="muted">让客户看到用户视角下的真实学习体验。</div></div>
          </div>
        </div>
      </div>
    `,
  },
  "admin-app": {
    title: "后台系统体验",
    subtitle: "带权限切换的后台工作区演示",
    tip: "先切换角色，再在工作区里点不同模块，客户会更容易理解权限和职责边界。",
    render: () => renderAdminWorkspace(),
  },
  "mini-app": {
    title: "小程序体验",
    subtitle: "学员端主流程演示",
    tip: "直接在手机壳里切换页面和完成动作，让客户感受到真实学习流程。",
    render: () => renderMiniWorkspace(),
  },
  "admin-dashboard": {
    title: "后台仪表盘",
    subtitle: "运营和教学指标集中展示",
    tip: "先用这一页建立客户对“可运营系统”的认知，再继续进入课程和班级。",
    render: () => adminPage({
      breadcrumb: "后台 / 仪表盘",
      title: state.currentRole === "admin" ? "管理总览" : state.operatorDashboardView === "operations" ? "运营仪表盘" : "教学仪表盘",
      actions: state.currentRole === "admin" ? ["课程总数 6", "班级总数 9", "退款申请 1"] : state.operatorDashboardView === "operations" ? ["待跟进 3", "退款申请 1", "续费提醒 2"] : ["今日课程 2", "待批改 4", "异常学员 2"],
      permissions: {
        admin: "仅查看管理和经营视角数据，不下钻到具体教学执行。",
        operator: "教务/运营首页拆成运营仪表盘和教学仪表盘，分别承接线索/订单/活动与班级/作业/任务。",
      },
      content: state.currentRole === "admin" ? `
      <div class="grid cols-3">
        ${metricCard(data.metrics.leads, "咨询人数")}
        ${metricCard(data.metrics.courseOrders, "课程购买人数")}
        ${metricCard(data.metrics.memberships, "会员开通人数")}
        ${metricCard(data.metrics.totalCourses, "课程总数")}
        ${metricCard(data.metrics.totalClasses, "班级总数")}
        ${metricCard(data.metrics.totalStudents, "学员总数")}
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">经营与管理摘要</div>
          <div class="mini-grid">
            ${metricCard(data.metrics.revenue, "订单金额")}
            ${metricCard(data.metrics.refunds, "退款人数")}
            ${metricCard(data.metrics.renewalRate, "续费率")}
            ${metricCard("1", "待审核事项")}
          </div>
        </div>
        <div class="card">
          <div class="card-title">管理视角说明</div>
          <div class="muted">管理员首页只看经营、规模和风险，不下钻到作业完成率、每日任务完成率、学员跟进等教学执行层细节。</div>
        </div>
      </div>
    ` : state.operatorDashboardView === "operations" ? `
      <div class="dashboard-switch">
        <button class="switch-chip active" data-action="operator-dashboard-operations">运营仪表盘</button>
        <button class="switch-chip" data-action="operator-dashboard-teaching">教学仪表盘</button>
      </div>
      <div class="grid cols-3">
        ${metricCard(data.metrics.leads, "咨询人数")}
        ${metricCard(data.metrics.courseOrders, "课程购买人数")}
        ${metricCard(data.metrics.memberships, "会员开通人数")}
        ${metricCard(data.metrics.revenue, "订单金额")}
        ${metricCard(data.metrics.refunds, "退款人数")}
        ${metricCard(data.metrics.renewalRate, "续费率")}
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">运营待处理</div>
          <div class="list">
            <div class="list-item"><div class="list-title">公众号新线索 2 条</div><div class="muted">待安排试听和回访</div></div>
            <div class="list-item"><div class="list-title">退款申请 1 笔</div><div class="muted">需人工审核和权益回收确认</div></div>
            <div class="list-item"><div class="list-title">续费提醒 2 人</div><div class="muted">课程后半程学员进入续费跟进</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">运营视角说明</div>
          <div class="muted">这里不展示作业完成率和每日任务完成率，重点看咨询、订单、会员、退款、活动和续费跟进。</div>
        </div>
      </div>
    ` : `
      <div class="dashboard-switch">
        <button class="switch-chip" data-action="operator-dashboard-operations">运营仪表盘</button>
        <button class="switch-chip active" data-action="operator-dashboard-teaching">教学仪表盘</button>
      </div>
      <div class="grid cols-3">
        ${metricCard(data.metrics.activeStudents, "在读学员数")}
        ${metricCard(data.metrics.attendanceRate, "到课率")}
        ${metricCard(data.metrics.dailyTaskRate, "每日任务完成率")}
        ${metricCard(data.metrics.homeworkRate, "作业完成率")}
        ${metricCard(data.metrics.totalClasses, "班级总数")}
        ${metricCard("4", "待批改作业")}
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">教学执行摘要</div>
          <div class="list">
            <div class="list-item"><div class="list-title">今日课程 2 节</div><div class="muted">班级排课正常，教师已确认</div></div>
            <div class="list-item"><div class="list-title">待批改作业 4 份</div><div class="muted">教师端已进入批改工作台</div></div>
            <div class="list-item"><div class="list-title">任务异常学员 2 人</div><div class="muted">未完成每日任务，需教学或运营跟进</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">教学异常提醒</div>
          <div class="list">
            ${followupItems().map(item => `<div class="list-item"><div class="list-title">${item.name}</div><div class="muted">${item.reason}</div></div>`).join("")}
          </div>
          <div class="demo-tip">演示提示：这里专门承接班级、作业和每日任务执行情况，和线索、订单、退款分开看。</div>
        </div>
      </div>
    `,
    }),
  },
  "admin-leads": {
    title: "后台咨询线索",
    subtitle: "公众号咨询统一进入后台线索池",
    tip: "这页用来说明公众号咨询会进入后台统一跟进，而不是散在聊天里。",
    render: () => adminPage({
      breadcrumb: "后台 / 咨询与学员 / 咨询线索",
      title: "咨询线索池",
      actions: ["今日新增 3", "待跟进 2"],
      permissions: {
        admin: "可查看全部咨询线索和流转状态。",
        operator: "可跟进咨询、记录沟通、创建学员档案和安排试听。",
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">公众号咨询线索</div>
              <div class="muted">所有咨询统一进入后台，便于跟进、试听安排和转化。</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">来源：公众号</div>
              ${state.currentRole === "operator" ? `<div class="btn">新建学员</div>` : ""}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>姓名</th><th>当前水平</th><th>学习目标</th><th>状态</th></tr></thead>
                <tbody>
                  ${data.leads.map((item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.level}</td>
                      <td>${item.goal}</td>
                      <td><span class="status ${item.status === "待跟进" ? "warn" : ""}">${item.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="cta-row">
          ${state.currentRole === "operator" ? `<div class="btn">转为正式学员</div>` : ""}
          <div class="btn" data-action="admin-to-courses">查看推荐课程</div>
          <div class="btn ghost" data-action="admin-to-student">查看学员档案</div>
        </div>
      `,
    }),
  },
  "admin-memberships": {
    title: "后台会员权益",
    subtitle: "会员方案和权益配置",
    tip: "这里重点解释用户既可以单独买会员，也可以买课程后自动获得会员权益。",
    render: () => adminPage({
      breadcrumb: "后台 / 会员 / 会员权益",
      title: "会员方案与权益",
      actions: ["方案 2", "支持人工权益调整"],
      permissions: {
        admin: "可配置会员方案、权益模板和人工调整策略。",
        operator: "可编辑会员方案展示、维护权益说明，并对个别用户补充权益。",
      },
      content: `
        <div class="grid cols-2">
          ${data.membershipPlans.map((item) => `
            <div class="card">
              <div class="card-title">${item.name}</div>
              <div class="muted">有效期：${item.duration}</div>
              <div class="muted">价格：${item.price}</div>
              <div class="muted">权益：${item.benefits}</div>
            </div>
          `).join("")}
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">通用权益项</div>
            <div class="list">
              <div class="list-item"><div class="list-title">基础课程访问权</div></div>
              <div class="list-item"><div class="list-title">会员价购买资格</div></div>
              <div class="list-item"><div class="list-title">活动报名资格</div></div>
              <div class="list-item"><div class="list-title">每日任务/消息提醒</div></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">与课程关系</div>
            <div class="muted">用户可单独购买会员；购买精品课程后，也会在课程服务期内自动获得会员权益。</div>
            <div class="cta-row">
              ${state.currentRole === "operator" ? `<div class="btn">编辑会员方案</div><div class="btn ghost">补充用户权益</div>` : ""}
              <div class="btn ghost" data-action="admin-to-student">查看学员权益效果</div>
            </div>
          </div>
        </div>
      `,
    }),
  },
  "admin-courses": {
    title: "后台课程",
    subtitle: "课程列表与课程详情按角色区分展示",
    tip: "这里重点讲清基础课程、精品课程、会员权益和课程服务期的关系。",
    render: () => adminPage({
      breadcrumb: "后台 / 课程 / 课程列表",
      title: state.currentRole === "admin" ? "课程列表与详情" : "课程管理",
      actions: ["课程总数 3", "精品课程 2", "基础课程 1"],
      permissions: {
        admin: "只查看课程列表、课程详情和权益关系，不负责日常课程编辑。",
        operator: "负责创建课程、维护服务周期、课程状态和教学配置。",
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">课程列表</div>
              <div class="muted">${state.currentRole === "admin" ? "管理员查看课程商品结构、服务周期和权益关系，不介入日常编辑。" : "支持基础课程与精品课程统一配置，控制服务期与会员权益联动。"}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">筛选：全部</div>
              ${state.currentRole === "operator" ? `<div class="btn">新建课程</div>` : `<div class="tool-chip">只读查看</div>`}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>课程名称</th><th>类型</th><th>服务周期</th><th>权益规则</th><th>状态</th></tr></thead>
                <tbody>
                  ${data.courses.map((item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.type}</td>
                      <td>${item.duration}</td>
                      <td>${item.benefit}</td>
                      <td><span class="status ${item.status === "待开班" ? "warn" : ""}">${item.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? "课程详情摘要" : "课程编辑示意"}</div>
            <div class="muted">课程名称：${data.student.course}</div>
            <div class="muted">课程类型：精品课程</div>
            <div class="muted">服务周期：6 个月</div>
            <div class="muted">会员权益：购课后课程服务期内自动生效</div>
            <div class="cta-row">
              ${state.currentRole === "operator" ? `<div class="btn">新建班级</div>` : ""}
              <div class="btn ghost" data-action="admin-to-class">查看对应班级</div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? "管理员查看重点" : "课程配置重点"}</div>
            <div class="list">
              <div class="list-item"><div class="list-title">课程分类</div><div class="muted">区分基础课程和精品课程。</div></div>
              <div class="list-item"><div class="list-title">服务周期</div><div class="muted">决定课程服务和会员权益生效区间。</div></div>
              <div class="list-item"><div class="list-title">${state.currentRole === "admin" ? "资源关联" : "作业与任务绑定"}</div><div class="muted">${state.currentRole === "admin" ? "查看课程关联的班级、资源和权益结构。" : "课程可统一配置作业资源与每日任务模板。"}</div></div>
            </div>
          </div>
        </div>
      `,
    }),
  },
  "admin-class": {
    title: "后台班级详情",
    subtitle: "统一班级模型承载小班与一对一",
    tip: "这一页强调一对一和小班共用同一套班级模型，降低后期管理复杂度。",
    render: () => adminPage({
      breadcrumb: "后台 / 班级与课表 / 班级详情",
      title: data.student.className,
      actions: ["班级状态：进行中", "教师：山田老师", ...(state.currentRole === "operator" ? ["支持新建班级"] : [])],
      permissions: {
        admin: "可查看全班、教师和运营处理记录。",
        operator: "可编辑班级信息、教师安排、学员分班、排课与请假调课。",
        teacher: "可查看自己负责班级、课次和学员进度。",
      },
      content: `
      <div class="card">
        <span class="tag">精品课程</span><span class="tag">小班课</span>
        <div class="card-title">${data.student.className}</div>
        <div class="muted">${data.student.course} / 教师：${data.student.teacher} / 人数上限：8</div>
        ${state.currentRole === "operator" ? `<div class="cta-row" style="margin-top:14px;"><div class="btn">新建班级</div><div class="btn ghost">编辑班级信息</div><div class="btn ghost">调整教师</div><div class="btn ghost">学员分班</div></div>` : ""}
      </div>
      <div class="grid cols-2">
        <div class="card">
          <div class="card-title">课次安排</div>
          <div class="list">${data.schedule.map(item => `<div class="list-item"><div class="list-title">${item.title}</div><div class="muted">${item.date} · ${item.status}</div></div>`).join("")}</div>
          <div class="cta-row">
            ${state.currentRole === "operator" ? `<div class="btn">调整排课</div><div class="btn ghost">处理请假/调课</div>` : ""}
            <div class="btn ghost" data-action="admin-to-homework">查看本班作业</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">班级学员</div>
          <div class="list">
            ${data.classmates.map(item => `<div class="list-item"><div class="list-meta"><div class="list-title">${item.name}</div><span class="status ${item.status === "待跟进" ? "warn" : ""}">${item.status}</span></div><div class="muted">${item.progress}</div></div>`).join("")}
          </div>
          ${state.currentRole === "operator" ? `<div class="demo-tip">这里的编辑动作属于教务/运营：维护班级结构、教师分配、学员分班和排课安排。</div>` : ""}
        </div>
      </div>
    `,
    }),
  },
  "admin-student": {
    title: "后台学员详情",
    subtitle: "学习和运营信息统一聚合",
    tip: "这里要把会员状态、学习状态、订单记录和续费跟进串起来讲。",
    render: () => adminPage({
      breadcrumb: "后台 / 咨询与学员 / 学员详情",
      title: data.student.name,
      actions: ["会员有效", "续费预警：6 月"],
      permissions: {
        admin: "查看学员基础资料、会员状态、课程状态和总体经营相关信息，不下钻到具体教学执行细节。",
        operator: "可查看学员档案、学习状态、续费状态和跟进记录，是日常服务主操作者。",
        teacher: "只查看学习进度、作业、每日任务和教师反馈，不展示订单退款和运营跟进信息。",
      },
      content: renderStudentDetailByRole(),
    }),
  },
  "admin-homework": {
    title: "后台作业批改",
    subtitle: "作业资源统一管理，教师可直接点评",
    tip: "这里强调作业不是一次性消息，而是会沉淀进学习档案的教学动作。",
    render: () => adminPage({
      breadcrumb: "后台 / 作业与任务 / 作业批改",
      title: "作业批改中心",
      actions: ["待批改 4", "已点评 18"],
      permissions: {
        teacher: "教师核心工作台，可查看提交、批改作业、给出反馈。",
        operator: "可查看整体完成情况并协助督学跟进。",
      },
      content: `
      <div class="card">
        <div class="card-title">${data.homework.title}</div>
        <div class="muted">提交人：${data.student.name} / 截止时间：${data.homework.due}</div>
      </div>
      <div class="grid cols-2">
        <div class="card">
          <div class="card-title">学员提交内容</div>
          <div class="muted">语音文件已上传，附带文字自我介绍。</div>
        </div>
        <div class="card">
          <div class="card-title">教师反馈</div>
          <div class="tag">评分 ${data.homework.score}</div>
          <div class="muted">${data.homework.feedback}</div>
        </div>
      </div>
    `,
    }),
  },
  "admin-orders": {
    title: "后台订单列表",
    subtitle: "会员、课程、活动订单统一管理",
    tip: "在这里说明非会员可直接买课，买课后自动获得课程服务期内会员权益。",
    render: () => adminPage({
      breadcrumb: "后台 / 订单与退款 / 订单列表",
      title: "订单中心",
      actions: ["课程订单 1", "活动订单 1", "会员订单 1"],
      permissions: {
        admin: "可查看并调整所有订单状态。",
        operator: "可核对订单和支付状态，支持人工补单。",
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">订单列表</div>
              <div class="muted">支持会员、课程、活动三类商品统一管理。</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">支付方式：微信支付</div>
              <div class="tool-chip">状态：全部</div>
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>订单号</th><th>用户</th><th>商品</th><th>类型</th><th>金额</th><th>状态</th></tr></thead>
                <tbody>
                  ${data.orders.map((item) => `
                    <tr>
                      <td>${item.no}</td>
                      <td>${item.user}</td>
                      <td>${item.item}</td>
                      <td>${item.type}</td>
                      <td>${item.amount}</td>
                      <td><span class="status ${item.status === "退款处理中" ? "warn" : ""}">${item.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">订单闭环说明</div>
            <div class="muted">用户可直接购买课程或会员，支付成功后自动获得对应课程服务或会员权益。</div>
            <div class="cta-row">
              <div class="btn ghost" data-action="admin-to-refunds">查看退款流程</div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">人工兜底能力</div>
            <div class="muted">后台支持补单、状态修正和人工核对，避免支付链路异常影响演示与运营。</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-activities": {
    title: "后台活动管理",
    subtitle: "活动作为品牌获客入口进行配置和报名承接",
    tip: "活动主要用于品牌传播和留存，不要讲成核心营收模块。",
    render: () => adminPage({
      breadcrumb: "后台 / 活动 / 活动管理",
      title: "活动管理",
      actions: ["公开活动 1", "会员活动 1", "支持取消报名"],
      permissions: {
        admin: "可查看并管理活动整体配置与状态。",
        operator: "可创建活动、处理报名和取消报名。",
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">活动列表</div>
              <div class="muted">活动可配置为公开/会员、免费/收费，一期以品牌获客入口为主。</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">报名中</div>
              ${state.currentRole === "operator" ? `<div class="btn">新建活动</div>` : `<div class="tool-chip">管理视图</div>`}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>活动名称</th><th>类型</th><th>时间</th><th>费用</th><th>状态</th></tr></thead>
                <tbody>
                  <tr>
                    <td>${data.activity.title}</td>
                    <td>${data.activity.type}</td>
                    <td>${data.activity.time}</td>
                    <td>${data.activity.fee}</td>
                    <td><span class="status">报名中</span></td>
                  </tr>
                  <tr>
                    <td>会员会话夜</td>
                    <td>会员活动</td>
                    <td>3/28 19:00</td>
                    <td>会员免费</td>
                    <td><span class="status">待开始</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">活动定位</div>
            <div class="muted">对外用于品牌传播和线索转化，对内用于会员粘性和学习氛围建设。</div>
            <div class="cta-row">
              <div class="btn ghost" data-action="mini-to-activity">切到学员活动页</div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">状态规则</div>
            <div class="muted">支持报名、取消报名，名额满后自动停止报名，一期不做候补名单。</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-refunds": {
    title: "后台退款处理",
    subtitle: "退款状态记录和人工审核流程",
    tip: "这里只要强调一期先以人工审核兜底，系统负责状态留痕就够了。",
    render: () => adminPage({
      breadcrumb: "后台 / 订单与退款 / 退款处理",
      title: "退款处理",
      actions: ["退款申请 1", "人工判定模式"],
      permissions: {
        admin: "可处理退款申请并确认权益回收。",
        operator: "可提交审核意见并做人工跟进。",
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">退款申请列表</div>
              <div class="muted">一期退款采用人工审核与人工判定，系统负责状态留痕。</div>
            </div>
            <div class="tool-chip">自动退款计算：未开启</div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>退款单号</th><th>订单号</th><th>用户</th><th>商品</th><th>原因</th><th>状态</th></tr></thead>
                <tbody>
                  ${data.refunds.map((item) => `
                    <tr>
                      <td>${item.no}</td>
                      <td>${item.orderNo}</td>
                      <td>${item.user}</td>
                      <td>${item.item}</td>
                      <td>${item.reason}</td>
                      <td><span class="status warn">${item.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">审核动作</div>
            <div class="muted">运营可查看申请原因、确认是否退费，并人工回收会员或课程权益。</div>
          </div>
          <div class="card">
            <div class="card-title">当前演示重点</div>
            <div class="muted">展示系统不仅能卖课，也能处理售后和状态留痕，形成完整商业闭环。</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-resources": {
    title: "后台资源",
    subtitle: "资源列表与资源详情按角色区分展示",
    render: () => adminPage({
      breadcrumb: "后台 / 资源 / 资源列表",
      title: state.currentRole === "admin" ? "资源列表与详情" : "作业资源库",
      actions: ["资源总数 12", "启用中 9", "草稿 3"],
      permissions: {
        admin: "只查看资源列表、资源详情和课程关联关系，不负责资源录入和分配。",
        operator: "负责录入资源、维护资源状态，并将资源分配到课程、班级和课次。",
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">资源列表</div>
              <div class="muted">${state.currentRole === "admin" ? "管理员查看资源沉淀情况和课程关联，不处理资源录入。" : "一期先支持后台手工录入，后续再扩展批量导入。"}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">类型：全部</div>
              ${state.currentRole === "operator" ? `<div class="btn">新建资源</div>` : `<div class="tool-chip">只读查看</div>`}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>资源名称</th><th>类型</th><th>所属课程</th><th>状态</th></tr></thead>
                <tbody>
                  ${data.resources.map((item) => `
                    <tr>
                      <td>${item.title}</td>
                      <td>${item.type}</td>
                      <td>${item.course}</td>
                      <td><span class="status ${item.status === "草稿" ? "warn" : ""}">${item.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? "资源详情摘要" : "资源录入字段"}</div>
            <div class="muted">${state.currentRole === "admin" ? "标题、类型、所属课程、启用状态和使用班级概览。" : "标题、类型、所属课程、说明、提交方式、启用状态。"}</div>
          </div>
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? "管理员查看重点" : "与教学闭环的关系"}</div>
            <div class="muted">${state.currentRole === "admin" ? "重点看资源沉淀规模、课程覆盖情况和资源状态，不介入具体批改流程。" : "资源创建后，可分配到班级、课次或学员，再进入提交与教师点评流程。"}</div>
            ${state.currentRole === "operator" ? `<div class="cta-row"><div class="btn ghost" data-action="admin-to-homework">查看批改页</div></div>` : ""}
          </div>
        </div>
      `,
    }),
  },
  "admin-system": {
    title: "后台系统管理",
    subtitle: "账号、角色权限与基础能力配置",
    tip: "这页是管理员存在感最强的页面，用来说明 admin 负责系统配置和权限规则，而不是做日常教学运营编辑。",
    render: () => adminPage({
      breadcrumb: "后台 / 系统管理",
      title: "系统管理",
      actions: ["账号 6", "角色 3", "支付配置 已启用"],
      permissions: {
        admin: "管理员负责账号、角色权限、基础配置以及支付和消息能力配置。",
      },
      content: `
        <div class="grid cols-2">
          <div class="card">
            <div class="card-title">角色与权限</div>
            <div class="list">
              <div class="list-item"><div class="list-title">管理员</div><div class="muted">系统配置、角色权限、全局监管</div></div>
              <div class="list-item"><div class="list-title">教务/运营</div><div class="muted">课程、班级、活动、订单、跟进处理</div></div>
              <div class="list-item"><div class="list-title">教师</div><div class="muted">班级查看、作业批改、学习进度跟进</div></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">系统基础配置</div>
            <div class="list">
              <div class="list-item"><div class="list-title">支付配置</div><div class="muted">微信支付回调与人工补单兜底</div></div>
              <div class="list-item"><div class="list-title">消息配置</div><div class="muted">课程提醒、每日任务提醒、反馈提醒</div></div>
              <div class="list-item"><div class="list-title">会员权益模板</div><div class="muted">基础课程、活动资格、提醒服务开关</div></div>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">管理员职责说明</div>
            <div class="muted">管理员可查看课程和资源详情，但课程编辑、资源录入、班级排课、作业分配等日常动作由教务/运营完成。</div>
          </div>
          <div class="card">
            <div class="card-title">演示重点</div>
            <div class="muted">这页用来证明后台不只是教学工具，还有角色权限、支付和消息等系统级管理能力。</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-followups": {
    title: "后台跟进任务",
    subtitle: "未完成任务和逾期作业进入跟进池",
    tip: "这是整套系统差异化的关键页，要重点讲“持续督学”而不是单纯卖课。",
    render: () => adminPage({
      breadcrumb: "后台 / 督学与跟进 / 跟进任务",
      title: "待跟进任务池",
      actions: ["人工跟进模式", "自动提醒已开启"],
      permissions: {
        operator: "运营核心工作台，专门处理未完成任务、逾期作业和续费提醒。",
      },
      content: `
      <div class="admin-panel">
        <div class="admin-panel-head">
          <div>
            <div class="card-title" style="margin-bottom:4px;">待跟进列表</div>
            <div class="muted">未完成任务和逾期作业自动进入此处。</div>
          </div>
          <div class="tool-chip">共 ${followupItems().length} 条任务</div>
        </div>
        <div class="admin-panel-body">
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>学员</th><th>触发原因</th><th>负责人</th><th>状态</th></tr></thead>
              <tbody>${followupItems().map(item => `<tr><td>${item.name}</td><td>${item.reason}</td><td>${item.owner}</td><td><span class="status warn">待处理</span></td></tr>`).join("")}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="cta-row">
        <div class="btn ghost" data-action="admin-to-student">查看对应学员档案</div>
      </div>
    `,
    }),
  },
  "teacher-progress": {
    title: "教师学习进度跟进",
    subtitle: "教师从教学视角跟进学员进度，不处理运营事务",
    tip: "这里重点强调教师可以跟进学习进度，但不承担续费、退款、活动等运营工作。",
    render: () => adminPage({
      breadcrumb: "教师工作台 / 学员学习进度",
      title: "学习进度跟进",
      actions: ["异常学员 2", "待反馈 1"],
      permissions: {
        teacher: "可查看到课、作业、每日任务和学习异常，并填写教学反馈。",
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">重点关注学员</div>
              <div class="muted">以下信息仅用于教学跟进，不包含订单、退款、会员配置等运营字段。</div>
            </div>
            <div class="tool-chip">教学视角</div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>学员</th><th>到课情况</th><th>作业完成</th><th>每日任务</th><th>教师动作</th></tr></thead>
                <tbody>
                  <tr><td>小林美咲</td><td>正常</td><td>已提交并点评</td><td>已完成</td><td><span class="status">继续跟进</span></td></tr>
                  <tr><td>高桥真由</td><td>正常</td><td>正常</td><td>昨日未完成</td><td><span class="status warn">需教学提醒</span></td></tr>
                  <tr><td>李可欣</td><td>请假一次</td><td>已提交</td><td>正常</td><td><span class="status">关注出勤</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">教师可做的跟进</div>
            <div class="list">
              <div class="list-item"><div class="list-title">查看学习异常</div><div class="muted">例如未完成每日任务、作业延迟、出勤异常。</div></div>
              <div class="list-item"><div class="list-title">填写教学反馈</div><div class="muted">记录课堂表现和学习建议。</div></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">教师不处理的内容</div>
            <div class="muted">续费推进、退款处理、活动配置、会员权益调整均由教务/运营处理。</div>
          </div>
        </div>
      `,
    }),
  },
  "mini-home": {
    title: "小程序首页",
    subtitle: "学员最重要的信息收口页",
    tip: "从这里开始切到学员视角，强调用户一登录就能看到课程、课表、任务和活动。",
    render: () => phone(`
      <div class="section-title">你好，${data.student.name}</div>
      <div class="card">
        <div class="list-title">${data.student.course}</div>
        <div class="muted">${data.student.membership}</div>
        <div class="badge-row"><span class="tag">课程服务中</span><span class="tag">会员权益中</span></div>
      </div>
      <div class="card">
        <div class="section-title">最近课表</div>
        ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${item.title}</div><div class="muted">${item.date}</div></div>`).join("")}
      </div>
      <div class="card">
        <div class="section-title">今日任务</div>
        <div class="muted">5 个词汇 + ${data.dailyTask.grammarCount} 个语法题</div>
        <div class="btn" style="margin-top:12px;" data-action="go-task">去完成</div>
        ${state.dailyTaskCompleted ? `<div class="notice">今日任务已完成，连续打卡 ${data.dailyTask.streak + 1} 天。</div>` : ""}
      </div>
      <div class="card">
        <div class="section-title">推荐活动</div>
        <div class="list-title">${data.activity.title}</div>
        <div class="muted">${data.activity.time} · ${data.activity.fee}</div>
        <div class="btn ghost" style="margin-top:12px;" data-action="go-activity">查看活动</div>
      </div>
      ${phoneNav()}
    `),
  },
  "mini-course": {
    title: "小程序课程详情",
    subtitle: "课程转化与价值展示",
    tip: "这一页接转化闭环，重点讲购买课程后自动获得会员权益。",
    render: () => phone(`
      <div class="section-title">${data.student.course}</div>
      <span class="tag">购买课程自动获得会员权益</span>
      <div class="card">
        <div class="muted">周期：6 个月 / 形式：小班课 / 服务：课表、作业、每日任务、老师反馈、学习档案</div>
      </div>
      <div class="btn secondary" data-action="purchase-course">立即购买</div>
      ${phoneNav()}
    `),
  },
  "mini-payment": {
    title: "小程序支付成功",
    subtitle: "购买后直接进入课程服务与会员权益",
    tip: "这一页用来把“支付成功 -> 课程服务生效 -> 会员权益生效”讲清楚。",
    render: () => phone(`
      <div class="card highlight">
        <div class="section-title">支付成功</div>
        <div class="muted">你已成功购买 ${data.student.course}</div>
      </div>
      <div class="card">
        <div class="section-title">立即生效</div>
        <div class="list">
          <div class="list-item"><div class="list-title">课程服务已开通</div><div class="muted">${data.student.className} 已加入</div></div>
          <div class="list-item"><div class="list-title">会员权益已激活</div><div class="muted">课程服务期内可享受会员权益</div></div>
        </div>
      </div>
      <div class="btn">查看我的课表</div>
      <div class="btn ghost" style="margin-top:10px;" data-action="go-schedule">进入课程学习</div>
      ${phoneNav()}
    `),
  },
  "mini-schedule": {
    title: "小程序课表",
    subtitle: "购课后进入班级并查看课次安排",
    tip: "这里强调这不是内容页，而是真实排课和班级管理的学员视图。",
    render: () => phone(`
      <div class="section-title">我的课表</div>
      ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${item.title}</div><div class="muted">${item.date} · ${item.status}</div></div>`).join("")}
      <div class="btn" style="margin-top:12px;">提交请假申请</div>
      <div class="btn ghost" style="margin-top:10px;" data-action="go-homework">查看课后作业</div>
      ${phoneNav()}
    `),
  },
  "mini-homework": {
    title: "小程序作业",
    subtitle: "作业提交与教师反馈",
    tip: "这里讲学员提交后能收到老师反馈，反馈会回流进学习档案。",
    render: () => phone(`
      <div class="section-title">${data.homework.title}</div>
      <div class="card">
        <div class="muted">截止时间：${data.homework.due}</div>
      </div>
      <div class="btn" data-action="submit-homework">${state.homeworkSubmitted ? "已提交作业" : "提交语音作业"}</div>
      ${state.homeworkSubmitted ? `<div class="notice">作业已提交，教师反馈已同步进入学习档案。</div>` : ""}
      <div class="card" style="margin-top:14px;">
        <div class="section-title">教师反馈</div>
        <div class="tag">评分 ${data.homework.score}</div>
        <div class="muted">${data.homework.feedback}</div>
      </div>
      ${phoneNav()}
    `),
  },
  "mini-task": {
    title: "小程序每日任务",
    subtitle: "每日任务完成即视为打卡成功",
    tip: "这里重点讲打卡不是签到，而是每天有具体学习任务，完成后会影响后台跟进状态。",
    render: () => phone(`
      <div class="section-title">今日词汇任务</div>
      <div class="list">
        ${data.dailyTask.vocab.map(word => `<div class="list-item"><div class="list-title">${word}</div><div class="muted">已加入今日学习任务</div></div>`).join("")}
      </div>
      <div class="card" style="margin-top:14px;">
        <div class="muted">语法题任务：${data.dailyTask.grammarCount} 题</div>
        <div class="muted">连续完成：${state.dailyTaskCompleted ? data.dailyTask.streak + 1 : data.dailyTask.streak} 天</div>
      </div>
      <div class="btn" style="margin-top:14px;" data-action="complete-task">${state.dailyTaskCompleted ? "今日任务已完成" : "完成今日任务"}</div>
      ${state.dailyTaskCompleted ? `<div class="notice">打卡成功，系统已从后台移除你的提醒任务。</div>` : ""}
      ${phoneNav()}
    `),
  },
  "mini-activity": {
    title: "小程序活动详情",
    subtitle: "活动作为品牌获客与学员留存的延伸入口",
    tip: "这页用来说明活动既能获客，也能增强会员粘性，但一期不把它做得太重。",
    render: () => phone(`
      <div class="section-title">${data.activity.title}</div>
      <div class="card">
        <div class="muted">${data.activity.desc}</div>
        <div class="badge-row">
          <span class="tag">${data.activity.type}</span>
          <span class="tag">${data.activity.fee}</span>
        </div>
      </div>
      <div class="card" style="margin-top:14px;">
        <div class="muted">时间：${data.activity.time}</div>
        <div class="muted">地点：${data.activity.location}</div>
        <div class="muted">当前状态：${data.activity.status}</div>
      </div>
      <div class="cta-row">
        <div class="btn">立即报名</div>
        <div class="btn ghost">取消报名</div>
      </div>
      ${phoneNav()}
    `),
  },
  "mini-profile": {
    title: "小程序学习档案",
    subtitle: "学习数据、反馈和服务沉淀",
    tip: "最后用这页收尾，强调到课、作业、每日任务和教师反馈最终都会沉淀成长期服务资产。",
    render: () => phone(`
      <div class="section-title">学习档案</div>
      <div class="card">
        <div class="muted">会员状态：${data.student.membership}</div>
        <div class="muted">到课率：${data.metrics.attendanceRate}</div>
        <div class="muted">作业完成率：${data.metrics.homeworkRate}</div>
        <div class="muted">每日任务完成率：${data.metrics.dailyTaskRate}</div>
      </div>
      <div class="card" style="margin-top:14px;">
        <div class="section-title">最新反馈</div>
        <div class="muted">${data.homework.feedback}</div>
      </div>
      <div class="demo-tip">演示提示：这里强调到课、作业、每日任务、反馈会统一沉淀为学习档案。</div>
      ${phoneNav()}
    `),
  },
  "mini-messages": {
    title: "小程序消息提醒",
    subtitle: "上课、任务、反馈等提醒统一收口",
    tip: "这页用来说明提醒服务有真实承接，不是口头描述。",
    render: () => phone(`
      <div class="section-title">消息提醒</div>
      <div class="list">
        ${data.notifications.map((item) => `
          <div class="list-item">
            <div class="list-title">${item.title}</div>
            <div class="muted">${item.type}</div>
          </div>
        `).join("")}
      </div>
      ${phoneNav()}
    `),
  },
};

function metricCard(value, label) {
  return `<div class="card"><div class="metric">${value}</div><div class="metric-label">${label}</div></div>`;
}

function renderStudentDetailByRole() {
  if (state.currentRole === "admin") {
    return `
      <div class="grid cols-2">
        <div class="card">
          <div class="card-title">${data.student.name}</div>
          <div class="muted">${data.student.membership}</div>
          <div class="muted">当前课程：${data.student.course}</div>
          <div class="muted">所属班级：${data.student.className}</div>
          <div class="badge-row">
            <span class="tag">课程服务中</span>
            <span class="tag">会员权益有效</span>
          </div>
        </div>
        <div class="card">
          <div class="card-title">管理视角摘要</div>
          <div class="muted">最近订单：${data.orders.length} 笔</div>
          <div class="muted">退款记录：${data.refunds.length} 笔</div>
          <div class="muted">续费状态：${data.student.renewal}</div>
          <div class="muted">当前目标：${data.student.goal}</div>
        </div>
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">订单概览</div>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>商品</th><th>金额</th><th>状态</th></tr></thead>
              <tbody>${data.orders.map(item => `<tr><td>${item.item}</td><td>${item.amount}</td><td>${item.status}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-title">管理说明</div>
          <div class="muted">管理员查看的是学员与课程、会员、订单之间的整体关系，不深入到作业完成率和每日任务执行层明细。</div>
        </div>
      </div>
    `;
  }

  if (state.currentRole === "teacher") {
    return `
      <div class="grid cols-2">
        <div class="card">
          <div class="card-title">${data.student.name}</div>
          <div class="muted">当前课程：${data.student.course}</div>
          <div class="muted">所属班级：${data.student.className}</div>
          <div class="muted">学习目标：${data.student.goal}</div>
        </div>
        <div class="card">
          <div class="card-title">学习进度</div>
          <div class="muted">到课率：${data.metrics.attendanceRate}</div>
          <div class="muted">作业完成率：${data.metrics.homeworkRate}</div>
          <div class="muted">每日任务完成率：${data.metrics.dailyTaskRate}</div>
        </div>
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">教师反馈</div>
          <div class="tag">评分 ${data.homework.score}</div>
          <div class="muted">${data.homework.feedback}</div>
        </div>
        <div class="card">
          <div class="card-title">教师可操作内容</div>
          <div class="muted">可查看学习异常、点评作业、填写阶段反馈；不查看订单退款与运营跟进内容。</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="grid cols-2">
      <div class="card">
        <div class="card-title">${data.student.name}</div>
        <div class="muted">${data.student.membership}</div>
        <div class="muted">当前课程：${data.student.course}</div>
        <div class="muted">所属班级：${data.student.className}</div>
        <div class="badge-row">
          <span class="tag">课程服务中</span>
          <span class="tag">会员权益有效</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">学习状态</div>
        <div class="muted">到课率：${data.metrics.attendanceRate}</div>
        <div class="muted">作业完成率：${data.metrics.homeworkRate}</div>
        <div class="muted">每日任务完成率：${data.metrics.dailyTaskRate}</div>
        <div class="muted">学习目标：${data.student.goal}</div>
      </div>
    </div>
    <div class="split" style="margin-top:18px;">
      <div class="card">
        <div class="card-title">服务与续费</div>
        <div class="muted">${data.student.renewal}</div>
        <div class="muted" style="margin-top:10px;">系统将在课程后半程自动进入续费提醒和运营跟进。</div>
        <div class="cta-row">
          <div class="btn">新建学员</div>
          <div class="btn ghost">编辑学员信息</div>
          <div class="btn ghost">调整会员权益</div>
          <div class="btn ghost">更新续费备注</div>
          <div class="btn ghost" data-action="admin-to-followups">查看跟进</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">运营视角说明</div>
        <div class="muted">教务/运营同时关注学员学习状态、服务状态和续费跟进，是学员服务的主操作者。</div>
        <div class="demo-tip">这页要体现 operator 的编辑能力：改学员档案、补充会员权益、记录续费与服务备注。</div>
      </div>
    </div>
  `;
}

function renderAdminWorkspace() {
  const tabs = adminWorkspaceTabs.filter((item) => item.roles.includes(state.currentRole));
  const current = tabs.find((item) => item.key === state.currentAdminPage) ? state.currentAdminPage : tabs[0].key;
  state.currentAdminPage = current;
  const groupedTabs = tabs.reduce((acc, item) => {
    const section = item.section || "工作区";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});
  return `
    <div class="experience-shell">
      <div class="experience-menu">
        <div class="experience-menu-title">后台工作区</div>
        ${Object.entries(groupedTabs).map(([section, items]) => `
          <div class="experience-section">
            <div class="experience-section-title">${section}</div>
            <div class="experience-menu-group">
              ${items.map((item) => `<button class="experience-tab ${item.key === current ? "active" : ""}" data-admin-tab="${item.key}">${item.label}</button>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
      <div class="experience-main">
        ${views[current].render()}
      </div>
    </div>
  `;
}

function renderMiniWorkspace() {
  const current = state.currentMiniPage;
  return `
    <div class="mini-shell">
      <div class="mini-shell-head"></div>
      <div class="mini-topbar">
        <strong>KotobaLink</strong>
        <span class="tag">${data.student.name}</span>
      </div>
      <div class="mini-content">
        ${miniInnerContent(current)}
      </div>
      <div class="mini-bottom-nav">
        ${miniWorkspaceTabs.map((item) => `<div class="mini-bottom-btn ${item.key === current ? "active" : ""}" data-mini-tab="${item.key}">${item.label}</div>`).join("")}
      </div>
    </div>
  `;
}

function miniInnerContent(current) {
  if (current === "mini-home") {
    return `
      <div class="card">
        <div class="section-title">你好，${data.student.name}</div>
        <div class="muted">${data.student.course}</div>
        <div class="badge-row"><span class="tag">课程服务中</span><span class="tag">会员权益中</span></div>
      </div>
      <div class="card">
        <div class="section-title">最近课表</div>
        ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${item.title}</div><div class="muted">${item.date}</div></div>`).join("")}
        <div class="cta-row"><div class="btn" data-action="mini-to-schedule">查看课表</div><div class="btn ghost" data-action="go-activity">活动入口</div></div>
      </div>
      <div class="card">
        <div class="section-title">今日任务</div>
        <div class="muted">5 个词汇 + ${data.dailyTask.grammarCount} 个语法题</div>
        <div class="btn" style="margin-top:12px;" data-action="go-task">去完成</div>
        ${state.dailyTaskCompleted ? `<div class="notice">今日任务已完成，连续打卡 ${data.dailyTask.streak + 1} 天。</div>` : ""}
      </div>
    `;
  }
  if (current === "mini-course") {
    return `
      <div class="card">
        <div class="section-title">${data.student.course}</div>
        <span class="tag">购买课程自动获得会员权益</span>
        <div class="muted" style="margin-top:8px;">周期：6 个月 / 形式：小班课 / 服务：课表、作业、每日任务、老师反馈、学习档案</div>
        <div class="cta-row">
          <div class="btn secondary" data-action="purchase-course">立即购买</div>
          <div class="btn ghost" data-action="mini-to-payment">查看支付结果</div>
        </div>
      </div>
      ${state.purchased ? `
      <div class="card highlight">
        <div class="section-title">购课后自动生效</div>
        <div class="muted">课程服务期内会员权益已激活，可直接进入课表和学习流程。</div>
      </div>` : ""}
    `;
  }
  if (current === "mini-task") {
    return `
      <div class="card">
        <div class="section-title">今日词汇任务</div>
        ${data.dailyTask.vocab.map(word => `<div class="list-item"><div class="list-title">${word}</div><div class="muted">今日学习词汇</div></div>`).join("")}
      </div>
      <div class="card">
        <div class="muted">语法题任务：${data.dailyTask.grammarCount} 题</div>
        <div class="muted">连续完成：${state.dailyTaskCompleted ? data.dailyTask.streak + 1 : data.dailyTask.streak} 天</div>
        <div class="cta-row">
          <div class="btn" data-action="complete-task">${state.dailyTaskCompleted ? "今日任务已完成" : "完成今日任务"}</div>
          <div class="btn ghost" data-action="mini-to-homework">查看作业</div>
        </div>
        ${state.dailyTaskCompleted ? `<div class="notice">打卡成功，后台跟进任务已自动更新。</div>` : ""}
      </div>
    `;
  }
  if (current === "mini-profile") {
    return `
      <div class="card">
        <div class="section-title">学习档案</div>
        <div class="muted">会员状态：${data.student.membership}</div>
        <div class="muted">到课率：${data.metrics.attendanceRate}</div>
        <div class="muted">作业完成率：${data.metrics.homeworkRate}</div>
        <div class="muted">每日任务完成率：${data.metrics.dailyTaskRate}</div>
      </div>
      <div class="card">
        <div class="section-title">最新反馈</div>
        <div class="tag">评分 ${data.homework.score}</div>
        <div class="muted">${data.homework.feedback}</div>
        <div class="cta-row">
          <div class="btn ghost" data-action="mini-to-homework">查看作业</div>
          <div class="btn ghost" data-action="go-activity">查看活动</div>
        </div>
      </div>
    `;
  }
  if (current === "mini-messages") {
    return `
      <div class="card">
        <div class="section-title">消息提醒</div>
        <div class="list">
          ${data.notifications.map((item) => `
            <div class="list-item">
              <div class="list-title">${item.title}</div>
              <div class="muted">${item.type}</div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="card">
        <div class="section-title">提醒价值</div>
        <div class="muted">上课、每日任务、作业反馈和会员状态都能通过统一消息入口承接。</div>
      </div>
    `;
  }
  if (current === "mini-schedule") {
    return `
      <div class="card">
        <div class="section-title">我的课表</div>
        ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${item.title}</div><div class="muted">${item.date} · ${item.status}</div></div>`).join("")}
        <div class="cta-row"><div class="btn">提交请假申请</div><div class="btn ghost" data-action="mini-to-homework">查看课后作业</div></div>
      </div>
    `;
  }
  if (current === "mini-homework") {
    return `
      <div class="card">
        <div class="section-title">${data.homework.title}</div>
        <div class="muted">截止时间：${data.homework.due}</div>
        <div class="cta-row"><div class="btn" data-action="submit-homework">${state.homeworkSubmitted ? "已提交作业" : "提交语音作业"}</div><div class="btn ghost" data-action="mini-to-profile">同步到学习档案</div></div>
        ${state.homeworkSubmitted ? `<div class="notice">作业已提交，教师反馈已同步进入学习档案。</div>` : ""}
      </div>
      <div class="card">
        <div class="section-title">教师反馈</div>
        <div class="tag">评分 ${data.homework.score}</div>
        <div class="muted">${data.homework.feedback}</div>
      </div>
    `;
  }
  if (current === "mini-payment") {
    return `
      <div class="card highlight">
        <div class="section-title">支付成功</div>
        <div class="muted">你已成功购买 ${data.student.course}</div>
      </div>
      <div class="card">
        <div class="list">
          <div class="list-item"><div class="list-title">课程服务已开通</div><div class="muted">${data.student.className} 已加入</div></div>
          <div class="list-item"><div class="list-title">会员权益已激活</div><div class="muted">课程服务期内可享受会员权益</div></div>
        </div>
        <div class="cta-row"><div class="btn" data-action="mini-to-schedule">查看我的课表</div></div>
      </div>
    `;
  }
  if (current === "mini-activity") {
    return `
      <div class="card">
        <div class="section-title">${data.activity.title}</div>
        <div class="muted">${data.activity.desc}</div>
        <div class="badge-row"><span class="tag">${data.activity.type}</span><span class="tag">${data.activity.fee}</span></div>
      </div>
      <div class="card">
        <div class="muted">时间：${data.activity.time}</div>
        <div class="muted">地点：${data.activity.location}</div>
        <div class="muted">状态：${data.activity.status}</div>
        <div class="cta-row"><div class="btn">立即报名</div><div class="btn ghost">取消报名</div></div>
      </div>
    `;
  }
  return `<div class="card"><div class="muted">页面准备中</div></div>`;
}

function adminPage({ breadcrumb, title, actions = [], content }) {
  const currentRole = state.currentRole;
  const meta = roleMeta[currentRole];
  const permissions = arguments[0].permissions || {};
  return `
    <div class="admin-shell">
      <div class="admin-header">
        <div>
          <div class="admin-breadcrumb">${breadcrumb}</div>
          <h2 class="admin-title">${title}</h2>
        </div>
        <div class="admin-toolbar">
          ${actions.map((item) => `<div class="tool-chip">${item}</div>`).join("")}
        </div>
      </div>
      <div class="permission-banner">
        <div>
          <div class="permission-role">当前后台角色：${meta.label}</div>
          <div class="permission-list">${permissions[currentRole] || meta.summary}</div>
        </div>
        <div class="tool-chip">权限演示模式</div>
      </div>
      ${content}
    </div>
  `;
}

function phone(content) {
  return `<div class="phone"><div class="phone-top"></div>${content}</div>`;
}

function phoneNav() {
  return `
    <div class="phone-nav">
      <span data-action="mini-nav-home">首页</span>
      <span data-action="mini-nav-course">课程</span>
      <span data-action="mini-nav-task">任务</span>
      <span data-action="mini-nav-messages">消息</span>
      <span data-action="mini-nav-profile">我的</span>
    </div>
  `;
}

function followupItems() {
  if (state.dailyTaskCompleted) {
    return data.followups.filter((item) => item.name !== data.student.name);
  }
  return [{ name: data.student.name, reason: "今日每日任务待完成", owner: "运营-A" }, ...data.followups];
}

const root = document.getElementById("view-root");
const titleEl = document.getElementById("page-title");
const subtitleEl = document.getElementById("page-subtitle");
const pageTipEl = document.getElementById("page-demo-tip");
const buttons = Array.from(document.querySelectorAll(".nav-btn"));
const roleButtons = Array.from(document.querySelectorAll(".role-btn"));

function applyRoleFilter() {
  buttons.forEach((btn) => {
    const roles = btn.dataset.roles;
    if (!roles || roles === "all" || !btn.dataset.view.startsWith("admin-")) {
      btn.classList.remove("hidden-role");
      return;
    }
    const visible = roles.split(",").includes(state.currentRole);
    btn.classList.toggle("hidden-role", !visible);
  });
}

function renderView(viewKey) {
  const view = views[viewKey] || views.overview;
  titleEl.textContent = view.title;
  subtitleEl.textContent = view.subtitle;
  if (view.tip) {
    pageTipEl.style.display = "block";
    pageTipEl.textContent = `演示提示：${view.tip}`;
  } else {
    pageTipEl.style.display = "none";
    pageTipEl.textContent = "";
  }
  root.innerHTML = view.render();
  buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.view === viewKey));
  roleButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.role === state.currentRole));
  applyRoleFilter();
  bindActions();
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => renderView(btn.dataset.view));
});

roleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.currentRole = btn.dataset.role;
    if (state.currentRole === "teacher") {
      state.currentAdminPage = "teacher-progress";
    } else if (state.currentRole === "operator") {
      state.currentAdminPage = "admin-dashboard";
    } else if (state.currentRole === "admin") {
      state.currentAdminPage = "admin-dashboard";
    }
    const activeAdminBtn = buttons.find((item) => item.classList.contains("active") && item.dataset.view.startsWith("admin-"));
    if (activeAdminBtn) {
      const roles = activeAdminBtn.dataset.roles || "";
      if (roles !== "all" && !roles.split(",").includes(state.currentRole)) {
        const fallback = buttons.find((item) => item.dataset.view.startsWith("admin-") && ((item.dataset.roles || "").split(",").includes(state.currentRole)));
        renderView(fallback ? fallback.dataset.view : "overview");
        return;
      }
    }
    renderView(document.querySelector(".nav-btn.active")?.dataset.view || "overview");
  });
});

function bindActions() {
  root.querySelectorAll("[data-admin-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      state.currentAdminPage = el.dataset.adminTab;
      renderView("admin-app");
    });
  });
  root.querySelectorAll("[data-mini-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      state.currentMiniPage = el.dataset.miniTab;
      renderView("mini-app");
    });
  });
  root.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", () => {
      const action = el.dataset.action;
      if (action === "purchase-course") {
        state.purchased = true;
        state.currentMiniPage = "mini-payment";
        renderView("mini-app");
      } else if (action === "go-schedule") {
        state.currentMiniPage = "mini-schedule";
        renderView("mini-app");
      } else if (action === "go-homework") {
        state.currentMiniPage = "mini-homework";
        renderView("mini-app");
      } else if (action === "go-task") {
        state.currentMiniPage = "mini-task";
        renderView("mini-app");
      } else if (action === "go-activity") {
        state.currentMiniPage = "mini-activity";
        renderView("mini-app");
      } else if (action === "submit-homework") {
        state.homeworkSubmitted = true;
        state.currentMiniPage = "mini-homework";
        renderView("mini-app");
      } else if (action === "complete-task") {
        state.dailyTaskCompleted = true;
        state.currentMiniPage = "mini-task";
        renderView("mini-app");
      } else if (action === "mini-to-schedule") {
        state.currentMiniPage = "mini-schedule";
        renderView("mini-app");
      } else if (action === "mini-to-homework") {
        state.currentMiniPage = "mini-homework";
        renderView("mini-app");
      } else if (action === "mini-to-profile") {
        state.currentMiniPage = "mini-profile";
        renderView("mini-app");
      } else if (action === "mini-to-payment") {
        state.currentMiniPage = "mini-payment";
        renderView("mini-app");
      } else if (action === "mini-nav-home") {
        state.currentMiniPage = "mini-home";
        renderView("mini-app");
      } else if (action === "mini-nav-course") {
        state.currentMiniPage = "mini-course";
        renderView("mini-app");
      } else if (action === "mini-nav-task") {
        state.currentMiniPage = "mini-task";
        renderView("mini-app");
      } else if (action === "mini-nav-messages") {
        state.currentMiniPage = "mini-messages";
        renderView("mini-app");
      } else if (action === "mini-nav-profile") {
        state.currentMiniPage = "mini-profile";
        renderView("mini-app");
      } else if (action === "admin-to-courses") {
        state.currentAdminPage = "admin-courses";
        renderView("admin-app");
      } else if (action === "admin-to-student") {
        state.currentAdminPage = "admin-student";
        renderView("admin-app");
      } else if (action === "admin-to-class") {
        state.currentAdminPage = "admin-class";
        renderView("admin-app");
      } else if (action === "admin-to-homework") {
        state.currentAdminPage = "admin-homework";
        renderView("admin-app");
      } else if (action === "admin-to-orders") {
        state.currentAdminPage = "admin-orders";
        renderView("admin-app");
      } else if (action === "admin-to-refunds") {
        state.currentAdminPage = "admin-refunds";
        renderView("admin-app");
      } else if (action === "admin-to-followups") {
        state.currentAdminPage = "admin-followups";
        renderView("admin-app");
      } else if (action === "mini-to-activity") {
        state.currentMiniPage = "mini-activity";
        renderView("mini-app");
      } else if (action === "operator-dashboard-operations") {
        state.operatorDashboardView = "operations";
        state.currentAdminPage = "admin-dashboard";
        renderView("admin-app");
      } else if (action === "operator-dashboard-teaching") {
        state.operatorDashboardView = "teaching";
        state.currentAdminPage = "admin-dashboard";
        renderView("admin-app");
      }
    });
  });
}

applyRoleFilter();
renderView("overview");
