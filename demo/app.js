const data = window.KOTOBALINK_DEMO_DATA;
const state = data.demoState;
const I18N = {
  zh: {
    demoPrototype: "Demo Prototype",
    scenarioNav: "演示シナリオ",
    roleSwitcher: "后台角色切换",
    roleAdmin: "管理员",
    roleOperator: "教务/运营",
    roleTeacher: "教师",
    miniAppNav: "小程序体验",
    launchGuideNav: "上线准备",
    currentDemo: "当前演示",
  },
  ja: {
    demoPrototype: "デモプロトタイプ",
    scenarioNav: "デモシナリオ",
    roleSwitcher: "管理画面ロール切替",
    roleAdmin: "管理者",
    roleOperator: "教務・運営",
    roleTeacher: "教師",
    miniAppNav: "ミニアプリ体験",
    launchGuideNav: "公開準備",
    currentDemo: "現在の表示",
  },
};

function tt(zh, ja) {
  return state.locale === "ja" ? ja : zh;
}

function tl(value) {
  if (value && typeof value === "object" && "zh" in value && "ja" in value) {
    return state.locale === "ja" ? value.ja : value.zh;
  }
  return value;
}

function applyStaticLocale() {
  document.documentElement.lang = state.locale === "ja" ? "ja" : "zh-CN";
  const dict = I18N[state.locale];
  const mappings = [
    ["brand-subtitle", dict.demoPrototype],
    ["scenario-nav-btn", dict.scenarioNav],
    ["role-switcher-title", dict.roleSwitcher],
    ["role-admin-btn", dict.roleAdmin],
    ["role-operator-btn", dict.roleOperator],
    ["role-teacher-btn", dict.roleTeacher],
    ["mini-nav-btn", dict.miniAppNav],
    ["launch-nav-btn", dict.launchGuideNav],
    ["current-demo-title", dict.currentDemo],
  ];
  mappings.forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.locale === state.locale);
  });
}

const roleMeta = {
  admin: {
    label: () => tt("管理员", "管理者"),
    summary: () => tt("主要查看管理与经营数据，负责系统配置、角色权限和全局监管", "管理・経営データを確認し、システム設定・権限・全体監督を担当"),
  },
  operator: {
    label: () => tt("教务/运营", "教務・運営"),
    summary: () => tt("负责课程、班级、学员、活动、跟进和日常运营，不处理系统级配置", "コース・クラス・受講生・活動・フォローなど日常運営を担当し、システム設定は扱わない"),
  },
  teacher: {
    label: () => tt("教师", "教師"),
    summary: () => tt("只关注自己负责的班级、学员、作业批改和阶段反馈", "担当クラス・受講生・課題添削・段階フィードバックに集中"),
  },
};

const adminWorkspaceTabs = [
  { key: "admin-dashboard", label: () => tt("仪表盘", "ダッシュボード"), roles: ["admin"], section: () => tt("管理总览", "管理概要") },
  { key: "admin-leads", label: () => tt("咨询线索", "問い合わせリード"), roles: ["admin", "operator"], section: () => tt("运营管理", "運営管理") },
  { key: "admin-memberships", label: () => tt("会员权益", "会員特典"), roles: ["admin", "operator"], section: () => tt("运营管理", "運営管理") },
  { key: "admin-orders", label: () => tt("订单列表", "注文一覧"), roles: ["admin", "operator"], section: () => tt("运营管理", "運営管理") },
  { key: "admin-refunds", label: () => tt("退款处理", "返金対応"), roles: ["admin", "operator"], section: () => tt("运营管理", "運営管理") },
  { key: "admin-activities", label: () => tt("活动管理", "イベント管理"), roles: ["admin", "operator"], section: () => tt("运营管理", "運営管理") },
  { key: "admin-courses", label: () => tt("课程", "コース"), roles: ["admin", "operator"], section: () => tt("教学运营", "授業運営") },
  { key: "admin-class", label: () => tt("班级管理", "クラス管理"), roles: ["admin", "operator", "teacher"], section: () => tt("教学运营", "授業運営") },
  { key: "admin-student", label: () => tt("学员管理", "受講生管理"), roles: ["admin", "operator", "teacher"], section: () => tt("教学运营", "授業運営") },
  { key: "admin-resources", label: () => tt("资源", "教材"), roles: ["admin", "operator"], section: () => tt("教学运营", "授業運営") },
  { key: "admin-homework", label: () => tt("作业批改", "課題添削"), roles: ["operator", "teacher"], section: () => tt("教学运营", "授業運営") },
  { key: "admin-followups", label: () => tt("跟进任务", "フォロータスク"), roles: ["operator"], section: () => tt("教学运营", "授業運営") },
  { key: "admin-system", label: () => tt("系统管理", "システム管理"), roles: ["admin"], section: () => tt("系统管理", "システム管理") },
  { key: "teacher-progress", label: () => tt("学习进度跟进", "学習進捗フォロー"), roles: ["teacher"], section: () => tt("教学工作台", "教師ワークスペース") },
];

const miniWorkspaceTabs = [
  { key: "mini-home", label: () => tt("首页", "ホーム") },
  { key: "mini-course", label: () => tt("课程", "コース") },
  { key: "mini-task", label: () => tt("任务", "タスク") },
  { key: "mini-messages", label: () => tt("消息", "通知") },
  { key: "mini-profile", label: () => tt("我的", "マイページ") },
];

const views = {
  "launch-guide": {
    title: () => tt("小程序上线准备", "ミニアプリ公開準備"),
    subtitle: () => tt("以大陆企业主体为主线，日企差异做备注", "中国本土企業を基準にし、日系企業の差分を注記"),
    render: () => `
      <div class="focus-toggle-row">
        <div class="btn ${state.launchGuideEnterpriseFocus ? "secondary" : "ghost"}" data-action="toggle-enterprise-focus">
          ${state.launchGuideEnterpriseFocus ? tt("关闭企业准备高亮", "企業準備ハイライトを解除") : tt("高亮企业需要准备", "企業側の準備項目を強調表示")}
        </div>
      </div>
      <div class="card">
        <div class="card-title">${tt("上线前必须准备的事项", "公開前に必ず準備すべき項目")}</div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>${tt("事项", "項目")}</th><th>${tt("是否必须", "必須性")}</th><th>${tt("说明", "説明")}</th></tr>
            </thead>
            <tbody>
              <tr class="${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><td>${tt("企业主体小程序账号", "企業主体のミニアプリ公式アカウント")}</td><td>${tt("必须", "必須")}</td><td>${tt("正式商业项目建议直接使用企业主体", "正式な商用プロジェクトは企業主体で進めるのが望ましい")}</td></tr>
              <tr class="${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><td>${tt("微信认证", "WeChat認証")}</td><td>${tt("必须", "必須")}</td><td>${tt("很多小程序能力和支付依赖认证", "多くの正式機能と決済接続は認証が前提")}</td></tr>
              <tr class="${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><td>${tt("小程序备案", "ミニアプリ備案")}</td><td>${tt("必须", "必須")}</td><td>${tt("未备案通常不能正式发布上线", "備案未完了では通常正式公開できない")}</td></tr>
              <tr><td>${tt("服务类目设置", "サービスカテゴリ設定")}</td><td>${tt("必须", "必須")}</td><td>${tt("主要由开发侧按实际业务配置，企业需确认业务描述和类目口径一致", "主に開発側で実際の業務に合わせて設定し、企業側は業務説明とカテゴリの整合を確認する")}</td></tr>
              <tr><td>${tt("管理员 / 开发者 / 体验者配置", "管理者／開発者／テスター設定")}</td><td>${tt("必须", "必須")}</td><td>${tt("主要由开发侧配置，用于协作开发、真机调试和提审", "主に開発側で設定し、共同開発・実機テスト・審査提出に使う")}</td></tr>
              <tr><td>${tt("隐私政策 / 用户协议 / 收费说明", "プライバシーポリシー／利用規約／料金説明")}</td><td>${tt("必须", "必須")}</td><td>${tt("通常由开发/产品先整理初稿，企业再确认合规和收费口径", "通常は開発・プロダクト側で初稿を整理し、企業側が最終的にコンプライアンスと料金表現を確認する")}</td></tr>
              <tr class="${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><td>${tt("微信支付商户号", "WeChat Pay加盟店アカウント")}</td><td>${tt("若收费则必须", "有料化するなら必須")}</td><td>${tt("KotobaLink 有会员、课程、活动收费，基本需要", "KotobaLink は会員・コース・イベント課金があるため基本的に必要")}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">${tt("需要提前准备的材料", "事前に準備すべき資料")}</div>
          <div class="list">
            <div class="list-item ${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><div class="list-title">${tt("主体材料", "主体資料")}</div><div class="muted">${tt("营业执照、法人身份证信息、联系人手机号、联系邮箱、管理员微信号。", "営業許可証、法人情報、担当者電話番号、メール、管理者WeChatアカウント。")}</div></div>
            <div class="list-item"><div class="list-title">${tt("小程序材料", "ミニアプリ資料")}</div><div class="muted">${tt("小程序名称、Logo、简介、服务类目。", "ミニアプリ名、ロゴ、紹介文、サービスカテゴリ。")}</div></div>
            <div class="list-item ${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><div class="list-title">${tt("合规材料", "コンプライアンス資料")}</div><div class="muted">${tt("用户协议、隐私政策、收费说明、退款规则、客服联系方式。", "利用規約、プライバシーポリシー、料金説明、返金規則、問い合わせ先。")}</div></div>
            <div class="list-item ${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><div class="list-title">${tt("支付材料", "決済資料")}</div><div class="muted">${tt("商户号、结算账户、商户联系人、API 密钥、证书、AppID 绑定信息。", "加盟店アカウント、入金口座、担当者、APIキー、証明書、AppID連携情報。")}</div></div>
          </div>
          <div class="list" style="margin-top:14px;">
            <div class="list-item"><div class="list-title">${tt("当前公开资料下的要求", "公開資料ベースの現時点要件")}</div><div class="muted">${tt("企业主体可注册小程序，可通过主体认证获得更多正式能力；已认证小程序通常才能进一步接通正式支付。", "企業主体はミニアプリ登録が可能で、主体認証後に正式機能が広がる。認証済みであることが正式決済接続の前提になることが多い。")}</div></div>
            <div class="list-item"><div class="list-title">${tt("日企备注", "日系企業メモ")}</div><div class="muted">${tt("如果客户主体是日本公司，主体认证材料通常更多，常见会增加主体登记资料、联系人证件、申请公函、运营授权书、近三个月账单等。", "日本企業主体の場合、主体認証資料は増えることが多く、登記資料、担当者身分証、申請公函、運営委任状、直近3か月の明細などが追加されやすい。")}</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${tt("当前平台要求里最需要注意的点", "現行プラットフォーム要件で特に注意すべき点")}</div>
          <div class="table-wrap">
            <table class="table">
              <thead>
                <tr><th>${tt("项目", "項目")}</th><th>${tt("要求", "要件")}</th><th>${tt("对 KotobaLink 的影响", "KotobaLinkへの影響")}</th></tr>
              </thead>
              <tbody>
                <tr><td>${tt("主体与认证", "主体と認証")}</td><td>${tt("企业主体完成认证后，才能稳定进入正式能力阶段", "企業主体が認証を完了して初めて正式機能へ進みやすくなる")}</td><td>${tt("不认证会卡住支付和正式发布能力", "未認証だと決済接続や正式公開で詰まりやすい")}</td></tr>
                <tr><td>${tt("类目", "カテゴリ")}</td><td>${tt("类目必须和教学/服务业务一致", "カテゴリは教育・サービス内容と一致が必要")}</td><td>${tt("课程、会员、活动、作业、学习档案等描述都要和类目匹配", "コース、会員、イベント、課題、学習記録などの説明がカテゴリと整合している必要がある")}</td></tr>
                <tr><td>${tt("开发者 / 体验者", "開発者／テスター")}</td><td>${tt("已认证小程序通常可绑定更多开发者和体验者", "認証済みミニアプリは通常より多くの開発者・テスターを紐付けられる")}</td><td>${tt("适合教务、运营、开发协作和真机测试", "教務・運営・開発の協業や実機テストに向く")}</td></tr>
                <tr><td>${tt("日企备注", "日系企業メモ")}</td><td>${tt("若主体是日本公司，不能默认直接套用大陆企业的类目、备案和认证口径", "日本企業主体の場合、本土企業のカテゴリ・備案・認証基準をそのまま流用できるとは限らない")}</td><td>${tt("正式上线前要单独确认境外主体要求", "正式公開前に海外主体向け要件を別途確認する必要がある")}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:18px;">
        <div class="card-title">${tt("备案详细说明", "備案の詳細説明")}</div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>${tt("项目", "項目")}</th><th>${tt("说明", "説明")}</th><th>${tt("对 KotobaLink 的意义", "KotobaLinkへの意味")}</th></tr>
            </thead>
            <tbody>
              <tr class="${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><td>${tt("是否需要备案", "備案の必要性")}</td><td>${tt("大陆企业主体正式上线通常需要备案", "中国本土企業主体で正式公開する場合、通常は備案が必要")}</td><td>${tt("课程、会员、活动、作业上传、学习档案、提醒服务等业务描述必须和实际页面一致", "コース、会員、イベント、課題アップロード、学習記録、通知サービスなどの説明を実画面と一致させる必要がある")}</td></tr>
              <tr class="${state.launchGuideEnterpriseFocus ? "enterprise-item" : ""}"><td>${tt("备案重点", "備案の重点")}</td><td>${tt("主体信息、负责人信息、服务内容说明、服务器信息", "主体情報、責任者情報、サービス説明、サーバー情報")}</td><td>${tt("业务描述不能写得过于模糊", "業務説明を曖昧に書きすぎないこと")}</td></tr>
              <tr><td>${tt("日企备注", "日系企業メモ")}</td><td>${tt("如果主体是日本公司，不能默认完全按大陆企业同流程备案，需单独确认当前要求", "日本企業主体の場合、本土企業と同一フローで備案できると決めつけず、現行要件を別途確認する必要がある")}</td><td>${tt("这是日企版最容易影响上线节奏的节点之一", "日系企業版で公開スケジュールに最も影響しやすい項目の一つ")}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--
      <div class="card ${state.launchGuideEnterpriseFocus ? "enterprise-focus" : ""}" style="margin-top:18px;">
        <div class="card-title">${tt("配置项详细说明", "設定項目の詳細説明")}</div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>${tt("配置项", "設定項目")}</th><th>${tt("作用", "役割")}</th><th>${tt("上线前要求", "公開前要件")}</th></tr>
            </thead>
            <tbody>
              <tr><td>${tt("正式 AppID", "正式AppID")}</td><td>${tt("小程序正式身份标识", "ミニアプリの正式識別子")}</td><td>${tt("必须切换到正式主体的 AppID", "正式主体に対応する AppID へ切替必須")}</td></tr>
              <tr><td>${tt("request 合法域名", "request 許可ドメイン")}</td><td>${tt("允许小程序访问后端接口", "バックエンドAPIへのアクセス許可")}</td><td>${tt("正式后端域名需加入后台白名单", "正式バックエンドのドメインをホワイトリストへ追加")}</td></tr>
              <tr><td>${tt("upload 合法域名", "upload 許可ドメイン")}</td><td>${tt("承接作业音频、图片等上传", "課題音声・画像などのアップロード受け口")}</td><td>${tt("上传服务或对象存储域名需提前配置", "アップロード用またはストレージ用ドメインを事前設定")}</td></tr>
              <tr><td>${tt("业务域名", "業務ドメイン")}</td><td>${tt("承接协议页、说明页等网页内容", "規約ページや説明ページなどのWeb表示")}</td><td>${tt("若有 H5 页面，也要加入业务域名", "H5ページがある場合は業務ドメインへ追加")}</td></tr>
              <tr><td>${tt("消息与支付回调配置", "通知・決済コールバック設定")}</td><td>${tt("承接任务提醒、支付通知等", "タスク通知や決済通知の受信")}</td><td>${tt("正式环境需使用生产回调地址和正式配置", "本番用のコールバックURLと設定を使用")}</td></tr>
              <tr><td>${tt("开发者 / 体验者配置", "開発者／テスター設定")}</td><td>${tt("支持协作和真机测试", "共同開発と実機テストに対応")}</td><td>${tt("上线前需要配置测试人员、教务和运营体验账号", "公開前にテスト担当・教務・運営用アカウントを設定")}</td></tr>
            </tbody>
          </table>
        </div>
        <div class="list" style="margin-top:14px;">
          <div class="list-item"><div class="list-title">${tt("日企备注", "日系企業メモ")}</div><div class="muted">${tt("如果主体是日本公司，技术配置本身大体类似，但要额外确认正式 AppID 对应主体、支付方案和回调绑定关系。", "日本企業主体でも技術設定の大枠は近いが、正式AppIDの主体、決済方式、コールバック連携関係を追加確認する必要がある。")}</div></div>
        </div>
      </div>
      <div class="card ${state.launchGuideEnterpriseFocus ? "enterprise-focus" : ""}" style="margin-top:18px;">
        <div class="card-title">${tt("支付关系说明", "決済関係の説明")}</div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>${tt("关系项", "関係項目")}</th><th>${tt("为什么重要", "重要な理由")}</th><th>${tt("对 KotobaLink 的实际影响", "KotobaLinkへの実際の影響")}</th></tr>
            </thead>
            <tbody>
              <tr><td>${tt("小程序 AppID ↔ 小程序主体", "ミニアプリ AppID ↔ 主体")}</td><td>${tt("决定正式小程序的身份、认证和类目基础", "正式ミニアプリの主体、認証、カテゴリの基礎を決める")}</td><td>${tt("课程、会员、活动这些收费和服务都挂在这个正式主体上", "コース・会員・イベント等の課金とサービスがこの正式主体に紐づく")}</td></tr>
              <tr><td>${tt("小程序 AppID ↔ 商户号绑定", "AppID ↔ 加盟店アカウント連携")}</td><td>${tt("决定小程序能否在正式环境收款", "本番環境で決済できるかを左右する")}</td><td>${tt("不绑定或绑定关系不对，就只能停留在 Demo / mock 支付阶段", "未連携または連携不整合だと Demo / mock 決済のまま止まる")}</td></tr>
              <tr><td>${tt("商户号 ↔ 结算主体", "加盟店アカウント ↔ 入金主体")}</td><td>${tt("决定钱最终结到谁的账户", "最終的な入金先を決める")}</td><td>${tt("如果客户是日企，这里要先确认是大陆商户、跨境还是服务商方案", "日系企業主体なら中国本土加盟店・越境決済・サービス事業者方式のどれかを先に確認する必要がある")}</td></tr>
              <tr><td>${tt("商户号 ↔ API 密钥 / 证书", "加盟店アカウント ↔ APIキー／証明書")}</td><td>${tt("决定后端能否完成签名、回调验签、退款处理", "署名・コールバック検証・返金処理が可能かを決める")}</td><td>${tt("支付成功、退款、订单状态和权益发放都依赖这层关系", "決済成功、返金、注文状態、権利付与がすべてここに依存する")}</td></tr>
              <tr><td>${tt("支付回调 ↔ 订单 / 权益系统", "決済コールバック ↔ 注文／権利システム")}</td><td>${tt("决定订单、会员权益、课程权益是否能自动联动", "注文・会員特典・コース権利が自動連動できるかを決める")}</td><td>${tt("如果没打通，会出现支付成功但课程没开通、退款后状态没回收的问题", "未連携だと支払い完了でもコース未開通、返金後状態未回収などが起こる")}</td></tr>
            </tbody>
          </table>
        </div>
        <div class="list" style="margin-top:14px;">
          <div class="list-item"><div class="list-title">${tt("日企备注", "日系企業メモ")}</div><div class="muted">${tt("如果主体是日本公司，这里最需要先确认的是：是否能直接使用当前主体接商户号，还是需要跨境支付或服务商方案。", "日本企業主体の場合、現在の主体で直接加盟店アカウントを使えるのか、越境決済やサービス事業者方式が必要なのかを最優先で確認すべき。")}</div></div>
        </div>
      </div>
      -->
      <div class="card" style="margin-top:18px;">
        <div class="card-title">${tt("审核详细说明", "審査の詳細説明")}</div>
        <div class="list">
          <div class="list-item"><div class="list-title">${tt("审核重点", "審査の重点")}</div><div class="muted">${tt("主体、类目、页面功能、收费链路、隐私政策、用户协议与实际业务是否一致。", "主体、カテゴリ、画面機能、課金導線、プライバシーポリシー、利用規約が実際の業務と一致しているか。")}</div></div>
          <div class="list-item"><div class="list-title">${tt("KotobaLink 的重点关注项", "KotobaLinkで重点確認されやすい項目")}</div><div class="muted">${tt("课程收费、会员权益、活动报名、作业上传、学习档案、提醒服务、退款说明都要写清楚。", "コース課金、会員特典、イベント申込、課題アップロード、学習記録、通知サービス、返金説明を明確に書く必要がある。")}</div></div>
          <div class="list-item"><div class="list-title">${tt("常见风险", "よくあるリスク")}</div><div class="muted">${tt("类目不匹配、收费说明不清、隐私收集说明不完整、页面承诺和实际功能对不上。", "カテゴリ不一致、料金説明不足、個人情報収集説明の不足、画面説明と実機能の不一致。")}</div></div>
          <div class="list-item"><div class="list-title">${tt("日企备注", "日系企業メモ")}</div><div class="muted">${tt("如果主体是日本公司，还要额外注意境外主体资料、业务描述、支付方案和主体信息的一致性。", "日本企業主体の場合、海外主体資料、業務説明、決済方式、主体情報の整合性も追加で注意が必要。")}</div></div>
        </div>
      </div>
      <div class="card" style="margin-top:18px;">
        <div class="card-title">${tt("微信支付商户号详细说明", "WeChat Pay加盟店アカウントの詳細説明")}</div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>${tt("项目", "項目")}</th><th>${tt("说明", "説明")}</th><th>${tt("对 KotobaLink 的意义", "KotobaLinkへの意味")}</th></tr>
            </thead>
            <tbody>
              <tr><td>${tt("为什么需要商户号", "加盟店アカウントが必要な理由")}</td><td>${tt("小程序内正式收费要通过微信支付商户体系收款", "ミニアプリ内の正式課金は WeChat Pay 加盟店体系で受ける必要がある")}</td><td>${tt("会员、课程、活动三类商品都依赖正式收款能力", "会員、コース、イベントの3種類の課金が正式決済能力に依存する")}</td></tr>
              <tr><td>${tt("开通前提", "開通前提")}</td><td>${tt("通常要求主体已认证，并具备可结算账户", "通常は主体認証済みで、入金可能口座を持つことが前提")}</td><td>${tt("没有商户号就只能停留在 Demo 或 mock 支付阶段", "加盟店アカウントがなければ Demo / mock 決済段階に留まる")}</td></tr>
              <tr><td>${tt("核心准备资料", "主要準備資料")}</td><td>${tt("主体信息、结算账户、联系人、商户资料、证书和密钥", "主体情報、入金口座、担当者、加盟店資料、証明書、キー")}</td><td>${tt("后端要接支付回调、签名和订单状态流转", "バックエンドで決済通知、署名、注文状態連動を扱う必要がある")}</td></tr>
              <tr><td>${tt("AppID 绑定", "AppID連携")}</td><td>${tt("正式小程序 AppID 需要与正式商户号绑定", "正式ミニアプリ AppID は正式加盟店アカウントと連携が必要")}</td><td>${tt("购课、会员开通、活动报名才能在正式环境支付", "コース購入、会員開通、イベント申込を本番環境で決済可能にする")}</td></tr>
              <tr><td>${tt("上线前联调", "公開前結合確認")}</td><td>${tt("必须验证下单、支付成功、回调、退款状态更新", "注文、支払成功、コールバック、返金状態更新の確認が必須")}</td><td>${tt("否则课程权益、会员权益和订单状态会对不上", "未確認だとコース権利、会員特典、注文状態がずれる")}</td></tr>
              <tr><td>${tt("退款处理", "返金処理")}</td><td>${tt("当前方案是人工审核退款，但系统仍要记录退款状态", "現行案では返金は手動審査だが、システム上の返金状態記録は必要")}</td><td>${tt("商户号和后台要支持退款申请、人工判定和状态留痕", "加盟店アカウントと管理画面で返金申請、手動判定、状態記録を支える必要がある")}</td></tr>
            </tbody>
          </table>
        </div>
        <div class="list" style="margin-top:14px;">
          <div class="list-item"><div class="list-title">${tt("日企备注", "日系企業メモ")}</div><div class="muted">${tt("如果主体是日本公司，不能默认直接按大陆企业商户号流程即可，应先确认是否能直接绑定当前主体商户，还是需要跨境支付或服务商方案。", "日本企業主体の場合、本土企業と同じ加盟店アカウント方式で進められると決めつけず、直接連携可能か、越境決済か、サービス事業者方式かを先に確認すべき。")}</div></div>
        </div>
      </div>
      <div class="card" style="margin-top:18px;">
        <div class="card-title">${tt("资料来源说明", "参考資料")}</div>
        <div class="list">
          <div class="list-item"><div class="list-title">${tt("官方入口", "公式入口")}</div><div class="muted"><a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer">微信公众平台</a> / <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/" target="_blank" rel="noreferrer">微信开放文档（小程序）</a> / <a href="https://pay.weixin.qq.com/" target="_blank" rel="noreferrer">微信支付商户平台</a></div></div>
          <div class="list-item"><div class="list-title">${tt("认证与境外主体材料", "認証と海外主体資料")}</div><div class="muted"><a href="https://help.allvalue.com.cn/zh-CN/articles/6740741-%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%94%B3%E8%AF%B7%E5%8F%8A%E8%AE%A4%E8%AF%81" target="_blank" rel="noreferrer">AllValue：微信小程序申请及认证</a></div></div>
          <div class="list-item"><div class="list-title">${tt("注册 / 开发者 / 审核说明", "登録／開発者／審査説明")}</div><div class="muted"><a href="https://www.pwmapp.com/xiaochengxuzhuce/" target="_blank" rel="noreferrer">小程序注册流程整理页</a> / <a href="https://sxl.zendesk.com/hc/zh-cn/articles/900001070486-%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AE%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%9C%8D%E5%8A%A1%E7%B1%BB%E7%9B%AE" target="_blank" rel="noreferrer">服务类目说明</a> / <a href="https://news.cnr.cn/native/gd/20230810/t20230810_526372380.shtml" target="_blank" rel="noreferrer">备案通知参考</a></div></div>
          <div class="list-item"><div class="list-title">${tt("支付绑定关系", "決済連携関係")}</div><div class="muted"><a href="https://sxl.zendesk.com/hc/zh-cn/articles/115000152081-%E5%BC%80%E9%80%9A%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%94%AF%E4%BB%98-%E7%BB%91%E5%AE%9A%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98%E8%B4%A6%E5%8F%B7" target="_blank" rel="noreferrer">开通小程序支付 - 绑定微信支付账号</a> / <a href="https://www.itiger.com/hans/news/2604219785" target="_blank" rel="noreferrer">微信跨境相关公开资料</a></div></div>
          <div class="list-item"><div class="list-title">${tt("用户协议 / 隐私政策", "利用規約／プライバシーポリシー")}</div><div class="muted">${tt("微信没有统一官方的用户协议模板，可参考", "WeChat には統一の公式利用規約テンプレートはなく、")}<a href="https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/" target="_blank" rel="noreferrer">${tt("用户隐私保护指引", "ユーザープライバシー保護ガイド")}</a>${tt("，并用", "を参考にし、")}<a href="https://www.xieyimao.com/" target="_blank" rel="noreferrer">协议猫</a> / <a href="https://toolbox.yolo.blue/" target="_blank" rel="noreferrer">工具箱生成器</a>${tt("先出初稿。", "で初稿を作る方法が現実的。")}</div></div>
        </div>
      </div>
    `,
  },
  scenario: {
    title: () => tt("演示シナリオ", "デモシナリオ"),
    subtitle: () => tt("按闭环、角色和权限整理的演示脚本", "クローズドループ・役割・権限で整理したデモ台本"),
    render: () => `
      <div class="card">
        <div class="card-title">${tt("角色与展示功能对照", "役割と表示機能の対応")}</div>
        <div class="table-wrap table-wrap-scroll">
          <table class="table">
            <thead>
              <tr><th>${tt("角色", "役割")}</th><th>${tt("主要操作", "主な操作")}</th><th>${tt("当前 Demo 展示功能", "現在の Demo 表示機能")}</th><th>${tt("角色功能范围", "役割の機能範囲")}</th></tr>
            </thead>
            <tbody>
              <tr><td>${tt("访客", "訪問者")}</td><td>${tt("查看课程、发起咨询、购买课程", "コース閲覧・問い合わせ・コース購入")}</td><td>${tt("课程页、支付成功页、咨询线索入口", "コースページ・決済完了ページ・問い合わせ導線")}</td><td>${tt("不进入后台，不接触学习数据", "管理画面には入らず、学習データにも触れない")}</td></tr>
              <tr><td>${tt("学员/会员", "受講生／会員")}</td><td>${tt("查看课表、完成任务、提交作业、看档案", "時間割確認・タスク実施・課題提出・学習記録確認")}</td><td>${tt("首页、课程、任务、消息、作业、学习档案", "ホーム・コース・タスク・通知・課題・学習記録")}</td><td>${tt("只操作自己的学习服务内容", "自分の学習サービス範囲のみ操作")}</td></tr>
              <tr><td>${tt("教师", "教師")}</td><td>${tt("查看班级、批改作业、跟进学习进度", "クラス確認・課題添削・学習進捗フォロー")}</td><td>${tt("教学工作台、班级管理、作业批改、学习进度跟进", "教師ワークスペース・クラス管理・課題添削・進捗フォロー")}</td><td>${tt("不处理订单、退款、会员权益和活动运营", "注文・返金・会員特典・イベント運営は扱わない")}</td></tr>
              <tr><td>${tt("教务/运营", "教務・運営")}</td><td>${tt("建班级、排课、跟进、退款、续费", "クラス作成・授業配置・フォロー・返金・継続対応")}</td><td>${tt("咨询线索、学员管理、班级管理、订单、退款、活动、跟进任务", "問い合わせ・受講生管理・クラス管理・注文・返金・イベント・フォロータスク")}</td><td>${tt("不处理系统底层配置和角色权限", "システム設定やロール権限は扱わない")}</td></tr>
              <tr><td>${tt("管理员", "管理者")}</td><td>${tt("监管经营结果和系统规则", "経営結果とシステムルールの監督")}</td><td>${tt("管理总览、课程、资源、系统管理", "管理概要・コース・教材・システム管理")}</td><td>${tt("课程/资源以只读监管为主，负责系统配置", "コース／教材は主に閲覧監督、システム設定を担当")}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card" style="margin-top:18px;">
        <div class="card-title">${tt("角色驱动的闭环总览", "役割起点のクローズドループ概要")}</div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>${tt("闭环", "クローズドループ")}</th><th>${tt("谁先发起", "起点")}</th><th>${tt("角色链路", "役割の流れ")}</th><th>${tt("当前 Demo 展示功能", "現在の Demo 表示機能")}</th><th>${tt("形成结果", "到達結果")}</th></tr>
            </thead>
            <tbody>
              <tr><td>${tt("转化闭环", "転換クローズドループ")}</td><td>${tt("访客", "訪問者")}</td><td>${tt("访客 -> 学员/会员 -> 系统 -> 教务/运营", "訪問者 -> 受講生／会員 -> システム -> 教務・運営")}</td><td>${tt("课程页、支付成功页、会员权益规则、学员管理", "コースページ・決済完了ページ・会員特典ルール・受講生管理")}</td><td>${tt("用户购买后自动成为学员/会员并进入服务流程", "購入後に自動で受講生／会員となり、サービスフローへ入る")}</td></tr>
              <tr><td>${tt("教学闭环", "授業クローズドループ")}</td><td>${tt("教务/运营", "教務・運営")}</td><td>${tt("教务/运营 -> 教师 -> 学员", "教務・運営 -> 教師 -> 受講生")}</td><td>${tt("课程管理、班级管理、我的课表、作业批改", "コース管理・クラス管理・時間割・課題添削")}</td><td>${tt("课程成功交付到班级和学员端", "コースがクラスと受講生側へ適切に提供される")}</td></tr>
              <tr><td>${tt("督学闭环", "学習伴走クローズドループ")}</td><td>${tt("系统", "システム")}</td><td>${tt("系统 -> 学员 -> 教师/教务运营", "システム -> 受講生 -> 教師／教務・運営")}</td><td>${tt("每日任务、小程序消息、教学仪表盘、学习进度、跟进任务", "日次タスク・通知・授業ダッシュボード・学習進捗・フォロータスク")}</td><td>${tt("异常学员进入持续督学和提醒流程", "学習遅延者が継続フォローと通知フローに入る")}</td></tr>
              <tr><td>${tt("反馈留存闭环", "フィードバック・継続クローズドループ")}</td><td>${tt("学员", "受講生")}</td><td>${tt("学员 -> 教师 -> 系统 -> 教务/运营", "受講生 -> 教師 -> システム -> 教務・運営")}</td><td>${tt("作业页、作业批改、学习档案、学员管理、订单/退款", "課題ページ・課題添削・学習記録・受講生管理・注文／返金")}</td><td>${tt("学习记录沉淀为服务和续费依据", "学習記録がサービス継続と更新判断の根拠になる")}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card" style="margin-top:18px;">
        <div class="card-title">${tt("闭环详细シナリオ", "クローズドループ詳細シナリオ")}</div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>${tt("闭环", "クローズドループ")}</th><th>${tt("角色", "役割")}</th><th>${tt("操作", "操作")}</th><th>${tt("当前 Demo 展示功能", "現在の Demo 表示機能")}</th><th>${tt("权限应用", "権限の適用")}</th><th>${tt("阶段结果", "段階結果")}</th></tr>
            </thead>
            <tbody>
              <tr><td rowspan="4">${tt("转化闭环", "転換クローズドループ")}</td><td>${tt("访客", "訪問者")}</td><td>${tt("查看课程、发起咨询或直接购买", "コース閲覧・問い合わせ・直接購入")}</td><td>${tt("公众号引流、课程展示、咨询线索", "公式導線・コース表示・問い合わせリード")}</td><td>${tt("访客只能提交咨询或直接购买", "訪問者は問い合わせ送信または直接購入のみ可能")}</td><td>${tt("形成线索或直接进入交易", "リード化または直接購入に進む")}</td></tr>
              <tr><td>${tt("学员/会员", "受講生／会員")}</td><td>${tt("完成购课或开通会员", "コース購入または会員登録を完了")}</td><td>${tt("小程序课程页、支付成功页", "ミニアプリのコースページ・決済完了ページ")}</td><td>${tt("用户只有购买和查看自己的服务权限", "購入と自分のサービス確認のみ可能")}</td><td>${tt("订单完成", "注文完了")}</td></tr>
              <tr><td>${tt("系统", "システム")}</td><td>${tt("自动创建学员/会员身份并激活权益", "受講生／会員ステータスを自動生成し特典を有効化")}</td><td>${tt("订单状态联动、会员权益规则、学员档案", "注文連動・会員特典ルール・受講生記録")}</td><td>${tt("系统自动生成身份，不需要人工新建学员", "手動登録なしでシステムが自動反映")}</td><td>${tt("用户进入课程服务或会员服务", "コースサービスまたは会員サービスへ進む")}</td></tr>
              <tr><td>${tt("教务/运营", "教務・運営")}</td><td>${tt("跟进已成交学员并安排服务", "成約済み受講生をフォローしサービスを手配")}</td><td>${tt("学员管理、班级管理、跟进任务", "受講生管理・クラス管理・フォロータスク")}</td><td>${tt("operator 负责后续分班、排课和服务跟进", "教務・運営がクラス分け・授業配置・サービスフォローを担当")}</td><td>${tt("转化闭环进入教学和服务阶段", "転換フローが授業・サービス段階へ移る")}</td></tr>

              <tr><td rowspan="4">${tt("教学闭环", "授業クローズドループ")}</td><td>${tt("教务/运营", "教務・運営")}</td><td>${tt("创建课程并配置教学内容", "コース作成と授業内容設定")}</td><td>${tt("课程管理、资源", "コース管理・教材")}</td><td>${tt("operator 可新建课程和配置资源，admin 只读", "教務・運営は作成・設定可、管理者は主に閲覧")}</td><td>${tt("课程可售卖、可交付", "販売・提供可能な状態になる")}</td></tr>
              <tr><td>${tt("教务/运营", "教務・運営")}</td><td>${tt("新建班级、分班、排课", "クラス作成・振分・授業配置")}</td><td>${tt("班级管理、学员分班、课次安排", "クラス管理・受講生振分・授業回設定")}</td><td>${tt("operator 负责班级结构和课次安排", "教務・運営がクラス構成と授業日程を担当")}</td><td>${tt("班级进入运行", "クラス運用開始")}</td></tr>
              <tr><td>${tt("教师", "教師")}</td><td>${tt("查看班级并准备授课", "クラス確認と授業準備")}</td><td>${tt("教学工作台、班级管理", "教師ワークスペース・クラス管理")}</td><td>${tt("teacher 只看到自己负责班级", "教師は担当クラスのみ閲覧")}</td><td>${tt("教学执行准备完成", "授業実施準備完了")}</td></tr>
              <tr><td>${tt("学员", "受講生")}</td><td>${tt("查看课表与作业", "時間割と課題を確認")}</td><td>${tt("小程序课表、作业页", "ミニアプリ時間割・課題ページ")}</td><td>${tt("只能看到自己的班级课次和作业", "自分のクラス・授業回・課題のみ表示")}</td><td>${tt("教学服务落到学员端", "授業サービスが受講生側に届く")}</td></tr>

              <tr><td rowspan="4">${tt("督学闭环", "学習伴走クローズドループ")}</td><td>${tt("教务/运营", "教務・運営")}</td><td>${tt("配置每日任务模板", "日次タスクテンプレート設定")}</td><td>${tt("课程管理、资源、教学配置", "コース管理・教材・授業設定")}</td><td>${tt("operator 负责任务规则和抽题范围", "教務・運営が出題ルールと抽題範囲を設定")}</td><td>${tt("任务规则生效", "タスクルール有効化")}</td></tr>
              <tr><td>${tt("系统", "システム")}</td><td>${tt("生成当日任务并发出提醒", "当日タスク生成と通知送信")}</td><td>${tt("每日任务、小程序消息", "日次タスク・通知")}</td><td>${tt("系统按课程优先抽题", "コースに応じて優先出題")}</td><td>${tt("学员收到学习任务", "受講生が学習タスクを受け取る")}</td></tr>
              <tr><td>${tt("学员", "受講生")}</td><td>${tt("完成或未完成任务", "タスク完了または未完了")}</td><td>${tt("小程序任务页", "ミニアプリのタスクページ")}</td><td>${tt("学员只能提交自己的完成状态", "自分の完了状態のみ送信可能")}</td><td>${tt("任务状态写回系统", "タスク状態がシステムへ反映")}</td></tr>
              <tr><td>${tt("教师 / 教务运营", "教師／教務・運営")}</td><td>${tt("查看异常并跟进", "異常確認とフォロー")}</td><td>${tt("教学仪表盘、学习进度、跟进任务", "授業ダッシュボード・学習進捗・フォロータスク")}</td><td>${tt("teacher 处理教学提醒，operator 处理运营跟进", "教師は学習面、教務・運営は運営面をフォロー")}</td><td>${tt("形成持续督学机制", "継続的な学習伴走が成立")}</td></tr>

              <tr><td rowspan="4">${tt("反馈留存闭环", "フィードバック・継続クローズドループ")}</td><td>${tt("学员", "受講生")}</td><td>${tt("提交作业", "課題提出")}</td><td>${tt("小程序作业页", "ミニアプリ課題ページ")}</td><td>${tt("学员只可提交自己的作业", "自分の課題のみ提出可能")}</td><td>${tt("作业进入批改池", "課題が添削待ちへ入る")}</td></tr>
              <tr><td>${tt("教师", "教師")}</td><td>${tt("批改作业并填写反馈", "課題添削とフィードバック入力")}</td><td>${tt("作业批改、学习进度", "課題添削・学習進捗")}</td><td>${tt("teacher 可点评和填写教学反馈", "教師は添削と授業フィードバックを入力可能")}</td><td>${tt("教学反馈沉淀", "授業フィードバックが蓄積")}</td></tr>
              <tr><td>${tt("系统", "システム")}</td><td>${tt("同步到学习档案", "学習記録へ自動反映")}</td><td>${tt("学习档案、学员管理", "学習記録・受講生管理")}</td><td>${tt("系统聚合作业、任务、到课、反馈", "課題・タスク・出席・フィードバックを集約")}</td><td>${tt("形成长期学习记录", "長期学習記録が形成される")}</td></tr>
              <tr><td>${tt("教务/运营", "教務・運営")}</td><td>${tt("依据档案做服务和续费判断", "記録をもとにサービス継続判断")}</td><td>${tt("学员管理、订单、跟进任务", "受講生管理・注文・フォロータスク")}</td><td>${tt("operator 可记录续费备注和服务状态", "教務・運営が継続メモとサービス状態を記録")}</td><td>${tt("留存与续费闭环形成", "継続利用と更新のクローズドループが成立")}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
  },
  overview: {
    title: () => tt("演示总览", "デモ概要"),
    subtitle: () => tt("四条业务闭环一屏看清", "4つの業務クローズドループを一覧化"),
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
            <div class="list-item"><div class="list-title">${data.student.name}</div><div class="muted">${tl(data.student.course)} / ${tl(data.student.className)}</div></div>
            <div class="list-item"><div class="list-title">${tt("会员状态", "会員状態")}</div><div class="muted">${tl(data.student.membership)}</div></div>
            <div class="list-item"><div class="list-title">${tt("当前续费状态", "現在の更新状態")}</div><div class="muted">${tl(data.student.renewal)}</div></div>
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
    title: () => tt("后台系统体验", "管理画面体験"),
    subtitle: () => tt("带权限切换的后台工作区演示", "権限切替付きの管理画面デモ"),
    tip: "先切换角色，再在工作区里点不同模块，客户会更容易理解权限和职责边界。",
    render: () => renderAdminWorkspace(),
  },
  "mini-app": {
    title: () => tt("小程序体验", "ミニアプリ体験"),
    subtitle: () => tt("学员端主流程演示", "受講生向け主要フローデモ"),
    tip: "直接在手机壳里切换页面和完成动作，让客户感受到真实学习流程。",
    render: () => renderMiniWorkspace(),
  },
  "admin-dashboard": {
    title: () => tt("后台仪表盘", "管理画面ダッシュボード"),
    subtitle: () => tt("运营和教学指标集中展示", "運営と授業指標の集約表示"),
    tip: "先用这一页建立客户对“可运营系统”的认知，再继续进入课程和班级。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 仪表盘", "管理画面 / ダッシュボード"),
      title: state.currentRole === "admin" ? tt("管理总览", "管理概要") : state.operatorDashboardView === "operations" ? tt("运营仪表盘", "運営ダッシュボード") : tt("教学仪表盘", "授業ダッシュボード"),
      actions: state.currentRole === "admin" ? [tt("课程总数 6", "コース総数 6"), tt("班级总数 9", "クラス総数 9"), tt("退款申请 1", "返金申請 1")] : state.operatorDashboardView === "operations" ? [tt("待跟进 3", "フォロー待ち 3"), tt("退款申请 1", "返金申請 1"), tt("续费提醒 2", "更新案内 2")] : [tt("今日课程 2", "本日の授業 2"), tt("待批改 4", "添削待ち 4"), tt("异常学员 2", "要注意受講生 2")],
      permissions: {
        admin: tt("仅查看管理和经营视角数据，不下钻到具体教学执行。", "管理・経営視点のデータのみ確認し、授業実行の細部までは扱わない。"),
        operator: tt("教务/运营首页拆成运营仪表盘和教学仪表盘，分别承接线索/订单/活动与班级/作业/任务。", "教務・運営のホームは運営ダッシュボードと授業ダッシュボードに分かれ、リード・注文・活動とクラス・課題・タスクを分けて扱う。"),
      },
      content: state.currentRole === "admin" ? `
      <div class="grid cols-3">
        ${metricCard(data.metrics.leads, tt("咨询人数", "問い合わせ件数"))}
        ${metricCard(data.metrics.courseOrders, tt("课程购买人数", "コース購入者数"))}
        ${metricCard(data.metrics.memberships, tt("会员开通人数", "会員開通者数"))}
        ${metricCard(data.metrics.totalCourses, tt("课程总数", "コース総数"))}
        ${metricCard(data.metrics.totalClasses, tt("班级总数", "クラス総数"))}
        ${metricCard(data.metrics.totalStudents, tt("学员总数", "受講生総数"))}
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">${tt("经营与管理摘要", "経営・管理サマリー")}</div>
          <div class="mini-grid">
            ${metricCard(data.metrics.revenue, tt("订单金额", "注文金額"))}
            ${metricCard(data.metrics.refunds, tt("退款人数", "返金人数"))}
            ${metricCard(data.metrics.renewalRate, tt("续费率", "更新率"))}
            ${metricCard("1", tt("待审核事项", "確認待ち事項"))}
          </div>
        </div>
        <div class="card">
          <div class="card-title">${tt("管理视角说明", "管理視点の説明")}</div>
          <div class="muted">${tt("管理员首页只看经营、规模和风险，不下钻到作业完成率、每日任务完成率、学员跟进等教学执行层细节。", "管理者ホームでは経営・規模・リスクを確認し、課題完了率や日次タスク完了率など授業実行の細部までは扱わない。")}</div>
        </div>
      </div>
    ` : state.operatorDashboardView === "operations" ? `
      <div class="dashboard-switch">
        <button class="switch-chip active" data-action="operator-dashboard-operations">${tt("运营仪表盘", "運営ダッシュボード")}</button>
        <button class="switch-chip" data-action="operator-dashboard-teaching">${tt("教学仪表盘", "授業ダッシュボード")}</button>
      </div>
      <div class="grid cols-3">
        ${metricCard(data.metrics.leads, tt("咨询人数", "問い合わせ件数"))}
        ${metricCard(data.metrics.courseOrders, tt("课程购买人数", "コース購入者数"))}
        ${metricCard(data.metrics.memberships, tt("会员开通人数", "会員開通者数"))}
        ${metricCard(data.metrics.revenue, tt("订单金额", "注文金額"))}
        ${metricCard(data.metrics.refunds, tt("退款人数", "返金人数"))}
        ${metricCard(data.metrics.renewalRate, tt("续费率", "更新率"))}
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">${tt("运营待处理", "運営の対応待ち")}</div>
          <div class="list">
            <div class="list-item"><div class="list-title">${tt("公众号新线索 2 条", "新規問い合わせ 2件")}</div><div class="muted">${tt("待安排试听和回访", "体験手配と追客待ち")}</div></div>
            <div class="list-item"><div class="list-title">${tt("退款申请 1 笔", "返金申請 1件")}</div><div class="muted">${tt("需人工审核和权益回收确认", "手動審査と権利回収確認が必要")}</div></div>
            <div class="list-item"><div class="list-title">${tt("续费提醒 2 人", "更新案内 2名")}</div><div class="muted">${tt("课程后半程学员进入续费跟进", "コース後半の受講生が更新フォロー段階に入る")}</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${tt("运营视角说明", "運営視点の説明")}</div>
          <div class="muted">${tt("这里不展示作业完成率和每日任务完成率，重点看咨询、订单、会员、退款、活动和续费跟进。", "ここでは課題完了率や日次タスク完了率は出さず、問い合わせ、注文、会員、返金、イベント、更新フォローを重点表示する。")}</div>
        </div>
      </div>
    ` : `
      <div class="dashboard-switch">
        <button class="switch-chip" data-action="operator-dashboard-operations">${tt("运营仪表盘", "運営ダッシュボード")}</button>
        <button class="switch-chip active" data-action="operator-dashboard-teaching">${tt("教学仪表盘", "授業ダッシュボード")}</button>
      </div>
      <div class="grid cols-3">
        ${metricCard(data.metrics.activeStudents, tt("在读学员数", "在籍受講生数"))}
        ${metricCard(data.metrics.attendanceRate, tt("到课率", "出席率"))}
        ${metricCard(data.metrics.dailyTaskRate, tt("每日任务完成率", "日次タスク完了率"))}
        ${metricCard(data.metrics.homeworkRate, tt("作业完成率", "課題完了率"))}
        ${metricCard(data.metrics.totalClasses, tt("班级总数", "クラス総数"))}
        ${metricCard("4", tt("待批改作业", "添削待ち課題"))}
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">${tt("教学执行摘要", "授業実行サマリー")}</div>
          <div class="list">
            <div class="list-item"><div class="list-title">${tt("今日课程 2 节", "本日の授業 2件")}</div><div class="muted">${tt("班级排课正常，教师已确认", "授業配置は正常、教師確認済み")}</div></div>
            <div class="list-item"><div class="list-title">${tt("待批改作业 4 份", "添削待ち課題 4件")}</div><div class="muted">${tt("教师端已进入批改工作台", "教師側で添削ワークスペースへ入っている")}</div></div>
            <div class="list-item"><div class="list-title">${tt("任务异常学员 2 人", "要注意受講生 2名")}</div><div class="muted">${tt("未完成每日任务，需教学或运营跟进", "日次タスク未完了のため授業または運営フォローが必要")}</div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${tt("教学异常提醒", "授業アラート")}</div>
          <div class="list">
            ${followupItems().map(item => `<div class="list-item"><div class="list-title">${item.name}</div><div class="muted">${tl(item.reason)}</div></div>`).join("")}
          </div>
          <div class="demo-tip">${tt("这里专门承接班级、作业和每日任务执行情况，和线索、订单、退款分开看。", "ここではクラス、課題、日次タスクの実行状況を扱い、リード・注文・返金とは分けて見せます。")}</div>
        </div>
      </div>
    `,
    }),
  },
  "admin-leads": {
    title: () => tt("后台咨询线索", "バックオフィス 問い合わせリード"),
    subtitle: () => tt("公众号咨询统一进入后台线索池", "公式アカウント経由の問い合わせを一元管理"),
    tip: "这页用来说明公众号咨询会进入后台统一跟进，而不是散在聊天里。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 咨询与学员 / 咨询线索", "バックオフィス / 相談と受講生 / 問い合わせリード"),
      title: tt("咨询线索池", "問い合わせリード一覧"),
      actions: [tt("今日新增 3", "本日新規 3"), tt("待跟进 2", "フォロー待ち 2")],
      permissions: {
        admin: tt("可查看全部咨询线索和流转状态。", "すべての問い合わせリードと進行状態を確認できます。"),
        operator: tt("可跟进咨询、记录沟通、安排试听，并承接已成交用户的后续服务。", "問い合わせ対応、連絡記録、体験手配、成約後の継続サービスを担当します。"),
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("公众号咨询线索", "公式アカウント経由のリード")}</div>
              <div class="muted">${tt("所有咨询统一进入后台，便于跟进、试听安排和后续转化服务。", "すべての問い合わせをバックオフィスへ集約し、フォロー、体験手配、成約後対応を行います。")}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">${tt("来源：公众号", "流入元：公式アカウント")}</div>
              ${state.currentRole === "operator" ? `<div class="btn">${tt("安排试听", "体験手配")}</div>` : ""}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("姓名", "氏名")}</th><th>${tt("当前水平", "現在レベル")}</th><th>${tt("学习目标", "学習目標")}</th><th>${tt("状态", "状態")}</th></tr></thead>
                <tbody>
                  ${data.leads.map((item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${tl(item.level)}</td>
                      <td>${tl(item.goal)}</td>
                      <td><span class="status ${tl(item.status) === tt("待跟进", "要フォロー") ? "warn" : ""}">${tl(item.status)}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="cta-row">
          ${state.currentRole === "operator" ? `<div class="btn">${tt("记录跟进", "フォロー記録")}</div>` : ""}
          <div class="btn" data-action="admin-to-courses">${tt("查看推荐课程", "おすすめコースを見る")}</div>
          <div class="btn ghost" data-action="admin-to-student">${tt("查看学员档案", "受講生プロフィールを見る")}</div>
        </div>
      `,
    }),
  },
  "admin-memberships": {
    title: () => tt("后台会员权益", "バックオフィス 会員特典"),
    subtitle: () => tt("会员方案和权益配置", "会員プランと特典設定"),
    tip: "这里重点解释用户既可以单独买会员，也可以买课程后自动获得会员权益。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 会员 / 会员权益", "バックオフィス / 会員 / 会員特典"),
      title: tt("会员方案与权益", "会員プランと特典"),
      actions: [tt("方案 2", "プラン 2"), tt("支持人工权益调整", "個別特典の手動調整に対応")],
      permissions: {
        admin: tt("可配置会员方案、权益模板和人工调整策略。", "会員プラン、特典テンプレート、手動調整ルールを設定できます。"),
        operator: tt("可编辑会员方案展示、维护权益说明，并对个别用户补充权益。", "会員プラン表示と特典説明を管理し、個別ユーザーへ特典を追加できます。"),
      },
      content: `
        <div class="grid cols-2">
          ${data.membershipPlans.map((item) => `
            <div class="card">
              <div class="card-title">${tl(item.name)}</div>
              <div class="muted">${tt("有效期：", "有効期間：")}${tl(item.duration)}</div>
              <div class="muted">${tt("价格：", "価格：")}${item.price}</div>
              <div class="muted">${tt("权益：", "特典：")}${tl(item.benefits)}</div>
            </div>
          `).join("")}
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${tt("通用权益项", "共通特典項目")}</div>
            <div class="list">
              <div class="list-item"><div class="list-title">${tt("基础课程访问权", "基礎コース閲覧権")}</div></div>
              <div class="list-item"><div class="list-title">${tt("会员价购买资格", "会員価格での購入資格")}</div></div>
              <div class="list-item"><div class="list-title">${tt("活动报名资格", "イベント申込資格")}</div></div>
              <div class="list-item"><div class="list-title">${tt("每日任务/消息提醒", "日次タスク／通知リマインド")}</div></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">${tt("与课程关系", "コースとの関係")}</div>
            <div class="muted">${tt("用户可单独购买会员；购买精品课程后，也会在课程服务期内自动获得会员权益。", "ユーザーは会員のみを購入することもでき、上級コース購入時には提供期間中の会員特典も自動で付与されます。")}</div>
            <div class="cta-row">
              ${state.currentRole === "operator" ? `<div class="btn">${tt("编辑会员方案", "会員プランを編集")}</div><div class="btn ghost">${tt("补充用户权益", "ユーザー特典を追加")}</div>` : ""}
              <div class="btn ghost" data-action="admin-to-student">${tt("查看学员权益效果", "受講生側の特典反映を見る")}</div>
            </div>
          </div>
        </div>
      `,
    }),
  },
  "admin-courses": {
    title: () => tt("后台课程", "バックオフィス コース"),
    subtitle: () => tt("课程列表与课程详情按角色区分展示", "コース一覧と詳細をロール別に表示"),
    tip: "这里重点讲清基础课程、精品课程、会员权益和课程服务期的关系。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 课程 / 课程列表", "バックオフィス / コース / コース一覧"),
      title: state.currentRole === "admin" ? tt("课程列表与详情", "コース一覧と詳細") : tt("课程管理", "コース管理"),
      actions: [tt("课程总数 3", "コース合計 3"), tt("精品课程 2", "上級コース 2"), tt("基础课程 1", "基礎コース 1")],
      permissions: {
        admin: tt("只查看课程列表、课程详情和权益关系，不负责日常课程编辑。", "コース一覧、詳細、特典関係のみ確認し、日常的な編集は行いません。"),
        operator: tt("负责创建课程、维护服务周期、课程状态和教学配置。", "コース作成、提供期間管理、ステータス管理、教学設定を担当します。"),
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("课程列表", "コース一覧")}</div>
              <div class="muted">${state.currentRole === "admin" ? tt("管理员查看课程商品结构、服务周期和权益关系，不介入日常编辑。", "管理者は商品構成、提供期間、特典関係を確認し、日常編集には関与しません。") : tt("支持基础课程与精品课程统一配置，控制服务期与会员权益联动。", "基礎コースと上級コースを共通設定し、提供期間と会員特典の連動を管理します。")}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">${tt("筛选：全部", "絞り込み：すべて")}</div>
              ${state.currentRole === "operator" ? `<div class="btn">${tt("新建课程", "コース新規作成")}</div>` : `<div class="tool-chip">${tt("只读查看", "閲覧専用")}</div>`}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("课程名称", "コース名")}</th><th>${tt("类型", "種別")}</th><th>${tt("服务周期", "提供期間")}</th><th>${tt("权益规则", "特典ルール")}</th><th>${tt("状态", "状態")}</th></tr></thead>
                <tbody>
                  ${data.courses.map((item) => `
                    <tr>
                      <td>${tl(item.name)}</td>
                      <td>${tl(item.type)}</td>
                      <td>${tl(item.duration)}</td>
                      <td>${tl(item.benefit)}</td>
                      <td><span class="status ${tl(item.status) === tt("待开班", "開講待ち") ? "warn" : ""}">${tl(item.status)}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? tt("课程详情摘要", "コース詳細サマリー") : tt("课程编辑示意", "コース編集イメージ")}</div>
            <div class="muted">${tt("课程名称：", "コース名：")}${tl(data.student.course)}</div>
            <div class="muted">${tt("课程类型：精品课程", "コース種別：上級コース")}</div>
            <div class="muted">${tt("服务周期：6 个月", "提供期間：6か月")}</div>
            <div class="muted">${tt("会员权益：购课后课程服务期内自动生效", "会員特典：購入後、コース提供期間中に自動有効化")}</div>
            <div class="cta-row">
              ${state.currentRole === "operator" ? `<div class="btn">${tt("新建班级", "クラス新規作成")}</div>` : ""}
              <div class="btn ghost" data-action="admin-to-class">${tt("查看对应班级", "対応クラスを見る")}</div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? tt("管理员查看重点", "管理者の確認ポイント") : tt("课程配置重点", "コース設定のポイント")}</div>
            <div class="list">
              <div class="list-item"><div class="list-title">${tt("课程分类", "コース分類")}</div><div class="muted">${tt("区分基础课程和精品课程。", "基礎コースと上級コースを区別します。")}</div></div>
              <div class="list-item"><div class="list-title">${tt("服务周期", "提供期間")}</div><div class="muted">${tt("决定课程服务和会员权益生效区间。", "コース提供と会員特典の有効期間を決めます。")}</div></div>
              <div class="list-item"><div class="list-title">${state.currentRole === "admin" ? tt("资源关联", "リソース連携") : tt("作业与任务绑定", "課題とタスクの紐付け")}</div><div class="muted">${state.currentRole === "admin" ? tt("查看课程关联的班级、资源和权益结构。", "コースに紐づくクラス、リソース、特典構成を確認します。") : tt("课程可统一配置作业资源与每日任务模板。", "コース単位で課題リソースと日次タスクテンプレートを設定できます。")}</div></div>
            </div>
          </div>
        </div>
      `,
    }),
  },
  "admin-class": {
    title: () => tt("后台班级管理", "バックオフィス クラス管理"),
    subtitle: () => tt("班级列表、排课和教学交付统一管理", "クラス一覧、時間割、授業提供を一元管理"),
    tip: "这一页既要讲清班级列表，也要让客户看到班级详情、排课和学员分班是如何落在一起的。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 班级与课表 / 班级管理", "バックオフィス / クラスと時間割 / クラス管理"),
      title: state.currentRole === "teacher" ? tt("我的班级", "担当クラス") : tt("班级管理", "クラス管理"),
      actions: [tt("在运行班级 3", "運用中クラス 3"), tt("本周课次 6", "今週の授業 6"), ...(state.currentRole === "operator" ? [tt("支持新建班级", "クラス新規作成対応")] : [tt("教师：山田老师", "教師：山田先生")])],
      permissions: {
        admin: tt("可查看班级列表、班级详情、教师安排和整体运行状态。", "クラス一覧、クラス詳細、教師配置、全体運用状況を確認できます。"),
        operator: tt("可编辑班级信息、教师安排、学员分班、排课与请假调课。", "クラス情報、教師配置、受講生振り分け、時間割、欠席・振替を編集できます。"),
        teacher: tt("可查看自己负责班级、课次和学员进度，不处理班级结构性编辑。", "担当クラス、授業予定、受講生進捗を確認できますが、クラス構造の編集は行いません。"),
      },
      content: `
      <div class="grid cols-2">
        <div class="card">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("班级列表", "クラス一覧")}</div>
              <div class="muted">${state.currentRole === "teacher" ? tt("教师只看到自己负责的班级。", "教師は自分が担当するクラスのみ表示されます。") : tt("按课程、教师和状态查看当前班级运行情况。", "コース、教師、状態ごとにクラス運用状況を確認します。")}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">${tt("筛选：进行中", "絞り込み：進行中")}</div>
              ${state.currentRole === "operator" ? `<div class="btn">${tt("新建班级", "クラス新規作成")}</div>` : ""}
            </div>
          </div>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>${tt("班级", "クラス")}</th><th>${tt("课程", "コース")}</th><th>${tt("教师", "教師")}</th><th>${tt("人数", "人数")}</th><th>${tt("状态", "状態")}</th></tr></thead>
              <tbody>
                <tr><td>${tl(data.student.className)}</td><td>${tl(data.student.course)}</td><td>${tl(data.student.teacher)}</td><td>6/8</td><td><span class="status">${tt("进行中", "進行中")}</span></td></tr>
                <tr><td>${tt("2026 春季 2 班", "2026 春学期 2組")}</td><td>${tt("日语 0 起步基础课", "日本語ゼロスタート基礎コース")}</td><td>${tt("佐藤老师", "佐藤先生")}</td><td>12/15</td><td><span class="status">${tt("进行中", "進行中")}</span></td></tr>
                <tr><td>${tt("会话强化夜班", "会話強化ナイトクラス")}</td><td>${tt("日语生活会话强化班", "日本語生活会話強化クラス")}</td><td>${tt("山田老师", "山田先生")}</td><td>0/6</td><td><span class="status warn">${tt("待开班", "開講待ち")}</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <span class="tag">${tt("精品课程", "上級コース")}</span><span class="tag">${tt("小班课", "少人数クラス")}</span>
          <div class="card-title" style="margin-top:12px;">${tl(data.student.className)}</div>
          <div class="muted">${tl(data.student.course)} / ${tt("教师：", "教師：")}${tl(data.student.teacher)} / ${tt("人数上限：8", "定員：8")}</div>
          ${state.currentRole === "operator" ? `<div class="cta-row" style="margin-top:14px;"><div class="btn">${tt("编辑班级信息", "クラス情報を編集")}</div><div class="btn ghost">${tt("调整教师", "教師を調整")}</div><div class="btn ghost">${tt("学员分班", "受講生を振り分け")}</div></div>` : ""}
          <div class="card-title" style="margin-top:18px;">${tt("课次安排", "授業予定")}</div>
          <div class="list">${data.schedule.map(item => `<div class="list-item"><div class="list-title">${tl(item.title)}</div><div class="muted">${item.date} · ${tl(item.status)}</div></div>`).join("")}</div>
          <div class="cta-row">
            ${state.currentRole === "operator" ? `<div class="btn">${tt("调整排课", "時間割を調整")}</div><div class="btn ghost">${tt("处理请假/调课", "欠席・振替を処理")}</div>` : ""}
            <div class="btn ghost" data-action="admin-to-homework">${tt("查看本班作业", "このクラスの課題を見る")}</div>
          </div>
          <div class="card-title" style="margin-top:18px;">${tt("班级学员", "クラス受講生")}</div>
          <div class="list">
            ${data.classmates.map(item => `<div class="list-item"><div class="list-meta"><div class="list-title">${item.name}</div><span class="status ${tl(item.status) === tt("待跟进", "要フォロー") ? "warn" : ""}">${tl(item.status)}</span></div><div class="muted">${tl(item.progress)}</div></div>`).join("")}
          </div>
          ${state.currentRole === "operator" ? `<div class="demo-tip">${tt("这里的编辑动作属于教务/运营：维护班级结构、教师分配、学员分班和排课安排。", "この編集操作は教務・運営担当の役割です。クラス構造、教師配置、受講生振り分け、時間割を管理します。")}</div>` : ""}
        </div>
      </div>
    `,
    }),
  },
  "admin-student": {
    title: () => tt("后台学员管理", "バックオフィス 受講生管理"),
    subtitle: () => tt("学员列表、学员档案和服务跟进统一聚合", "受講生一覧、プロフィール、サービス対応を集約"),
    tip: "这页应该先让客户看到学员列表，再落到具体学员档案、会员状态和学习服务细节。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 咨询与学员 / 学员管理", "バックオフィス / 相談と受講生 / 受講生管理"),
      title: state.currentRole === "teacher" ? tt("我的学员", "担当受講生") : tt("学员管理", "受講生管理"),
      actions: [tt("学员总数 32", "受講生合計 32"), tt("在读 16", "受講中 16"), tt("续费预警 2", "更新注意 2")],
      permissions: {
        admin: tt("查看学员基础资料、会员状态、课程状态和总体经营相关信息，不下钻到具体教学执行细节。", "受講生の基本情報、会員状態、コース状態、全体経営関連情報を確認し、細かな教学実務には入りません。"),
        operator: tt("可查看学员档案、学习状态、续费状态和跟进记录，是日常服务主操作者。", "受講生プロフィール、学習状態、更新状態、対応履歴を確認でき、日常サービスの主担当です。"),
        teacher: tt("只查看学习进度、作业、每日任务和教师反馈，不展示订单退款和运营跟进信息。", "学習進捗、課題、日次タスク、教師フィードバックのみ確認し、注文・返金・運営対応は表示しません。"),
      },
      content: `
        <div class="grid cols-2">
          <div class="card">
            <div class="admin-panel-head">
              <div>
                <div class="card-title" style="margin-bottom:4px;">${state.currentRole === "teacher" ? tt("我的学员列表", "担当受講生一覧") : tt("学员列表", "受講生一覧")}</div>
                <div class="muted">${state.currentRole === "teacher" ? tt("教师只看自己负责班级下的学员。", "教師は自分の担当クラスの受講生のみ確認します。") : tt("购买课程或会员后，用户会自动进入学员/会员服务列表，后台负责后续维护和跟进。", "コースまたは会員購入後、ユーザーは自動で受講生／会員リストに入り、バックオフィスが継続対応を行います。")}</div>
              </div>
              <div class="admin-toolbar">
                <div class="tool-chip">${tt("筛选：在读", "絞り込み：受講中")}</div>
              </div>
            </div>
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("学员", "受講生")}</th><th>${tt("课程/班级", "コース／クラス")}</th><th>${tt("会员状态", "会員状態")}</th><th>${tt("当前状态", "現在の状態")}</th></tr></thead>
                <tbody>
                  <tr><td>${data.student.name}</td><td>${tl(data.student.course)} / ${tl(data.student.className)}</td><td>${tt("有效", "有効")}</td><td><span class="status">${tt("正常学习", "通常学習")}</span></td></tr>
                  <tr><td>高桥真由</td><td>日语 0 起步基础课 / 2026 春季 2 班</td><td>即将到期</td><td><span class="status warn">待跟进</span></td></tr>
                  <tr><td>李可欣</td><td>${tt("日语初级精品班", "日本語初級プレミアムクラス")} / ${tl(data.student.className)}</td><td>${tt("有效", "有効")}</td><td><span class="status">${tt("作业已点评", "課題フィードバック済み")}</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            ${renderStudentDetailByRole()}
          </div>
        </div>
      `,
    }),
  },
  "admin-homework": {
    title: () => tt("后台作业批改", "バックオフィス 課題添削"),
    subtitle: () => tt("作业资源统一管理，教师可直接点评", "課題リソースを一元管理し、教師が直接フィードバック"),
    tip: "这里强调作业不是一次性消息，而是会沉淀进学习档案的教学动作。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 作业与任务 / 作业批改", "バックオフィス / 課題とタスク / 課題添削"),
      title: tt("作业批改中心", "課題添削センター"),
      actions: [tt("待批改 4", "未添削 4"), tt("已点评 18", "フィードバック済み 18")],
      permissions: {
        teacher: tt("教师核心工作台，可查看提交、批改作业、给出反馈。", "教師の主要ワークスペース。提出物確認、添削、フィードバック入力が可能です。"),
        operator: tt("可查看整体完成情况并协助督学跟进。", "全体の完了状況を確認し、督学対応を補助できます。"),
      },
      content: `
      <div class="card">
        <div class="card-title">${tl(data.homework.title)}</div>
        <div class="muted">${tt("提交人：", "提出者：")}${data.student.name} / ${tt("截止时间：", "締切：")}${tl(data.homework.due)}</div>
      </div>
      <div class="grid cols-2">
        <div class="card">
          <div class="card-title">${tt("学员提交内容", "受講生の提出内容")}</div>
          <div class="muted">${tt("语音文件已上传，附带文字自我介绍。", "音声ファイル提出済み。自己紹介テキストも添付されています。")}</div>
        </div>
        <div class="card">
          <div class="card-title">${tt("教师反馈", "教師フィードバック")}</div>
          <div class="tag">${tt("评分", "評価")} ${data.homework.score}</div>
          <div class="muted">${tl(data.homework.feedback)}</div>
        </div>
      </div>
    `,
    }),
  },
  "admin-orders": {
    title: () => tt("后台订单列表", "バックオフィス 注文一覧"),
    subtitle: () => tt("会员、课程、活动订单统一管理", "会員・コース・イベント注文を一元管理"),
    tip: "在这里说明非会员可直接买课，买课后自动获得课程服务期内会员权益。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 订单与退款 / 订单列表", "バックオフィス / 注文と返金 / 注文一覧"),
      title: tt("订单中心", "注文センター"),
      actions: [tt("课程订单 1", "コース注文 1"), tt("活动订单 1", "イベント注文 1"), tt("会员订单 1", "会員注文 1")],
      permissions: {
        admin: tt("可查看并调整所有订单状态。", "すべての注文状態を確認し調整できます。"),
        operator: tt("可核对订单和支付状态，支持人工补单。", "注文と決済状態を照合し、手動補正に対応できます。"),
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("订单列表", "注文一覧")}</div>
              <div class="muted">${tt("支持会员、课程、活动三类商品统一管理。", "会員、コース、イベントの3種類の商品を一元管理します。")}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">${tt("支付方式：微信支付", "決済方法：WeChat Pay")}</div>
              <div class="tool-chip">${tt("状态：全部", "状態：すべて")}</div>
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("订单号", "注文番号")}</th><th>${tt("用户", "ユーザー")}</th><th>${tt("商品", "商品")}</th><th>${tt("类型", "種別")}</th><th>${tt("金额", "金額")}</th><th>${tt("状态", "状態")}</th></tr></thead>
                <tbody>
                  ${data.orders.map((item) => `
                    <tr>
                      <td>${item.no}</td>
                      <td>${item.user}</td>
                      <td>${tl(item.item)}</td>
                      <td>${tl(item.type)}</td>
                      <td>${item.amount}</td>
                      <td><span class="status ${tl(item.status) === tt("退款处理中", "返金処理中") ? "warn" : ""}">${tl(item.status)}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${tt("订单闭环说明", "注文クローズドループ説明")}</div>
            <div class="muted">${tt("用户可直接购买课程或会员，支付成功后自动获得对应课程服务或会员权益。", "ユーザーはコースまたは会員を直接購入でき、決済完了後に対応するサービスや会員特典が自動で有効になります。")}</div>
            <div class="cta-row">
              <div class="btn ghost" data-action="admin-to-refunds">${tt("查看退款流程", "返金フローを見る")}</div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">${tt("人工兜底能力", "手動補完能力")}</div>
            <div class="muted">${tt("后台支持补单、状态修正和人工核对，避免支付链路异常影响演示与运营。", "バックオフィスでは補正注文、状態修正、手動確認に対応し、決済異常が運用へ影響しないようにします。")}</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-activities": {
    title: () => tt("后台活动管理", "バックオフィス イベント管理"),
    subtitle: () => tt("活动作为品牌获客入口进行配置和报名承接", "ブランド集客入口としてイベントを設定・受付"),
    tip: "活动主要用于品牌传播和留存，不要讲成核心营收模块。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 活动 / 活动管理", "バックオフィス / イベント / イベント管理"),
      title: tt("活动管理", "イベント管理"),
      actions: [tt("公开活动 1", "公開イベント 1"), tt("会员活动 1", "会員イベント 1"), tt("支持取消报名", "申込取消に対応")],
      permissions: {
        admin: tt("可查看并管理活动整体配置与状态。", "イベント全体設定と状態を確認・管理できます。"),
        operator: tt("可创建活动、处理报名和取消报名。", "イベント作成、申込対応、取消対応を行えます。"),
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("活动列表", "イベント一覧")}</div>
              <div class="muted">${tt("活动可配置为公开/会员、免费/收费，一期以品牌获客入口为主。", "イベントは公開／会員限定、無料／有料を設定でき、第一段階ではブランド集客入口として扱います。")}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">${tt("报名中", "受付中")}</div>
              ${state.currentRole === "operator" ? `<div class="btn">${tt("新建活动", "イベント新規作成")}</div>` : `<div class="tool-chip">${tt("管理视图", "管理ビュー")}</div>`}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("活动名称", "イベント名")}</th><th>${tt("类型", "種別")}</th><th>${tt("时间", "日時")}</th><th>${tt("费用", "料金")}</th><th>${tt("状态", "状態")}</th></tr></thead>
                <tbody>
                  <tr>
                    <td>${tl(data.activity.title)}</td>
                    <td>${tl(data.activity.type)}</td>
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
            <div class="card-title">${tt("活动定位", "イベントの位置づけ")}</div>
            <div class="muted">${tt("对外用于品牌传播和线索转化，对内用于会员粘性和学习氛围建设。", "外向けにはブランド発信とリード獲得、内向けには会員維持と学習コミュニティ強化に使います。")}</div>
            <div class="cta-row">
              <div class="btn ghost" data-action="mini-to-activity">${tt("切到学员活动页", "受講生側イベントページへ")}</div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">${tt("状态规则", "状態ルール")}</div>
            <div class="muted">${tt("支持报名、取消报名，名额满后自动停止报名，一期不做候补名单。", "申込・取消に対応し、満員後は自動で受付停止。第一段階ではキャンセル待ちは実装しません。")}</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-refunds": {
    title: () => tt("后台退款处理", "バックオフィス 返金処理"),
    subtitle: () => tt("退款状态记录和人工审核流程", "返金状態の記録と手動審査フロー"),
    tip: "这里只要强调一期先以人工审核兜底，系统负责状态留痕就够了。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 订单与退款 / 退款处理", "バックオフィス / 注文と返金 / 返金処理"),
      title: tt("退款处理", "返金処理"),
      actions: [tt("退款申请 1", "返金申請 1"), tt("人工判定模式", "手動判定モード")],
      permissions: {
        admin: tt("可处理退款申请并确认权益回收。", "返金申請を処理し、特典回収を確認できます。"),
        operator: tt("可提交审核意见并做人工跟进。", "審査コメントを追加し、手動フォローできます。"),
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("退款申请列表", "返金申請一覧")}</div>
              <div class="muted">${tt("一期退款采用人工审核与人工判定，系统负责状态留痕。", "第一段階の返金は手動審査・手動判定とし、システムは状態履歴を保持します。")}</div>
            </div>
            <div class="tool-chip">${tt("自动退款计算：未开启", "自動返金計算：未設定")}</div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("退款单号", "返金番号")}</th><th>${tt("订单号", "注文番号")}</th><th>${tt("用户", "ユーザー")}</th><th>${tt("商品", "商品")}</th><th>${tt("原因", "理由")}</th><th>${tt("状态", "状態")}</th></tr></thead>
                <tbody>
                  ${data.refunds.map((item) => `
                    <tr>
                      <td>${item.no}</td>
                      <td>${item.orderNo}</td>
                      <td>${item.user}</td>
                      <td>${tl(item.item)}</td>
                      <td>${tl(item.reason)}</td>
                      <td><span class="status warn">${tl(item.status)}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${tt("审核动作", "審査アクション")}</div>
            <div class="muted">${tt("运营可查看申请原因、确认是否退费，并人工回收会员或课程权益。", "運営担当は申請理由を確認し、返金可否を判断し、会員またはコース特典を手動回収します。")}</div>
          </div>
          <div class="card">
            <div class="card-title">${tt("当前演示重点", "この画面のデモ重点")}</div>
            <div class="muted">${tt("展示系统不仅能卖课，也能处理售后和状态留痕，形成完整商业闭环。", "このシステムが販売だけでなく、アフター対応と状態履歴も扱えることを示します。")}</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-resources": {
    title: () => tt("后台资源", "バックオフィス リソース"),
    subtitle: () => tt("资源列表与资源详情按角色区分展示", "リソース一覧と詳細をロール別に表示"),
    render: () => adminPage({
      breadcrumb: tt("后台 / 资源 / 资源列表", "バックオフィス / リソース / リソース一覧"),
      title: state.currentRole === "admin" ? tt("资源列表与详情", "リソース一覧と詳細") : tt("作业资源库", "課題リソース庫"),
      actions: [tt("资源总数 12", "リソース総数 12"), tt("启用中 9", "有効 9"), tt("草稿 3", "下書き 3")],
      permissions: {
        admin: tt("只查看资源列表、资源详情和课程关联关系，不负责资源录入和分配。", "リソース一覧、詳細、コース連携のみ確認し、登録や配布は行いません。"),
        operator: tt("负责录入资源、维护资源状态，并将资源分配到课程、班级和课次。", "リソース登録、状態管理、コース・クラス・授業への割当を担当します。"),
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("资源列表", "リソース一覧")}</div>
              <div class="muted">${state.currentRole === "admin" ? tt("管理员查看资源沉淀情况和课程关联，不处理资源录入。", "管理者はリソース蓄積状況とコース連携を確認し、登録作業は行いません。") : tt("一期先支持后台手工录入，后续再扩展批量导入。", "第一段階では手動登録に対応し、後続で一括インポートを追加予定です。")}</div>
            </div>
            <div class="admin-toolbar">
              <div class="tool-chip">${tt("类型：全部", "種別：すべて")}</div>
              ${state.currentRole === "operator" ? `<div class="btn">${tt("新建资源", "リソース新規作成")}</div>` : `<div class="tool-chip">${tt("只读查看", "閲覧専用")}</div>`}
            </div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("资源名称", "リソース名")}</th><th>${tt("类型", "種別")}</th><th>${tt("所属课程", "所属コース")}</th><th>${tt("状态", "状態")}</th></tr></thead>
                <tbody>
                  ${data.resources.map((item) => `
                    <tr>
                      <td>${tl(item.title)}</td>
                      <td>${tl(item.type)}</td>
                      <td>${tl(item.course)}</td>
                      <td><span class="status ${tl(item.status) === tt("草稿", "下書き") ? "warn" : ""}">${tl(item.status)}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? tt("资源详情摘要", "リソース詳細サマリー") : tt("资源录入字段", "リソース登録項目")}</div>
            <div class="muted">${state.currentRole === "admin" ? tt("标题、类型、所属课程、启用状态和使用班级概览。", "タイトル、種別、所属コース、有効状態、利用クラス概要。") : tt("标题、类型、所属课程、说明、提交方式、启用状态。", "タイトル、種別、所属コース、説明、提出方式、有効状態。")}</div>
          </div>
          <div class="card">
            <div class="card-title">${state.currentRole === "admin" ? tt("管理员查看重点", "管理者の確認ポイント") : tt("与教学闭环的关系", "教学クローズドループとの関係")}</div>
            <div class="muted">${state.currentRole === "admin" ? tt("重点看资源沉淀规模、课程覆盖情况和资源状态，不介入具体批改流程。", "リソース蓄積量、コースへの適用状況、状態を確認し、個別添削フローには入りません。") : tt("资源创建后，可分配到班级、课次或学员，再进入提交与教师点评流程。", "リソース作成後、クラス・授業・受講生へ配布され、提出と教師フィードバックの流れに入ります。")}</div>
            ${state.currentRole === "operator" ? `<div class="cta-row"><div class="btn ghost" data-action="admin-to-homework">${tt("查看批改页", "添削ページを見る")}</div></div>` : ""}
          </div>
        </div>
      `,
    }),
  },
  "admin-system": {
    title: () => tt("后台系统管理", "バックオフィス システム管理"),
    subtitle: () => tt("账号、角色权限与基础能力配置", "アカウント、ロール権限、基盤設定"),
    tip: "这页是管理员存在感最强的页面，用来说明 admin 负责系统配置和权限规则，而不是做日常教学运营编辑。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 系统管理", "バックオフィス / システム管理"),
      title: tt("系统管理", "システム管理"),
      actions: [tt("账号 6", "アカウント 6"), tt("角色 3", "ロール 3"), tt("支付配置 已启用", "決済設定 有効")],
      permissions: {
        admin: tt("管理员负责账号、角色权限、基础配置以及支付和消息能力配置。", "管理者はアカウント、ロール権限、基盤設定、決済・通知設定を担当します。"),
      },
      content: `
        <div class="grid cols-2">
          <div class="card">
            <div class="card-title">${tt("角色与权限", "ロールと権限")}</div>
            <div class="list">
              <div class="list-item"><div class="list-title">${tt("管理员", "管理者")}</div><div class="muted">${tt("系统配置、角色权限、全局监管", "システム設定、ロール権限、全体監督")}</div></div>
              <div class="list-item"><div class="list-title">${tt("教务/运营", "教務・運営")}</div><div class="muted">${tt("课程、班级、活动、订单、跟进处理", "コース、クラス、イベント、注文、フォロー対応")}</div></div>
              <div class="list-item"><div class="list-title">${tt("教师", "教師")}</div><div class="muted">${tt("班级查看、作业批改、学习进度跟进", "クラス確認、課題添削、学習進捗フォロー")}</div></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">${tt("系统基础配置", "システム基盤設定")}</div>
            <div class="list">
              <div class="list-item"><div class="list-title">${tt("支付配置", "決済設定")}</div><div class="muted">${tt("微信支付回调与人工补单兜底", "WeChat Pay コールバックと手動補正対応")}</div></div>
              <div class="list-item"><div class="list-title">${tt("消息配置", "通知設定")}</div><div class="muted">${tt("课程提醒、每日任务提醒、反馈提醒", "授業通知、日次タスク通知、フィードバック通知")}</div></div>
              <div class="list-item"><div class="list-title">${tt("会员权益模板", "会員特典テンプレート")}</div><div class="muted">${tt("基础课程、活动资格、提醒服务开关", "基礎コース、イベント資格、通知サービスの切替")}</div></div>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${tt("管理员职责说明", "管理者の役割説明")}</div>
            <div class="muted">${tt("管理员可查看课程和资源详情，但课程编辑、资源录入、班级排课、作业分配等日常动作由教务/运营完成。", "管理者はコースやリソース詳細を確認できますが、コース編集、リソース登録、クラス時間割、課題配布など日常運用は教務・運営が担当します。")}</div>
          </div>
          <div class="card">
            <div class="card-title">${tt("演示重点", "デモの重点")}</div>
            <div class="muted">${tt("这页用来证明后台不只是教学工具，还有角色权限、支付和消息等系统级管理能力。", "この画面は、バックオフィスが教学ツールだけでなく、ロール権限、決済、通知などのシステム管理機能も備えていることを示します。")}</div>
          </div>
        </div>
      `,
    }),
  },
  "admin-followups": {
    title: () => tt("后台跟进任务", "バックオフィス フォロータスク"),
    subtitle: () => tt("未完成任务和逾期作业进入跟进池", "未完了タスクと期限超過課題をフォロー池へ集約"),
    tip: "这是整套系统差异化的关键页，要重点讲“持续督学”而不是单纯卖课。",
    render: () => adminPage({
      breadcrumb: tt("后台 / 督学与跟进 / 跟进任务", "バックオフィス / 督学とフォロー / フォロータスク"),
      title: tt("待跟进任务池", "フォロー対象タスク一覧"),
      actions: [tt("人工跟进模式", "手動フォローモード"), tt("自动提醒已开启", "自動通知有効")],
      permissions: {
        operator: tt("运营核心工作台，专门处理未完成任务、逾期作业和续费提醒。", "運営の主要ワークスペース。未完了タスク、期限超過課題、更新通知を処理します。"),
      },
      content: `
      <div class="admin-panel">
        <div class="admin-panel-head">
          <div>
            <div class="card-title" style="margin-bottom:4px;">${tt("待跟进列表", "フォロー対象一覧")}</div>
            <div class="muted">${tt("未完成任务和逾期作业自动进入此处。", "未完了タスクと期限超過課題は自動でここに集約されます。")}</div>
          </div>
          <div class="tool-chip">${tt("共", "合計")} ${followupItems().length} ${tt("条任务", "件のタスク")}</div>
        </div>
        <div class="admin-panel-body">
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>${tt("学员", "受講生")}</th><th>${tt("触发原因", "発生理由")}</th><th>${tt("负责人", "担当者")}</th><th>${tt("状态", "状態")}</th></tr></thead>
              <tbody>${followupItems().map(item => `<tr><td>${item.name}</td><td>${tl(item.reason)}</td><td>${tl(item.owner)}</td><td><span class="status warn">${tt("待处理", "未対応")}</span></td></tr>`).join("")}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="cta-row">
        <div class="btn ghost" data-action="admin-to-student">${tt("查看对应学员档案", "対象受講生プロフィールを見る")}</div>
      </div>
    `,
    }),
  },
  "teacher-progress": {
    title: () => tt("教师学习进度跟进", "教師 学習進捗フォロー"),
    subtitle: () => tt("教师从教学视角跟进学员进度，不处理运营事务", "教師は教学視点で進捗を確認し、運営業務は扱わない"),
    tip: "这里重点强调教师可以跟进学习进度，但不承担续费、退款、活动等运营工作。",
    render: () => adminPage({
      breadcrumb: tt("教师工作台 / 学员学习进度", "教師ワークスペース / 受講生学習進捗"),
      title: tt("学习进度跟进", "学習進捗フォロー"),
      actions: [tt("异常学员 2", "要注意受講生 2"), tt("待反馈 1", "未記入フィードバック 1")],
      permissions: {
        teacher: tt("可查看到课、作业、每日任务和学习异常，并填写教学反馈。", "出席、課題、日次タスク、学習異常を確認し、教学フィードバックを記入できます。"),
      },
      content: `
        <div class="admin-panel">
          <div class="admin-panel-head">
            <div>
              <div class="card-title" style="margin-bottom:4px;">${tt("重点关注学员", "重点フォロー受講生")}</div>
              <div class="muted">${tt("以下信息仅用于教学跟进，不包含订单、退款、会员配置等运营字段。", "以下の情報は教学フォロー専用で、注文、返金、会員設定などの運営項目は含みません。")}</div>
            </div>
            <div class="tool-chip">${tt("教学视角", "教学視点")}</div>
          </div>
          <div class="admin-panel-body">
            <div class="table-wrap">
              <table class="table">
                <thead><tr><th>${tt("学员", "受講生")}</th><th>${tt("到课情况", "出席状況")}</th><th>${tt("作业完成", "課題状況")}</th><th>${tt("每日任务", "日次タスク")}</th><th>${tt("教师动作", "教師対応")}</th></tr></thead>
                <tbody>
                  <tr><td>小林美咲</td><td>${tt("正常", "正常")}</td><td>${tt("已提交并点评", "提出・添削済み")}</td><td>${tt("已完成", "完了")}</td><td><span class="status">${tt("继续跟进", "継続フォロー")}</span></td></tr>
                  <tr><td>高桥真由</td><td>${tt("正常", "正常")}</td><td>${tt("正常", "正常")}</td><td>${tt("昨日未完成", "昨日未完了")}</td><td><span class="status warn">${tt("需教学提醒", "教師リマインド必要")}</span></td></tr>
                  <tr><td>李可欣</td><td>${tt("请假一次", "欠席1回")}</td><td>${tt("已提交", "提出済み")}</td><td>${tt("正常", "正常")}</td><td><span class="status">${tt("关注出勤", "出席確認")}</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="split" style="margin-top:16px;">
          <div class="card">
            <div class="card-title">${tt("教师可做的跟进", "教師が行うフォロー")}</div>
            <div class="list">
              <div class="list-item"><div class="list-title">${tt("查看学习异常", "学習異常の確認")}</div><div class="muted">${tt("例如未完成每日任务、作业延迟、出勤异常。", "日次タスク未完了、課題遅延、出席異常などを確認します。")}</div></div>
              <div class="list-item"><div class="list-title">${tt("填写教学反馈", "教学フィードバック記入")}</div><div class="muted">${tt("记录课堂表现和学习建议。", "授業内の様子と学習提案を記録します。")}</div></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">${tt("教师不处理的内容", "教師が扱わない内容")}</div>
            <div class="muted">${tt("续费推进、退款处理、活动配置、会员权益调整均由教务/运营处理。", "更新促進、返金処理、イベント設定、会員特典調整はすべて教務・運営が担当します。")}</div>
          </div>
        </div>
      `,
    }),
  },
  "mini-home": {
    title: () => tt("小程序首页", "ミニアプリホーム"),
    subtitle: () => tt("学员最重要的信息收口页", "受講生向けの主要情報集約ページ"),
    tip: "从这里开始切到学员视角，强调用户一登录就能看到课程、课表、任务和活动。",
    render: () => phone(`
      <div class="section-title">${tt("你好，", "こんにちは、")}${data.student.name}</div>
      <div class="card">
        <div class="list-title">${tl(data.student.course)}</div>
        <div class="muted">${tl(data.student.membership)}</div>
        <div class="badge-row"><span class="tag">${tt("课程服务中", "コース提供中")}</span><span class="tag">${tt("会员权益中", "会員特典有効")}</span></div>
      </div>
      <div class="card">
        <div class="section-title">${tt("最近课表", "最近の時間割")}</div>
        ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${tl(item.title)}</div><div class="muted">${item.date}</div></div>`).join("")}
      </div>
      <div class="card">
        <div class="section-title">${tt("今日任务", "本日のタスク")}</div>
        <div class="muted">${tt("5 个词汇 + ", "単語5個 + ")}${data.dailyTask.grammarCount}${tt(" 个语法题", " 文法問題")}</div>
        <div class="btn" style="margin-top:12px;" data-action="go-task">${tt("去完成", "タスクへ")}</div>
        ${state.dailyTaskCompleted ? `<div class="notice">${tt("今日任务已完成，连续打卡 ", "本日のタスク完了。連続達成 ")}${data.dailyTask.streak + 1}${tt(" 天。", " 日。")}</div>` : ""}
      </div>
      <div class="card">
        <div class="section-title">${tt("推荐活动", "おすすめイベント")}</div>
        <div class="list-title">${tl(data.activity.title)}</div>
        <div class="muted">${data.activity.time} · ${data.activity.fee}</div>
        <div class="btn ghost" style="margin-top:12px;" data-action="go-activity">${tt("查看活动", "イベントを見る")}</div>
      </div>
      ${phoneNav()}
    `),
  },
  "mini-course": {
    title: () => tt("小程序课程详情", "ミニアプリ コース詳細"),
    subtitle: () => tt("课程转化与价值展示", "コース転換と価値訴求"),
    tip: "这一页接转化闭环，重点讲购买课程后自动获得会员权益。",
    render: () => phone(`
      <div class="section-title">${tl(data.student.course)}</div>
      <span class="tag">${tt("购买课程自动获得会员权益", "コース購入で会員特典が自動付与")}</span>
      <div class="card">
        <div class="muted">${tt("周期：6 个月 / 形式：小班课 / 服务：课表、作业、每日任务、老师反馈、学习档案", "期間：6か月 / 形式：少人数クラス / 提供内容：時間割、課題、日次タスク、教師フィードバック、学習記録")}</div>
      </div>
      <div class="btn secondary" data-action="purchase-course">${tt("立即购买", "今すぐ購入")}</div>
      ${phoneNav()}
    `),
  },
  "mini-payment": {
    title: () => tt("小程序支付成功", "ミニアプリ 決済完了"),
    subtitle: () => tt("购买后直接进入课程服务与会员权益", "購入後すぐにコースサービスと会員特典へ"),
    tip: "这一页用来把“支付成功 -> 课程服务生效 -> 会员权益生效”讲清楚。",
    render: () => phone(`
      <div class="card highlight">
        <div class="section-title">${tt("支付成功", "決済完了")}</div>
        <div class="muted">${tt("你已成功购买 ", "")}${tl(data.student.course)}${tt("", " を購入しました")}</div>
      </div>
      <div class="card">
        <div class="section-title">${tt("立即生效", "即時反映")}</div>
        <div class="list">
          <div class="list-item"><div class="list-title">${tt("课程服务已开通", "コースサービス開通済み")}</div><div class="muted">${tl(data.student.className)}${tt(" 已加入", " に参加済み")}</div></div>
          <div class="list-item"><div class="list-title">${tt("会员权益已激活", "会員特典が有効化")}</div><div class="muted">${tt("课程服务期内可享受会员权益", "コース提供期間中は会員特典を利用可能")}</div></div>
        </div>
      </div>
      <div class="btn">${tt("查看我的课表", "自分の時間割を見る")}</div>
      <div class="btn ghost" style="margin-top:10px;" data-action="go-schedule">${tt("进入课程学习", "学習フローへ進む")}</div>
      ${phoneNav()}
    `),
  },
  "mini-schedule": {
    title: () => tt("小程序课表", "ミニアプリ 時間割"),
    subtitle: () => tt("购课后进入班级并查看课次安排", "購入後にクラス参加・授業予定確認"),
    tip: "这里强调这不是内容页，而是真实排课和班级管理的学员视图。",
    render: () => phone(`
      <div class="section-title">${tt("我的课表", "自分の時間割")}</div>
      ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${tl(item.title)}</div><div class="muted">${item.date} · ${tl(item.status)}</div></div>`).join("")}
      <div class="btn" style="margin-top:12px;">${tt("提交请假申请", "欠席申請を出す")}</div>
      <div class="btn ghost" style="margin-top:10px;" data-action="go-homework">${tt("查看课后作业", "授業後の課題を見る")}</div>
      ${phoneNav()}
    `),
  },
  "mini-homework": {
    title: () => tt("小程序作业", "ミニアプリ 課題"),
    subtitle: () => tt("作业提交与教师反馈", "課題提出と教師フィードバック"),
    tip: "这里讲学员提交后能收到老师反馈，反馈会回流进学习档案。",
    render: () => phone(`
      <div class="section-title">${tl(data.homework.title)}</div>
      <div class="card">
        <div class="muted">${tt("截止时间：", "締切：")}${tl(data.homework.due)}</div>
      </div>
      <div class="btn" data-action="submit-homework">${state.homeworkSubmitted ? tt("已提交作业", "課題提出済み") : tt("提交语音作业", "音声課題を提出")}</div>
      ${state.homeworkSubmitted ? `<div class="notice">${tt("作业已提交，教师反馈已同步进入学习档案。", "課題提出済み。教師フィードバックは学習記録へ同期済み。")}</div>` : ""}
      <div class="card" style="margin-top:14px;">
        <div class="section-title">${tt("教师反馈", "教師フィードバック")}</div>
        <div class="tag">${tt("评分", "評価")} ${data.homework.score}</div>
        <div class="muted">${tl(data.homework.feedback)}</div>
      </div>
      ${phoneNav()}
    `),
  },
  "mini-task": {
    title: () => tt("小程序每日任务", "ミニアプリ 日次タスク"),
    subtitle: () => tt("每日任务完成即视为打卡成功", "日次タスク完了で打刻成功扱い"),
    tip: "这里重点讲打卡不是签到，而是每天有具体学习任务，完成后会影响后台跟进状态。",
    render: () => phone(`
      <div class="section-title">${tt("今日词汇任务", "本日の単語タスク")}</div>
      <div class="list">
        ${data.dailyTask.vocab.map(word => `<div class="list-item"><div class="list-title">${word}</div><div class="muted">${tt("已加入今日学习任务", "本日の学習タスクに追加済み")}</div></div>`).join("")}
      </div>
      <div class="card" style="margin-top:14px;">
        <div class="muted">${tt("语法题任务：", "文法問題：")}${data.dailyTask.grammarCount}${tt(" 题", " 問")}</div>
        <div class="muted">${tt("连续完成：", "連続達成：")}${state.dailyTaskCompleted ? data.dailyTask.streak + 1 : data.dailyTask.streak}${tt(" 天", " 日")}</div>
      </div>
      <div class="btn" style="margin-top:14px;" data-action="complete-task">${state.dailyTaskCompleted ? tt("今日任务已完成", "本日のタスク完了") : tt("完成今日任务", "本日のタスクを完了")}</div>
      ${state.dailyTaskCompleted ? `<div class="notice">${tt("打卡成功，系统已从后台移除你的提醒任务。", "打刻成功。システム側でフォロー通知が更新されました。")}</div>` : ""}
      ${phoneNav()}
    `),
  },
  "mini-activity": {
    title: () => tt("小程序活动详情", "ミニアプリ イベント詳細"),
    subtitle: () => tt("活动作为品牌获客与学员留存的延伸入口", "ブランド集客と継続利用の入口としてのイベント"),
    tip: "这页用来说明活动既能获客，也能增强会员粘性，但一期不把它做得太重。",
    render: () => phone(`
      <div class="section-title">${tl(data.activity.title)}</div>
      <div class="card">
        <div class="muted">${tl(data.activity.desc)}</div>
        <div class="badge-row">
          <span class="tag">${tl(data.activity.type)}</span>
          <span class="tag">${data.activity.fee}</span>
        </div>
      </div>
      <div class="card" style="margin-top:14px;">
        <div class="muted">${tt("时间：", "日時：")}${data.activity.time}</div>
        <div class="muted">${tt("地点：", "場所：")}${tl(data.activity.location)}</div>
        <div class="muted">${tt("当前状态：", "現在の状態：")}${tl(data.activity.status)}</div>
      </div>
      <div class="cta-row">
        <div class="btn">${tt("立即报名", "今すぐ申し込む")}</div>
        <div class="btn ghost">${tt("取消报名", "申込を取消")}</div>
      </div>
      ${phoneNav()}
    `),
  },
  "mini-profile": {
    title: () => tt("小程序学习档案", "ミニアプリ 学習記録"),
    subtitle: () => tt("学习数据、反馈和服务沉淀", "学習データ、フィードバック、サービス履歴の蓄積"),
    tip: "最后用这页收尾，强调到课、作业、每日任务和教师反馈最终都会沉淀成长期服务资产。",
    render: () => phone(`
      <div class="section-title">${tt("学习档案", "学習記録")}</div>
      <div class="card">
        <div class="muted">${tt("会员状态：", "会員状態：")}${tl(data.student.membership)}</div>
        <div class="muted">${tt("到课率：", "出席率：")}${data.metrics.attendanceRate}</div>
        <div class="muted">${tt("作业完成率：", "課題完了率：")}${data.metrics.homeworkRate}</div>
        <div class="muted">${tt("每日任务完成率：", "日次タスク完了率：")}${data.metrics.dailyTaskRate}</div>
      </div>
      <div class="card" style="margin-top:14px;">
        <div class="section-title">${tt("最新反馈", "最新フィードバック")}</div>
        <div class="muted">${tl(data.homework.feedback)}</div>
      </div>
      <div class="demo-tip">${tt("这里强调到课、作业、每日任务、反馈会统一沉淀为学习档案。", "この画面では、出席・課題・日次タスク・フィードバックが一つの学習記録へ蓄積されることを示します。")}</div>
      ${phoneNav()}
    `),
  },
  "mini-messages": {
    title: () => tt("小程序消息提醒", "ミニアプリ 通知"),
    subtitle: () => tt("上课、任务、反馈等提醒统一收口", "授業・タスク・フィードバック通知を一元表示"),
    tip: "这页用来说明提醒服务有真实承接，不是口头描述。",
    render: () => phone(`
      <div class="section-title">${tt("消息提醒", "通知")}</div>
      <div class="list">
        ${data.notifications.map((item) => `
          <div class="list-item">
          <div class="list-title">${tl(item.title)}</div>
          <div class="muted">${tl(item.type)}</div>
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
          <div class="muted">${tl(data.student.membership)}</div>
          <div class="muted">${tt("当前课程：", "現在のコース：")}${tl(data.student.course)}</div>
          <div class="muted">${tt("所属班级：", "所属クラス：")}${tl(data.student.className)}</div>
          <div class="badge-row">
            <span class="tag">${tt("课程服务中", "コース提供中")}</span>
            <span class="tag">${tt("会员权益有效", "会員特典有効")}</span>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${tt("管理视角摘要", "管理視点サマリー")}</div>
          <div class="muted">${tt("最近订单：", "最近の注文：")}${data.orders.length}${tt(" 笔", " 件")}</div>
          <div class="muted">${tt("退款记录：", "返金記録：")}${data.refunds.length}${tt(" 笔", " 件")}</div>
          <div class="muted">${tt("续费状态：", "更新状態：")}${tl(data.student.renewal)}</div>
          <div class="muted">${tt("当前目标：", "現在の目標：")}${tl(data.student.goal)}</div>
        </div>
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">${tt("订单概览", "注文概要")}</div>
          <div class="table-wrap">
            <table class="table">
              <thead><tr><th>${tt("商品", "商品")}</th><th>${tt("金额", "金額")}</th><th>${tt("状态", "状態")}</th></tr></thead>
              <tbody>${data.orders.map(item => `<tr><td>${tl(item.item)}</td><td>${item.amount}</td><td>${tl(item.status)}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-title">${tt("管理说明", "管理向け説明")}</div>
          <div class="muted">${tt("管理员查看的是学员与课程、会员、订单之间的整体关系，不深入到作业完成率和每日任务执行层明细。", "管理者は受講生・コース・会員・注文の全体関係を確認し、課題完了率や日次タスクの実行詳細までは入りません。")}</div>
        </div>
      </div>
    `;
  }

  if (state.currentRole === "teacher") {
    return `
      <div class="grid cols-2">
        <div class="card">
          <div class="card-title">${data.student.name}</div>
          <div class="muted">${tt("当前课程：", "現在のコース：")}${tl(data.student.course)}</div>
          <div class="muted">${tt("所属班级：", "所属クラス：")}${tl(data.student.className)}</div>
          <div class="muted">${tt("学习目标：", "学習目標：")}${tl(data.student.goal)}</div>
        </div>
        <div class="card">
          <div class="card-title">${tt("学习进度", "学習進捗")}</div>
          <div class="muted">${tt("到课率：", "出席率：")}${data.metrics.attendanceRate}</div>
          <div class="muted">${tt("作业完成率：", "課題完了率：")}${data.metrics.homeworkRate}</div>
          <div class="muted">${tt("每日任务完成率：", "日次タスク完了率：")}${data.metrics.dailyTaskRate}</div>
        </div>
      </div>
      <div class="split" style="margin-top:18px;">
        <div class="card">
          <div class="card-title">${tt("教师反馈", "教師フィードバック")}</div>
          <div class="tag">${tt("评分", "評価")} ${data.homework.score}</div>
          <div class="muted">${tl(data.homework.feedback)}</div>
        </div>
        <div class="card">
          <div class="card-title">${tt("教师可操作内容", "教師が操作できる内容")}</div>
          <div class="muted">${tt("可查看学习异常、点评作业、填写阶段反馈；不查看订单退款与运营跟进内容。", "学習異常確認、課題添削、段階フィードバック記入は可能ですが、注文・返金・運営フォローは表示しません。")}</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="grid cols-2">
      <div class="card">
        <div class="card-title">${data.student.name}</div>
        <div class="muted">${tl(data.student.membership)}</div>
        <div class="muted">${tt("当前课程：", "現在のコース：")}${tl(data.student.course)}</div>
        <div class="muted">${tt("所属班级：", "所属クラス：")}${tl(data.student.className)}</div>
        <div class="badge-row">
          <span class="tag">${tt("课程服务中", "コース提供中")}</span>
          <span class="tag">${tt("会员权益有效", "会員特典有効")}</span>
        </div>
      </div>
      <div class="card">
        <div class="card-title">${tt("学习状态", "学習状態")}</div>
        <div class="muted">${tt("到课率：", "出席率：")}${data.metrics.attendanceRate}</div>
        <div class="muted">${tt("作业完成率：", "課題完了率：")}${data.metrics.homeworkRate}</div>
        <div class="muted">${tt("每日任务完成率：", "日次タスク完了率：")}${data.metrics.dailyTaskRate}</div>
        <div class="muted">${tt("学习目标：", "学習目標：")}${tl(data.student.goal)}</div>
      </div>
    </div>
    <div class="split" style="margin-top:18px;">
      <div class="card">
        <div class="card-title">${tt("服务与续费", "サービスと更新")}</div>
        <div class="muted">${tl(data.student.renewal)}</div>
        <div class="muted" style="margin-top:10px;">${tt("系统将在课程后半程自动进入续费提醒和运营跟进。", "システムはコース後半で自動的に更新通知と運営フォローへ移行します。")}</div>
        <div class="cta-row">
          <div class="btn">${tt("记录服务备注", "サービスメモ記録")}</div>
          <div class="btn ghost">${tt("编辑学员信息", "受講生情報を編集")}</div>
          <div class="btn ghost">${tt("调整会员权益", "会員特典を調整")}</div>
          <div class="btn ghost">${tt("更新续费备注", "更新メモを更新")}</div>
          <div class="btn ghost" data-action="admin-to-followups">${tt("查看跟进", "フォローを見る")}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">${tt("运营视角说明", "運営視点の説明")}</div>
        <div class="muted">${tt("教务/运营同时关注学员学习状态、服务状态和续费跟进，是学员服务的主操作者。", "教務・運営は学習状態、サービス状態、更新フォローを同時に見ており、受講生対応の主担当です。")}</div>
        <div class="demo-tip">${tt("这页要体现 operator 的编辑能力：改学员档案、补充会员权益、记录续费与服务备注。", "この画面では operator の編集権限、つまり受講生情報修正、特典追加、更新・サービスメモ記録を示します。")}</div>
      </div>
    </div>
  `;
}

function renderAdminWorkspace() {
  const tabs = adminWorkspaceTabs.filter((item) => item.roles.includes(state.currentRole));
  const current = tabs.find((item) => item.key === state.currentAdminPage) ? state.currentAdminPage : tabs[0].key;
  state.currentAdminPage = current;
  const groupedTabs = tabs.reduce((acc, item) => {
    const section = typeof item.section === "function" ? item.section() : item.section || tt("工作区", "ワークスペース");
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});
  return `
    <div class="experience-shell">
      <div class="experience-menu">
        <div class="experience-menu-title">${tt("后台工作区", "管理画面ワークスペース")}</div>
        ${Object.entries(groupedTabs).map(([section, items]) => `
          <div class="experience-section">
            <div class="experience-section-title">${section}</div>
            <div class="experience-menu-group">
              ${items.map((item) => `<button class="experience-tab ${item.key === current ? "active" : ""}" data-admin-tab="${item.key}">${typeof item.label === "function" ? item.label() : item.label}</button>`).join("")}
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
        ${miniWorkspaceTabs.map((item) => `<div class="mini-bottom-btn ${item.key === current ? "active" : ""}" data-mini-tab="${item.key}">${typeof item.label === "function" ? item.label() : item.label}</div>`).join("")}
      </div>
    </div>
  `;
}

function miniInnerContent(current) {
  if (current === "mini-home") {
    return `
      <div class="card">
        <div class="section-title">${tt("你好，", "こんにちは、")}${data.student.name}</div>
        <div class="muted">${tl(data.student.course)}</div>
        <div class="badge-row"><span class="tag">${tt("课程服务中", "コース提供中")}</span><span class="tag">${tt("会员权益中", "会員特典有効")}</span></div>
      </div>
      <div class="card">
        <div class="section-title">${tt("最近课表", "最近の時間割")}</div>
        ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${tl(item.title)}</div><div class="muted">${item.date}</div></div>`).join("")}
        <div class="cta-row"><div class="btn" data-action="mini-to-schedule">${tt("查看课表", "時間割を見る")}</div><div class="btn ghost" data-action="go-activity">${tt("活动入口", "イベント入口")}</div></div>
      </div>
      <div class="card">
        <div class="section-title">${tt("今日任务", "本日のタスク")}</div>
        <div class="muted">${tt("5 个词汇 + ", "単語5個 + ")}${data.dailyTask.grammarCount}${tt(" 个语法题", " 文法問題")}</div>
        <div class="btn" style="margin-top:12px;" data-action="go-task">${tt("去完成", "タスクへ")}</div>
        ${state.dailyTaskCompleted ? `<div class="notice">${tt("今日任务已完成，连续打卡 ", "本日のタスク完了。連続達成 ")}${data.dailyTask.streak + 1}${tt(" 天。", " 日。")}</div>` : ""}
      </div>
    `;
  }
  if (current === "mini-course") {
    return `
      <div class="card">
        <div class="section-title">${tl(data.student.course)}</div>
        <span class="tag">${tt("购买课程自动获得会员权益", "コース購入で会員特典が自動付与")}</span>
        <div class="muted" style="margin-top:8px;">${tt("周期：6 个月 / 形式：小班课 / 服务：课表、作业、每日任务、老师反馈、学习档案", "期間：6か月 / 形式：少人数クラス / 提供内容：時間割、課題、日次タスク、教師フィードバック、学習記録")}</div>
        <div class="cta-row">
          <div class="btn secondary" data-action="purchase-course">${tt("立即购买", "今すぐ購入")}</div>
          <div class="btn ghost" data-action="mini-to-payment">${tt("查看支付结果", "決済結果を見る")}</div>
        </div>
      </div>
      ${state.purchased ? `
      <div class="card highlight">
        <div class="section-title">${tt("购课后自动生效", "購入後すぐに有効化")}</div>
        <div class="muted">${tt("课程服务期内会员权益已激活，可直接进入课表和学习流程。", "コース提供期間中の会員特典が有効化され、すぐに時間割と学習フローへ進めます。")}</div>
      </div>` : ""}
    `;
  }
  if (current === "mini-task") {
    return `
      <div class="card">
        <div class="section-title">${tt("今日词汇任务", "本日の単語タスク")}</div>
        ${data.dailyTask.vocab.map(word => `<div class="list-item"><div class="list-title">${word}</div><div class="muted">${tt("今日学习词汇", "本日の学習単語")}</div></div>`).join("")}
      </div>
      <div class="card">
        <div class="muted">${tt("语法题任务：", "文法問題：")}${data.dailyTask.grammarCount}${tt(" 题", " 問")}</div>
        <div class="muted">${tt("连续完成：", "連続達成：")}${state.dailyTaskCompleted ? data.dailyTask.streak + 1 : data.dailyTask.streak}${tt(" 天", " 日")}</div>
        <div class="cta-row">
          <div class="btn" data-action="complete-task">${state.dailyTaskCompleted ? tt("今日任务已完成", "本日のタスク完了") : tt("完成今日任务", "本日のタスクを完了")}</div>
          <div class="btn ghost" data-action="mini-to-homework">${tt("查看作业", "課題を見る")}</div>
        </div>
        ${state.dailyTaskCompleted ? `<div class="notice">${tt("打卡成功，后台跟进任务已自动更新。", "打刻成功。バックオフィス側のフォロータスクも自動更新されました。")}</div>` : ""}
      </div>
    `;
  }
  if (current === "mini-profile") {
    return `
      <div class="card">
        <div class="section-title">${tt("学习档案", "学習記録")}</div>
        <div class="muted">${tt("会员状态：", "会員状態：")}${tl(data.student.membership)}</div>
        <div class="muted">${tt("到课率：", "出席率：")}${data.metrics.attendanceRate}</div>
        <div class="muted">${tt("作业完成率：", "課題完了率：")}${data.metrics.homeworkRate}</div>
        <div class="muted">${tt("每日任务完成率：", "日次タスク完了率：")}${data.metrics.dailyTaskRate}</div>
      </div>
      <div class="card">
        <div class="section-title">${tt("最新反馈", "最新フィードバック")}</div>
        <div class="tag">${tt("评分", "評価")} ${data.homework.score}</div>
        <div class="muted">${tl(data.homework.feedback)}</div>
        <div class="cta-row">
          <div class="btn ghost" data-action="mini-to-homework">${tt("查看作业", "課題を見る")}</div>
          <div class="btn ghost" data-action="go-activity">${tt("查看活动", "イベントを見る")}</div>
        </div>
      </div>
    `;
  }
  if (current === "mini-messages") {
    return `
      <div class="card">
        <div class="section-title">${tt("消息提醒", "通知")}</div>
        <div class="list">
          ${data.notifications.map((item) => `
            <div class="list-item">
              <div class="list-title">${tl(item.title)}</div>
              <div class="muted">${tl(item.type)}</div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="card">
        <div class="section-title">${tt("提醒价值", "通知の価値")}</div>
        <div class="muted">${tt("上课、每日任务、作业反馈和会员状态都能通过统一消息入口承接。", "授業、日次タスク、課題フィードバック、会員状態の通知を一つの入口で受け取れます。")}</div>
      </div>
    `;
  }
  if (current === "mini-schedule") {
    return `
      <div class="card">
        <div class="section-title">${tt("我的课表", "自分の時間割")}</div>
        ${data.schedule.map(item => `<div class="list-item"><div class="list-title">${tl(item.title)}</div><div class="muted">${item.date} · ${tl(item.status)}</div></div>`).join("")}
        <div class="cta-row"><div class="btn">${tt("提交请假申请", "欠席申請を出す")}</div><div class="btn ghost" data-action="mini-to-homework">${tt("查看课后作业", "授業後の課題を見る")}</div></div>
      </div>
    `;
  }
  if (current === "mini-homework") {
    return `
      <div class="card">
        <div class="section-title">${tl(data.homework.title)}</div>
        <div class="muted">${tt("截止时间：", "締切：")}${tl(data.homework.due)}</div>
        <div class="cta-row"><div class="btn" data-action="submit-homework">${state.homeworkSubmitted ? tt("已提交作业", "課題提出済み") : tt("提交语音作业", "音声課題を提出")}</div><div class="btn ghost" data-action="mini-to-profile">${tt("同步到学习档案", "学習記録へ同期")}</div></div>
        ${state.homeworkSubmitted ? `<div class="notice">${tt("作业已提交，教师反馈已同步进入学习档案。", "課題提出済み。教師フィードバックは学習記録へ同期済みです。")}</div>` : ""}
      </div>
      <div class="card">
        <div class="section-title">${tt("教师反馈", "教師フィードバック")}</div>
        <div class="tag">${tt("评分", "評価")} ${data.homework.score}</div>
        <div class="muted">${tl(data.homework.feedback)}</div>
      </div>
    `;
  }
  if (current === "mini-payment") {
    return `
      <div class="card highlight">
        <div class="section-title">${tt("支付成功", "決済完了")}</div>
        <div class="muted">${tt("你已成功购买 ", "")}${tl(data.student.course)}${tt("", " を購入しました")}</div>
      </div>
      <div class="card">
        <div class="list">
          <div class="list-item"><div class="list-title">${tt("课程服务已开通", "コースサービス開通済み")}</div><div class="muted">${tl(data.student.className)}${tt(" 已加入", " に参加済み")}</div></div>
          <div class="list-item"><div class="list-title">${tt("会员权益已激活", "会員特典が有効化")}</div><div class="muted">${tt("课程服务期内可享受会员权益", "コース提供期間中は会員特典を利用可能")}</div></div>
        </div>
        <div class="cta-row"><div class="btn" data-action="mini-to-schedule">${tt("查看我的课表", "自分の時間割を見る")}</div></div>
      </div>
    `;
  }
  if (current === "mini-activity") {
    return `
      <div class="card">
        <div class="section-title">${tl(data.activity.title)}</div>
        <div class="muted">${tl(data.activity.desc)}</div>
        <div class="badge-row"><span class="tag">${tl(data.activity.type)}</span><span class="tag">${data.activity.fee}</span></div>
      </div>
      <div class="card">
        <div class="muted">${tt("时间：", "日時：")}${data.activity.time}</div>
        <div class="muted">${tt("地点：", "場所：")}${tl(data.activity.location)}</div>
        <div class="muted">${tt("状态：", "状態：")}${tl(data.activity.status)}</div>
        <div class="cta-row"><div class="btn">${tt("立即报名", "今すぐ申し込む")}</div><div class="btn ghost">${tt("取消报名", "申込を取消")}</div></div>
      </div>
    `;
  }
  return `<div class="card"><div class="muted">${tt("页面准备中", "画面準備中")}</div></div>`;
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
          <div class="permission-role">${tt("当前后台角色：", "現在のロール：")}${typeof meta.label === "function" ? meta.label() : meta.label}</div>
          <div class="permission-list">${permissions[currentRole] || (typeof meta.summary === "function" ? meta.summary() : meta.summary)}</div>
        </div>
        <div class="tool-chip">${tt("权限演示模式", "権限デモモード")}</div>
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
      <span data-action="mini-nav-home">${tt("首页", "ホーム")}</span>
      <span data-action="mini-nav-course">${tt("课程", "コース")}</span>
      <span data-action="mini-nav-task">${tt("任务", "タスク")}</span>
      <span data-action="mini-nav-messages">${tt("消息", "通知")}</span>
      <span data-action="mini-nav-profile">${tt("我的", "マイページ")}</span>
    </div>
  `;
}

function followupItems() {
  if (state.dailyTaskCompleted) {
    return data.followups.filter((item) => item.name !== data.student.name);
  }
  return [{ name: data.student.name, reason: tt("今日每日任务待完成", "本日の日次タスク未完了"), owner: tt("运营-A", "運営-A") }, ...data.followups];
}

const root = document.getElementById("view-root");
const shellEl = document.getElementById("app-shell");
const titleEl = document.getElementById("page-title");
const subtitleEl = document.getElementById("page-subtitle");
const pageTipEl = document.getElementById("page-demo-tip");
const sidebarToggle = document.getElementById("sidebar-toggle");
const topbarSidebarToggle = document.getElementById("topbar-sidebar-toggle");
const buttons = Array.from(document.querySelectorAll(".nav-btn"));
const roleButtons = Array.from(document.querySelectorAll(".role-btn"));
const langButtons = Array.from(document.querySelectorAll(".lang-btn"));

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
  state.currentView = viewKey;
  shellEl.classList.toggle("sidebar-collapsed", !!state.sidebarCollapsed);
  applyStaticLocale();
  titleEl.textContent = typeof view.title === "function" ? view.title() : view.title;
  subtitleEl.textContent = typeof view.subtitle === "function" ? view.subtitle() : view.subtitle;
  if (pageTipEl && view.tip) {
    pageTipEl.style.display = "block";
    pageTipEl.textContent = `演示提示：${view.tip}`;
  } else if (pageTipEl) {
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

[sidebarToggle, topbarSidebarToggle].forEach((btn) => {
  if (!btn) return;
  btn.addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    renderView(state.currentView || "scenario");
  });
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
    renderView("admin-app");
  });
});

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.locale = btn.dataset.locale;
    renderView(state.currentView || "scenario");
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
      } else if (action === "toggle-enterprise-focus") {
        state.launchGuideEnterpriseFocus = !state.launchGuideEnterpriseFocus;
        renderView("launch-guide");
      }
    });
  });
}

applyRoleFilter();
applyStaticLocale();
renderView("scenario");
