export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-slate-800 text-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-wider">教材管理システム</h1>
                <a href="/" className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors">検索画面へ戻る</a>
            </header>
            <main className="max-w-4xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
