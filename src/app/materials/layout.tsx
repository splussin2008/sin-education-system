// 印刷用ページでは共通のヘッダーなどを隠し、A4白背景に全画面表示するため、
// 別途専用のレイアウトを用意するか、page.tsx側で工夫します。
// ここでは、材料ごとの画面を作るため、最低限のラッパーだけ提供します。

export default function MaterialLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-slate-200 min-h-screen py-8 print:bg-white print:py-0">
            {children}
        </div>
    );
}
