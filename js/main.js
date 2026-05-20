// 各li (シナリオ) のクリックイベント
$(".simulation-list li").on("click", function () {

    // 押されたliのシナリオ種類を取得
    const scenario = $(this).data("scenario");

    // 結果を入れる変数（どのシナリオでも使う）
    let resultText = "";
    let isWarning = false;

    // ===== シナリオ別の試算ロジック =====
    if (scenario === "chinage") {
        // 賃上げ：人勧5.3%で原資 400万〜500万、職員18名で配分
        const genshi = Math.floor(Math.random() * 1000000) + 4000000;
        const perMonth = Math.floor(genshi / 18 / 12);
        resultText = "→ 原資 ¥" + genshi.toLocaleString()
                   + " → 職員18名なら 一人 月額 +¥" + perMonth.toLocaleString();
        if (perMonth >= 20000) {
            resultText += "  ✓ 実感できる賃上げ";
        } else {
            resultText += "  → 小幅な賃上げ";
        }
    }
    else if (scenario === "saiyo") {
        // 採用：採用コスト 月25〜32万（社保込み）、雇うことで取れる加算 月15〜30万
        const cost = Math.floor(Math.random() * 70000) + 250000;
        const kasan = Math.floor(Math.random() * 150000) + 150000;
        const diff = kasan - cost;
        resultText = "→ 採用コスト 月¥" + cost.toLocaleString()
                   + " ／ 取れる加算 月¥" + kasan.toLocaleString();
        if (diff >= 0) {
            resultText += "  ✓ 実質 +¥" + diff.toLocaleString();
        } else {
            resultText += "  ⚠ 月¥" + Math.abs(diff).toLocaleString() + " の持ち出し";
            isWarning = true;
        }
    }
    else if (scenario === "teiin") {
        // 定員減：公定価格は10名単位で単価が変わるため10名減で固定。定員割れ前提で増収
        const genin = 10;
        const zoshu = Math.floor(Math.random() * 200000) + 100000;
        resultText = "→ 定員 -" + genin + "名 → 一人単価UPで 月額 +¥" + zoshu.toLocaleString();
        if (zoshu >= 150000) {
            resultText += "  ✓ 増収効果あり";
        } else {
            resultText += "  → 小幅な改善";
        }
    }

    // 結果を表示
    const $result = $(this).find(".sim-result");
    $result.text(resultText);
    if (isWarning) {
        $result.addClass("warning");
    } else {
        $result.removeClass("warning");
    }
});
