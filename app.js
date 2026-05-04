// Data Structures
// 書類セットの定義 (PDFの内容に準拠)
const documentSets = {
    A: {
        name: "普通車購入",
        type: "buy",
        customer: ["印鑑登録証明書（3ヶ月以内）", "委任状（実印捺印）"]
    },
    B: {
        name: "軽自動車購入",
        type: "buy",
        customer: ["住民票（マイナンバー記載なし・3ヶ月以内）", "申請依頼書"]
    },
    A_shako_inkan: {
        name: "車庫証明委任状セット",
        type: "buy",
        customer: ["車庫証明委任状"]
    },
    Shako_Jinin: {
        name: "保管場所使用権原疎明書面（自認書）",
        type: "buy",
        customer: ["保管場所使用権原疎明書面（自認書）"]
    },
    Shako_Shodaku: {
        name: "保管場所使用承諾証明書",
        type: "buy",
        customer: ["保管場所使用承諾証明書"]
    },
    Shako_Map: {
        name: "保管場所の所在図・配置図",
        type: "buy",
        customer: ["保管場所の所在図・配置図"]
    },
    Kei_Loan_Jumin: {
        name: "所有権解除用書類（住民票）",
        type: "sell",
        customer: ["住民票（マイナンバー記載なし・3ヶ月以内）"]
    },
    Kei_Loan_Inkan: {
        name: "所有権解除用書類（印鑑証明）",
        type: "sell",
        customer: ["印鑑登録証明書（3ヶ月以内）"]
    },
    C: {
        name: "所有権解除",
        type: "sell",
        customer: ["免許証コピー", "残確申請書", "所有権解除委任状（※名義人ご本人のもの）"]
    },
    D: {
        name: "第三者名義",
        type: "sell",
        customer: ["譲渡証明書（名義人実印）", "名義人の印鑑証明書", "名義人の委任状"]
    },
    E: {
        name: "付随書類（転居・改姓）",
        type: "sell",
        customer: ["住民票（マイナンバー記載なし・住所変更の場合）", "戸籍謄本（氏名変更の場合）"]
    },
    E1: {
        name: "付随書類（住所変更1回）",
        type: "sell",
        customer: ["住民票（マイナンバー記載なし・住所変更の場合）"]
    },
    E2: {
        name: "付随書類（住所変更2回以上）",
        type: "sell",
        customer: ["戸籍の附票（住所履歴の証明）"]
    },
    E3: {
        name: "付随書類（氏名変更）",
        type: "sell",
        customer: ["戸籍謄本（氏名変更の場合）"]
    },
    F: {
        name: "普通車下取り・売却基本",
        type: "sell",
        customer: [
            "印鑑登録証明書（3ヶ月以内）", 
            "車検証 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "自賠責保険証 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "自動車税納税証明書 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "リサイクル券 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "譲渡証明書", 
            "委任状",
            "自動車税還付委任状"
        ]
    },
    F_kanpu: {
        name: "普通車還付手続き",
        type: "sell",
        customer: ["印鑑登録証明書（還付用・追加1通）"]
    },
    G: {
        name: "軽自動車下取り・売却基本",
        type: "sell",
        customer: [
            "車検証 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "自賠責保険証 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "軽自動車税納税証明書 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "リサイクル券 <span class='text-xs text-muted'>※車の手放し日で可</span>", 
            "申請依頼書"
        ]
    }
};

// 質問フローの定義
const flowData = {
    q1: {
        step: 1,
        text: "今回のご用件をお聞かせください。",
        options: [
            { text: "普通車を購入する", next: "q_shako_owner", sets: ["A"] },
            { text: "軽自動車を購入する", next: "q_shako_owner", sets: ["B"] },
            { text: "お車の売却（買取）のみ", next: "q2", sets: [] }
        ]
    },
    q_shako_owner: {
        step: 2,
        text: "車庫証明を申請する場所（土地）の所有者はどなたですか？",
        options: [
            { text: "購入車両名義人と一緒", next: "q2", sets: ["Shako_Jinin", "Shako_Map"] },
            { text: "家族 or 管理会社", next: "q2", sets: ["Shako_Shodaku", "Shako_Map"] },
            { text: "共同所有", next: "q_shako_joint", sets: ["Shako_Jinin", "Shako_Map"] }
        ]
    },
    q_shako_joint: {
        step: 3,
        text: "共同所有者（他の方）の分の承諾書は何枚必要ですか？",
        options: [
            { text: "1枚", next: "q2", sets: ["Shako_Shodaku"] },
            { text: "2枚", next: "q2", sets: ["Shako_Shodaku", "Shako_Shodaku"] },
            { text: "3枚", next: "q2", sets: ["Shako_Shodaku", "Shako_Shodaku", "Shako_Shodaku"] }
        ]
    },
    q2: {
        step: 4,
        text: "今回、下取り（または売却）に出されるお車はありますか？",
        options: [
            { text: "ない", next: "result", sets: [] },
            { text: "ある", next: "q3_new", sets: [] }
        ]
    },
    q3_new: {
        step: 3,
        text: "下取り・売却されるお車はどちらですか？",
        options: [
            { text: "普通車", next: "q4_new", sets: ["F"] },
            { text: "軽自動車", next: "q4_new", sets: ["G"] }
        ]
    },
    q4_new: {
        step: 4,
        text: "下取り・売却されるお車の車検証「所有者」欄はどなたになっていますか？",
        options: [
            { text: "ご本人様", next: "q5_new", sets: [] },
            { text: "ローン会社・ディーラー", next: "q_kei_loan", sets: ["C"] },
            { text: "ご家族・知人（第三者）", next: "q5_new", sets: ["D"] }
        ]
    },
    q_kei_loan: {
        step: 4.5,
        text: "<span style='color:#ef4444; font-weight:bold;'>※営業スタッフ要確認</span><br>所有権解除に必要な書類はどちらですか？<br><span style='font-size:0.8rem; color:#64748b;'>※信販会社をご確認ください</span>",
        options: [
            { text: "住民票", next: "q5_new", sets: ["Kei_Loan_Jumin"] },
            { text: "印鑑登録証明書", next: "q5_new", sets: ["Kei_Loan_Inkan"] }
        ]
    },
    q5_new: {
        step: 5,
        text: "下取り・売却されるお車の車検証住所から、お引越しなどで変更はありますか？",
        options: [
            { text: "変更なし", next: "q6_name", sets: [] },
            { text: "1回の引越し", next: "q6_name", sets: ["E1"] },
            { text: "2回以上の引越し", next: "q6_name", sets: ["E2"] }
        ]
    },
    q6_name: {
        step: 6,
        text: "ご結婚などで、車検証から氏名の変更はありますか？",
        options: [
            { text: "変更なし", next: "result", sets: [] },
            { text: "氏名の変更あり", next: "result", sets: ["E3"] }
        ]
    }
};

// 書類の説明データ
const docExplanations = {
    "印鑑登録証明書（3ヶ月以内）": "<b>【どんな書類？】</b><br>お住まいの市区町村で発行される、登録された印鑑が本物であることを証明する書類です。<br><b>【なぜ必要？】</b><br>車の名義変更（購入・売却）など、重要な手続きを間違いなくご本人の意思で行うことを公的に証明するために必要となります。",
    "保管場所使用権原疎明書面（自認書）": "<b>【どんな書類？】</b><br>自分の土地を駐車場として使うことを自分で証明する書類です。<br><b>【なぜ必要？】</b><br>駐車場が自分の所有地であることを警察署に届けるために必要です。",
    "保管場所使用承諾証明書": "<b>【どんな書類？】</b><br>土地の所有者から、駐車場として使う許可をもらったことを証明する書類です。<br><b>【なぜ必要？】</b><br>駐車場が自分以外（家族や管理会社など）の所有地である場合に必要です。",
    "保管場所の所在図・配置図": "<b>【どんな書類？】</b><br>駐車場の場所と、その敷地内のどこに停めるかを図解した書類です。<br><b>【なぜ必要？】</b><br>警察が実際に現場を確認し、車が収まるスペースがあるかを判断するために必要です。",
    "委任状（実印捺印）": "<b>【どんな書類？】</b><br>手続きをご本人に代わってお店（当店）が行うことを委任するための書類です。<br><b>【なぜ必要？】</b><br>お客様ご自身で陸運局へ行く手間を省き、当店が責任をもって名義変更などを代行するために必要です。",
    "住民票（3ヶ月以内）": "<b>【どんな書類？】</b><br>お住まいの市区町村で発行される、現在の住所と氏名を証明する書類です。<br><b>【なぜ必要？】</b><br>軽自動車の購入や名義変更の際、公的にご本人の現住所を確認するために必要となります。",
    "申請依頼書": "<b>【どんな書類？】</b><br>軽自動車の手続きをお店（当店）に依頼するための書類です。普通車の「委任状」にあたるものです。<br><b>【なぜ必要？】</b><br>お客様に代わって、軽自動車検査協会で名義変更の手続きを行うために必要です。",
    "免許証コピー": "<b>【どんな書類？】</b><br>ご本人様の運転免許証のコピーです。<br><b>【なぜ必要？】</b><br>所有権解除などのお手続きの際に、ご本人様確認の資料としてローン会社等から提出を求められるためです。",
    "残確申請書": "<b>【どんな書類？】</b><br>ローンの残高確認や、所有権解除の手続きを依頼するための申請書です。<br><b>【なぜ必要？】</b><br>ローン会社に対して、現在のローンの状況を確認し、車の名義をお客様（または当店）に移す許可をもらうために必要です。",
    "所有権解除委任状（※名義人ご本人のもの）": "<b>【どんな書類？】</b><br>所有権解除の手続きを委任する書類です。<br><b>【なぜ必要？】</b><br>ローン会社などの名義になっている車を、売却・下取りできるように名義変更する手続きを代行するために必要です。",
    "譲渡証明書（名義人実印）": "<b>【どんな書類？】</b><br>車を誰に譲ったのかを証明する書類です。<br><b>【なぜ必要？】</b><br>第三者名義の車を譲り受けて売却するために、元の持ち主からの譲渡の意思を確認するために必要です。",
    "名義人の印鑑証明書": "<b>【どんな書類？】</b><br>車検証上の名義人の方の印鑑登録証明書です。<br><b>【なぜ必要？】</b><br>譲渡証明書や委任状に押された印鑑が、名義人の方の実印であることを公的に証明するために必要です。",
    "名義人の委任状": "<b>【どんな書類？】</b><br>車検証上の名義人の方が、手続きを委任するための書類です。<br><b>【なぜ必要？】</b><br>名義人ご本人に代わって、当店が名義変更や売却の手続きを行うために必要です。",
    "住民票（住所変更の場合）": "<b>【どんな書類？】</b><br>現在お住まいの住所を証明する書類です。<br><b>【なぜ必要？】</b><br>車検証の住所と現在の住所が異なる場合、それが同一人物であることを証明し、住所を繋げるために必要です。",
    "住民票（マイナンバー記載なし・住所変更の場合）": "<b>【どんな書類？】</b><br>現在お住まいの住所を証明する書類です。<br><b>【なぜ必要？】</b><br>車検証の住所と現在の住所が異なる場合、同一人物であることを証明するために必要です。<br>⚠️ <b>必ずマイナンバー記載なし</b>でご取得ください。",
    "住民票（マイナンバー記載なし・3ヶ月以内）": "<b>【どんな書類？】</b><br>現在お住まいの住所と氏名を証明する書類です。<br><b>【なぜ必要？】</b><br>軽自動車の購入や名義変更の際、公的にご本人の現住所を確認するために必要です。<br>⚠️ <b>必ずマイナンバー記載なし</b>でご取得ください。",
    "戸籍謄本（氏名変更の場合）": "<b>【どんな書類？】</b><br>ご結婚等による氏名の変更を証明する書類です。<br><b>【なぜ必要？】</b><br>車検証の氏名と現在の氏名が異なる場合、同一人物であることを公的に証明するために必要です。",
    "実印": "<b>【どんな書類？】</b><br>市区町村に登録している印鑑です。<br><b>【なぜ必要？】</b><br>普通車の譲渡証明書や委任状には、実印の捺印が法律で義務付けられているためです。",
    "車検証 <span class='text-xs text-muted'>※車の手放し日で可</span>": "<b>【どんな書類？】</b><br>誰のものか（所有者・使用者）を証明する書類です。<br><b>【なぜ必要？】</b><br>名義変更や抹消登録など、車に関するあらゆる手続きの基本となる最重要書類です。",
    "自賠責保険証 <span class='text-xs text-muted'>※車の手放し日で可</span>": "<b>【どんな書類？】</b><br>加入が義務付けられている自動車損害賠償責任保険の証明書です。<br><b>【なぜ必要？】</b><br>名義変更の手続き時にも有効な保険証が必要となるためです。",
    "自動車税納税証明書 <span class='text-xs text-muted'>※車の手放し日で可</span>": "<b>【どんな書類？】</b><br>毎年5月に支払う自動車税を納付したことを証明する書類です。<br><b>【なぜ必要？】</b><br>税金に未納があると車検や名義変更の手続きができないため、納付状況の確認に必要です。",
    "リサイクル券 <span class='text-xs text-muted'>※車の手放し日で可</span>": "<b>【どんな書類？】</b><br>将来車を廃棄する際のリサイクル料金が預託されていることを証明する券です。<br><b>【なぜ必要？】</b><br>車を売買する際、このリサイクル料金の権利も一緒に譲渡されるため、書類として必要になります。",
    "譲渡証明書": "<b>【どんな書類？】</b><br>車を譲渡したことを証明する書類です。<br><b>【なぜ必要？】</b><br>普通車の名義を当店や次のお客様に変更するために必要です。",
    "委任状": "<b>【どんな書類？】</b><br>手続きを当店に委任するための書類です。<br><b>【なぜ必要？】</b><br>お客様に代わって名義変更の手続きを陸運局で行うために必要です。",
    "軽自動車税納税証明書 <span class='text-xs text-muted'>※車の手放し日で可</span>": "<b>【どんな書類？】</b><br>毎年5月に支払う軽自動車税を納付したことを証明する書類です。<br><b>【なぜ必要？】</b><br>税金に未納があると手続きができないため、納付状況の確認に必要です。",
    "認印": "<b>【どんな書類？】</b><br>実印以外の、普段お使いの印鑑です。<br><b>【なぜ必要？】</b><br>軽自動車の手続きに必要な申請依頼書などに捺印していただくために必要です。",
    "戸籍の附票（住所履歴の証明）": "<b>【どんな書類？】</b><br>本籍地の市区町村で発行される、これまでの住所の履歴がすべて記載された書類です。<br><b>【なぜ必要？】</b><br>複数回のお引越しをしている場合、車検証の住所から現在の住所まで繋がっていることを公的に証明するために必要です。<br>💡 <b>住所変更が2回の場合、「住民票の除票」でも対応できる場合がありますが、取得手順が複雑になるため、戸籍の附票の取得をお勧めします。</b>",
    "印鑑登録証明書（還付用・追加1通）": "<b>【どんな書類？】</b><br>印鑑登録証明書の追加の1通です。<br><b>【なぜ必要？】</b><br>地域によっては自動車税の還付手続きにも印鑑登録証明書が別途で1通必要になります。",
    "車庫証明委任状": "<b>【どんな書類？】</b><br>車庫証明の手続きを当店に委任するための書類です。<br><b>【なぜ必要？】</b><br>お客様に代わって警察署で車庫証明の申請・受取を行うために必要です。",
    "自動車税還付委任状": "<b>【どんな書類？】</b><br>自動車税の還付（戻り分）を受け取る権利を委任する書類です。<br><b>【なぜ必要？】</b><br>売却にともなう自動車税の還付手続きを確実に行うために必要です。"
};

// 状態管理
let currentQuestionId = "q1";
let history = []; // 戻る用
let collectedSets = new Set(); // 収集した書類セットのID

// 設定管理
const defaultSettings = {
    keiCarShako: false,   // 軽自動車の車庫証明案内
    kanpuInkan: false,    // 還付用の印鑑登録証明書案内
    shakoInkan: false     // 車庫証明の委任状案内
};
let appSettings = { ...defaultSettings };

function loadSettings() {
    try {
        const saved = localStorage.getItem('carDocAppSettings');
        if (saved) {
            appSettings = { ...defaultSettings, ...JSON.parse(saved) };
        }
    } catch(e) {}
    // ボタンの見た目を反映
    updateSettingUI('keiCarShako', 'toggle-keikei-shako');
    updateSettingUI('kanpuInkan', 'toggle-kanpu');
    updateSettingUI('shakoInkan', 'toggle-shako-inkan');
}

function saveSettings() {
    try {
        localStorage.setItem('carDocAppSettings', JSON.stringify(appSettings));
    } catch(e) {}
}

function toggleSetting(key) {
    appSettings[key] = !appSettings[key];
    saveSettings();
    let btnId = '';
    if (key === 'keiCarShako') btnId = 'toggle-keikei-shako';
    else if (key === 'kanpuInkan') btnId = 'toggle-kanpu';
    else if (key === 'shakoInkan') btnId = 'toggle-shako-inkan';
    updateSettingUI(key, btnId);
}

function updateSettingUI(key, btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (appSettings[key]) {
        btn.textContent = 'オン';
        btn.classList.add('toggle-on');
    } else {
        btn.textContent = 'オフ';
        btn.classList.remove('toggle-on');
    }
}

function openSettings() {
    document.getElementById('settings-overlay').classList.add('active');
    document.getElementById('settings-panel').classList.add('active');
}

function closeSettings() {
    document.getElementById('settings-overlay').classList.remove('active');
    document.getElementById('settings-panel').classList.remove('active');
}

// UI制御関数
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startWizard() {
    // URLパラメータから状態を復元（共有リンクから来た場合）
    const urlParams = new URLSearchParams(window.location.search);
    const setsParam = urlParams.get('sets');
    
    if (setsParam) {
        // 結果画面へ直行
        const setsArray = setsParam.split(',');
        setsArray.forEach(s => collectedSets.push(s));
        showResult();
    } else {
        // 通常開始
        currentQuestionId = "q1";
        history = [];
        collectedSets = [];
        renderQuestion();
        switchScreen('question-screen');
    }
}

function renderQuestion() {
    const q = flowData[currentQuestionId];
    document.getElementById('step-indicator').innerText = `STEP ${Math.floor(q.step)}`;
    document.getElementById('question-text').innerHTML = q.text;
    
    // プログレスバーの更新 (最大8ステップ)
    const progress = (q.step / 8) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    // 戻るボタンの表示制御
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = history.length > 0 ? 'block' : 'none';

    // 選択肢の描画
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => handleAnswer(opt);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedOption) {
    // 次の質問を決定（スキップロジック）
    let nextQ = selectedOption.next;
    if (currentQuestionId === 'q1' && selectedOption.text === "軽自動車を購入する") {
        if (!appSettings.keiCarShako) {
            nextQ = "q2";
        }
    }

    // 軽自動車の下取りで所有者が本人・家族等の場合、住所変更の質問をスキップ
    const isKeiSell = collectedSets.includes('G') || (selectedOption.sets && selectedOption.sets.includes('G'));
    if (currentQuestionId === 'q4_new' && isKeiSell) {
        if (selectedOption.text === "ご本人様" || selectedOption.text === "ご家族・知人（第三者）") {
            nextQ = "result";
        }
    }
    // 普通車の場合はq4_newの次はq_kei_loanにならないように制御（q4_newのnextは通常q_kei_loanに変更したので）
    if (currentQuestionId === 'q4_new' && !isKeiSell && selectedOption.text === "ローン会社・ディーラー") {
        nextQ = "q5_new";
    }

    // 現在の状態を履歴に保存
    history.push({
        qId: currentQuestionId,
        addedSets: selectedOption.sets
    });

    // セットを追加
    let setsToAdd = [...selectedOption.sets];
    
    // 普通車下取り基本（F）が追加される時点で還付もチェック
    if (setsToAdd.includes('F') && appSettings.kanpuInkan) {
        setsToAdd.push('F_kanpu');
    }

    // 車庫証明の委任状チェック (Shako_Map が含まれる場合 = 車庫質問を通った場合)
    const hasShako = setsToAdd.includes('Shako_Map');
    if (hasShako && appSettings.shakoInkan) {
        setsToAdd.push('A_shako_inkan');
    }

    setsToAdd.forEach(s => collectedSets.push(s));
    history[history.length - 1].addedSets = setsToAdd;

    if (nextQ === 'result') {
        showResult();
    } else {
        currentQuestionId = nextQ;
        renderQuestion();
    }
}

function goBack() {
    if (history.length === 0) return;
    
    const lastState = history.pop();
    // 追加したセットを取り消し
    lastState.addedSets.forEach(s => {
        const idx = collectedSets.lastIndexOf(s);
        if (idx > -1) collectedSets.splice(idx, 1);
    });
    
    currentQuestionId = lastState.qId;
    renderQuestion();
}

// 利用可能な統合版PDFのパス
const pdfFiles = {
    "委任状": { merged: "assets/pdf/merged/委任状_統合.pdf", original: "assets/pdf/委任状.pdf" },
    "委任状（実印捺印）": { merged: "assets/pdf/merged/委任状_統合.pdf", original: "assets/pdf/委任状.pdf" },
    "名義人の委任状": { merged: "assets/pdf/merged/委任状_統合.pdf", original: "assets/pdf/委任状.pdf" },
    "所有権解除委任状（※名義人ご本人のもの）": { merged: "", original: "" },
    "申請依頼書": { merged: "", original: "assets/pdf/申請依頼書.pdf" },
    "譲渡証明書": { merged: "assets/pdf/merged/譲渡証明書_統合.pdf", original: "assets/pdf/譲渡証明書.pdf" },
    "譲渡証明書（名義人実印）": { merged: "assets/pdf/merged/譲渡証明書_統合.pdf", original: "assets/pdf/譲渡証明書.pdf" },
    "保管場所使用権原疎明書面（自認書）": { merged: "assets/pdf/merged/自認書_統合.pdf", original: "assets/pdf/自認書.pdf" },
    "保管場所使用承諾証明書": { merged: "assets/pdf/merged/保管場所使用承諾書_統合.pdf", original: "assets/pdf/保管場所使用承諾書.pdf" },
    "保管場所の所在図・配置図": { merged: "assets/pdf/merged/見取り図・配置図_統合.pdf", original: "assets/pdf/見取り図・配置図.pdf" },
    "車庫証明委任状": { merged: "assets/pdf/merged/車庫証明委任状_統合.pdf", original: "assets/pdf/車庫証明委任状.pdf" }
};

// 印刷用に最終結果を保持
let currentFinalDocs = new Set();
let allPrintablePdfs = [];
let docCounts = {};
let finalBuyDocs = new Set();
let finalSellDocs = new Set();

function showResult() {
    switchScreen('result-screen');
    
    // リストの生成
    const buySection = document.getElementById('buy-docs-section');
    const sellSection = document.getElementById('sell-docs-section');
    const buyList = document.getElementById('buy-docs-list');
    const sellList = document.getElementById('sell-docs-list');
    
    buyList.innerHTML = '';
    sellList.innerHTML = '';

    // 以前のデータを完全にリセット
    currentFinalDocs.clear();
    allPrintablePdfs = [];
    docCounts = {}; // 合計枚数用
    const buyDocCounts = {}; // 購入セクション用
    const sellDocCounts = {}; // 売却セクション用
    const buyDocsArray = [];
    const sellDocsArray = [];

    collectedSets.forEach(setId => {
        const docSet = documentSets[setId];
        if (docSet) {
            docSet.customer.forEach(d => {
                docCounts[d] = (docCounts[d] || 0) + 1;
                if (docSet.type === 'buy') {
                    buyDocCounts[d] = (buyDocCounts[d] || 0) + 1;
                    buyDocsArray.push(d);
                    currentFinalDocs.add(d);
                } else if (docSet.type === 'sell') {
                    sellDocCounts[d] = (sellDocCounts[d] || 0) + 1;
                    sellDocsArray.push(d);
                    currentFinalDocs.add(d);
                }
            });
        }
    });
    
    finalBuyDocs = new Set(buyDocsArray);
    finalSellDocs = new Set(sellDocsArray);

    // 所有権解除（信販会社）の場合の特殊処理
    if (collectedSets.includes('C')) {
        if (collectedSets.includes('F')) {
            finalSellDocs.delete("譲渡証明書");
            currentFinalDocs.delete("譲渡証明書");
            docCounts["譲渡証明書"] = 0;
            sellDocCounts["譲渡証明書"] = 0;
        }
        if (collectedSets.includes('G')) {
            finalSellDocs.delete("申請依頼書");
            currentFinalDocs.delete("申請依頼書");
            docCounts["申請依頼書"] = 0;
            sellDocCounts["申請依頼書"] = 0;
        }
    }

    // 軽自動車＋信販会社＋住所変更1回＋解除書類が住民票
    if (collectedSets.includes('G') && collectedSets.includes('C') && collectedSets.includes('E1') && collectedSets.includes('Kei_Loan_Jumin')) {
        const d1 = "住民票（マイナンバー記載なし・3ヶ月以内）";
        const d2 = "住民票（マイナンバー記載なし・住所変更の場合）";
        if (finalSellDocs.has(d2)) {
            finalSellDocs.delete(d2);
            currentFinalDocs.delete(d2);
            docCounts[d1] = 1;
            docCounts[d2] = 0;
            sellDocCounts[d1] = 1;
            sellDocCounts[d2] = 0;
        }
    }

    // アコーディオン形式のリストアイテムを生成するヘルパー関数
    function createAccordionItem(docName, docType, sectionCount) {
        const li = document.createElement('li');
        li.className = 'doc-item';
        
        const count = sectionCount || 1;
        const countText = count > 1 ? ` <span class="text-sm font-bold text-blue-600">（${count}枚）</span>` : '';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'doc-title';
        titleDiv.innerHTML = `<span class="doc-name-text">${docName}${countText}</span> <span class="toggle-icon">▼</span>`;
        
        const descDiv = document.createElement('div');
        descDiv.className = 'doc-desc';
        descDiv.innerHTML = docExplanations[docName] || "この書類の詳細な説明はありません。";
        
        titleDiv.onclick = () => {
            descDiv.classList.toggle('open');
            titleDiv.classList.toggle('open');
        };
        
        // 個別印刷ボタンの生成
        const pdfData = pdfFiles[docName];
        if (pdfData) {
            const btnContainer = document.createElement('div');
            btnContainer.className = 'mt-3 mb-2';
            
            let targetPdfUrl = pdfData.merged;
            if (docName === "申請依頼書") {
                if (docType === 'buy') targetPdfUrl = "assets/pdf/merged/申請依頼書_購入_統合.pdf";
                else if (docType === 'sell') targetPdfUrl = "assets/pdf/merged/申請依頼書_売却_統合.pdf";
            }
            if (!targetPdfUrl) targetPdfUrl = pdfData.original;
            
            if (targetPdfUrl) {
                const printBtn = document.createElement('button');
                printBtn.className = 'btn btn-secondary text-center';
                printBtn.style.display = 'block';
                printBtn.style.marginBottom = '0.5rem';
                printBtn.innerText = '印刷する（原紙＋見本）';
                printBtn.onclick = (e) => {
                    e.stopPropagation();
                    printJS({printable: targetPdfUrl, type: 'pdf'});
                };
                btnContainer.appendChild(printBtn);
            }
            descDiv.appendChild(btnContainer);
        }
        
        li.appendChild(titleDiv);
        li.appendChild(descDiv);
        return li;
    }

    // 1. UIリストの描画
    if (finalBuyDocs.size > 0) {
        buySection.style.display = 'block';
        finalBuyDocs.forEach(doc => { buyList.appendChild(createAccordionItem(doc, 'buy', buyDocCounts[doc])); });
    } else {
        buySection.style.display = 'none';
    }

    if (finalSellDocs.size > 0) {
        sellSection.style.display = 'block';
        finalSellDocs.forEach(doc => { sellList.appendChild(createAccordionItem(doc, 'sell', sellDocCounts[doc])); });
    } else {
        sellSection.style.display = 'none';
    }

    generateShareLink();
}

/**
 * 現在の回答状態 (collectedSets) から、印刷すべきPDFのリストをゼロから再構築する
 */
function rebuildPrintQueue() {
    console.log("印刷リストを再構築します...");
    allPrintablePdfs = [];
    docCounts = {}; // グローバルのdocCountsを更新する
    const tempBuyDocs = new Set();
    const tempSellDocs = new Set();

    // 1. 枚数と種類を集計
    collectedSets.forEach(setId => {
        const docSet = documentSets[setId];
        if (docSet) {
            docSet.customer.forEach(d => {
                docCounts[d] = (docCounts[d] || 0) + 1;
                if (docSet.type === 'buy') tempBuyDocs.add(d);
                else if (docSet.type === 'sell') tempSellDocs.add(d);
            });
        }
    });

    // 所有権解除などの特殊除外ロジックを適用
    if (collectedSets.includes('C')) {
        if (collectedSets.includes('F')) { docCounts["譲渡証明書"] = 0; tempSellDocs.delete("譲渡証明書"); }
        if (collectedSets.includes('G')) { docCounts["申請依頼書"] = 0; tempSellDocs.delete("申請依頼書"); }
    }
    if (collectedSets.includes('G') && collectedSets.includes('C') && collectedSets.includes('E1') && collectedSets.includes('Kei_Loan_Jumin')) {
        const d1 = "住民票（マイナンバー記載なし・3ヶ月以内）";
        const d2 = "住民票（マイナンバー記載なし・住所変更の場合）";
        docCounts[d1] = 1;
        docCounts[d2] = 0;
        tempSellDocs.delete(d2);
    }

    // 2. 集計結果から印刷キューを作成
    // 購入・売却で個別に予約リストを構築（申請依頼書などの出し分け用）
    const buildQueueForSection = (docNames, type) => {
        docNames.forEach(docName => {
            const count = (type === 'buy' ? buyDocCounts[docName] : sellDocCounts[docName]) || 0;
            if (count <= 0) return;

            const pdfData = pdfFiles[docName];
            if (!pdfData || (!pdfData.merged && !pdfData.original)) return;

            let targetMerged = pdfData.merged;
            if (docName === "申請依頼書") {
                if (type === 'buy') targetMerged = "assets/pdf/merged/申請依頼書_購入_統合.pdf";
                else if (type === 'sell') targetMerged = "assets/pdf/merged/申請依頼書_売却_統合.pdf";
            }
            if (!targetMerged) targetMerged = pdfData.original;

            for (let i = 0; i < count; i++) {
                allPrintablePdfs.push({
                    name: docName + (type === 'buy' ? "（購入用）" : "（売却用）"),
                    merged: targetMerged,
                    original: pdfData.original
                });
            }
        });
    };

    buildQueueForSection(Array.from(finalBuyDocs), 'buy');
    buildQueueForSection(Array.from(finalSellDocs), 'sell');

    console.log("再構築完了。枚数:", allPrintablePdfs.length);
}

function generateShareLink() {
    // 現在のURLを取得し、クエリパラメータを付ける
    let origin = window.location.origin;
    // PC上でlocalhostとして開いている場合でも、スマホ等からアクセスできるように公開URLに自動変換する
    if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('172.18')) {
        origin = 'https://taupe-douhua-b1da3c.netlify.app';
    }
    const baseUrl = origin + window.location.pathname;
    
    const setsStr = Array.from(collectedSets).join(',');
    const shareUrl = `${baseUrl}?sets=${setsStr}`;
    
    const shareUrlEl = document.getElementById('share-url');
    shareUrlEl.innerText = shareUrl;

    // QRコードの生成
    const qrCanvas = document.getElementById('qrcode');
    
    // QRCode.toCanvas は qrcode.js ライブラリが提供する関数
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(qrCanvas, shareUrl, function (error) {
            if (error) console.error(error);
        });
    } else {
        console.error("QRCode library not loaded");
    }
}

function resetWizard() {
    // URLパラメータを消してリロードするか、状態をリセットする
    window.history.replaceState({}, document.title, window.location.pathname);
    startWizard();
}

async function printAllDocs() {
    const printBtn = document.querySelector('.result-card .btn-primary');
    if (printBtn) printBtn.disabled = true;

    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'flex';

    // 印刷前に最新の状態からリストを強制的に再構築する（累積防止）
    rebuildPrintQueue();

    console.log("一括印刷プロセス開始. 予約数:", allPrintablePdfs.length);

    if (allPrintablePdfs.length === 0) {
        alert("印刷可能な書類データがありません。");
        loadingOverlay.style.display = 'none';
        return;
    }

    try {
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();

        // 1. カバーシートのデータを構築
        const coverBuyLine = document.getElementById('cover-buy-vehicle');
        const coverSellLine = document.getElementById('cover-sell-vehicle');
        
        let hasBuyTransaction = false;
        let hasSellTransaction = false;

        Array.from(collectedSets).forEach(id => {
            if (documentSets[id]) {
                if (documentSets[id].type === 'buy') hasBuyTransaction = true;
                if (documentSets[id].type === 'sell') hasSellTransaction = true;
            }
        });

        coverBuyLine.style.display = hasBuyTransaction ? 'flex' : 'none';
        coverSellLine.style.display = hasSellTransaction ? 'flex' : 'none';

        const coverListEl = document.getElementById('cover-docs-list');
        coverListEl.innerHTML = ''; // 以前のリストをクリアする（累積防止）

        currentFinalDocs.forEach(doc => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = doc;
            let cleanText = tempDiv.innerText;

            if (docCounts[doc] > 1) {
                cleanText += ` （${docCounts[doc]}通）`;
            }

            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cover-doc-name">${cleanText}</div>
                <div class="cover-doc-boxes">
                    <span class="check-box"></span>
                    <span class="check-box"></span>
                </div>
            `;
            coverListEl.appendChild(li);
        });

        // 売却・下取り用書類がある場合のみ注記を表示
        let hasSellDocs = false;
        Array.from(collectedSets).forEach(id => {
            if (documentSets[id] && documentSets[id].type === 'sell') {
                hasSellDocs = true;
            }
        });

        const sellNoteEl = document.getElementById('cover-sell-note');
        if (hasSellDocs) {
            sellNoteEl.innerHTML = '※車検証、自賠責保険証、自動車税納税証明書、リサイクル券は「車の手放し日」までにご用意いただければ結構です。<br>';
        } else {
            sellNoteEl.innerHTML = '';
        }

        // 少し待機してレンダリングを確実にする
        await new Promise(resolve => setTimeout(resolve, 100));

        // html2canvasでカバーシートを画像化
        const coverElement = document.getElementById('cover-sheet');
        const canvas = await html2canvas(coverElement, {
            scale: 2,
            useCORS: true,
            logging: false
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        // pdf-libのembedJpgにはプレフィックスを除去した純粋なbase64文字列を渡す
        const base64Data = imgData.split(',')[1];
        
        const a4Width = 595.28;
        const a4Height = 841.89;
        const page = mergedPdf.addPage([a4Width, a4Height]);
        
        const jpgImage = await mergedPdf.embedJpg(base64Data);
        
        // アスペクト比を保ちつつA4に収めるか、いっぱいに伸ばすか
        // cover-sheetはA4比率で作っているのでほぼそのまま入る
        page.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: a4Width,
            height: a4Height,
        });

        // 2. 既存の原紙・見本PDFを結合
        const processedUrls = new Set();

        for (const pdfInfo of allPrintablePdfs) {
            // 印刷対象のファイルURL自体で初回判定を行う（書類名が違ってもURLが同じなら2回目は原紙のみにする）
            const isFirstTime = !processedUrls.has(pdfInfo.merged);
            const targetUrl = (isFirstTime ? pdfInfo.merged : pdfInfo.original) || pdfInfo.original;

            if (!targetUrl) continue;

            const pdfBytes = await fetch(targetUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const pageIndices = pdfDoc.getPageIndices();
            
            // 結合処理
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pageIndices);
            copiedPages.forEach((p) => {
                mergedPdf.addPage(p);
            });

            if (isFirstTime && pdfInfo.merged) {
                processedUrls.add(pdfInfo.merged);
            }
        }

        // 3. 結合PDFを保存・出力
        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        printJS({printable: blobUrl, type: 'pdf'});
        
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        loadingOverlay.style.display = 'none';
        if (printBtn) printBtn.disabled = false;

    } catch (error) {
        console.error("PDF結合エラー:", error);
        loadingOverlay.style.display = 'none';
        if (printBtn) printBtn.disabled = false;
        alert("PDFの生成中にエラーが発生しました。\n詳細: " + error.message + "\nお手数ですが一覧の各項目のボタンから1つずつ印刷をお願いいたします。");
    }
}

// 起動時にパラメータがあれば結果画面へ
window.onload = () => {
    loadSettings(); // 設定をロード
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('sets')) {
        startWizard();
    }
};
