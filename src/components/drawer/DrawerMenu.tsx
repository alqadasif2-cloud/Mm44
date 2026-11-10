import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ExnessLogo, MetaQuotesLogo, MT5AppLogo } from '../common/Logos';

export const DrawerMenu: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    activeAccount,
    setActiveTab,
    unreadCount,
    setAccountInfoModalOpen
  } = useTrading();

  const [infoDialog, setInfoDialog] = React.useState<{ title: string; content: string } | null>(null);

  if (!isDrawerOpen) return null;

  const navigateTo = (tab: any) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* Slide-out Menu Panel (Right side in RTL) */}
      <div className="relative w-72 max-w-[80vw] h-full bg-[#181a1e] text-white flex flex-col shadow-2xl z-10 border-l border-[#262930] animate-slideLeft">
        {/* Drawer Header with Active Account ("اسلام") */}
        <div
          onClick={() => {
            setAccountInfoModalOpen(true);
            setIsDrawerOpen(false);
          }}
          className="p-5 bg-[#121417] border-b border-[#252930] cursor-pointer hover:bg-[#15171b] transition-colors"
        >
          <div className="flex items-center justify-between">
            {activeAccount.logoType === 'exness' ? (
              <ExnessLogo className="w-10 h-10" />
            ) : (
              <MetaQuotesLogo className="w-10 h-10" />
            )}
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c853] shadow-[0_0_8px_#00c853]"></span>
          </div>

          <div className="mt-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              {activeAccount.name}
            </h2>
            <p className="text-xs text-[#3897f0] font-semibold">
              {activeAccount.broker}
            </p>
            <p className="text-xs text-[#8e9aa8] mt-0.5 tabular-nums" dir="ltr">
              {activeAccount.accountNumber} — {activeAccount.server}
            </p>
            <div className="mt-2 text-sm font-bold text-white tabular-nums">
              {activeAccount.balance.toFixed(2)} {activeAccount.currency}
            </div>
          </div>
        </div>

        {/* Menu Navigation Links */}
        <div className="flex-1 overflow-y-auto py-2 divide-y divide-[#20232a]">
          <div className="py-1">
            <button
              onClick={() => navigateTo('accounts')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">👥</span>
                <span className="text-sm font-bold text-white">إدارة الحسابات</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('quotes')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">⇅</span>
                <span className="text-sm font-bold text-white">طلبات الأسعار</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('chart')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📊</span>
                <span className="text-sm font-bold text-white">الرسوم البيانية</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('trade')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📈</span>
                <span className="text-sm font-bold text-white">التداول</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('history')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">🕒</span>
                <span className="text-sm font-bold text-white">السجل</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>
          </div>

          <div className="py-1">
            <button
              onClick={() => navigateTo('messages')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">💬</span>
                <span className="text-sm font-bold text-white">الرسائل</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-[#e53935] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setInfoDialog({
                  title: 'التقويم الاقتصادي',
                  content: 'صدور بيانات مؤشر أسعار المستهلكين (CPI) والتضخم الأمريكي والقرار المرتقب للفائدة من الاحتياطي الفيدرالي.'
                });
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📅</span>
                <span className="text-sm font-bold text-white">التقويم الاقتصادي</span>
              </div>
            </button>

            <button
              onClick={() => {
                setInfoDialog({
                  title: 'دفتر اليومية (Journal)',
                  content: 'سجل الاتصال بالخادم: اتصال مشفر ببروتوكول TCP/SSL. زمن الاستجابة (Ping): 24ms. لا توجد أخطاء في الشبكة.'
                });
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📓</span>
                <span className="text-sm font-bold text-white">دفتر اليومية</span>
              </div>
            </button>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setInfoDialog({
                  title: 'إعدادات المنصة',
                  content: 'التداول بنقرة واحدة مفعل. أصوات فتح وإغلاق الصفقات مفعلة. إشعارات الأسعار والتنبيهات المباشرة مفعلة.'
                });
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">⚙️</span>
                <span className="text-sm font-bold text-white">الإعدادات</span>
              </div>
            </button>

            <button
              onClick={() => {
                setInfoDialog({
                  title: 'حول تطبيق MetaTrader 5',
                  content: 'MetaTrader 5 Mobile (Build 3800)\nحقوق النشر © 2000-2026 MetaQuotes Ltd.\nبوابة الخوادم: Exness & MetaQuotes Network.'
                });
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">ℹ️</span>
                <span className="text-sm font-bold text-white">حول التطبيق</span>
              </div>
            </button>
          </div>
        </div>

        {/* Drawer Footer with Official MT5 Logo */}
        <div className="p-4 bg-[#101215] border-t border-[#252930] flex items-center justify-center gap-2 text-xs text-[#8e9aa8]">
          <MT5AppLogo className="w-5 h-5" />
          <span className="font-semibold">MetaTrader 5 (MT5 / Exness)</span>
        </div>
      </div>

      {/* Info Dialog Popup */}
      {infoDialog && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setInfoDialog(null)}
        >
          <div
            className="bg-[#1c1e24] border border-[#2e333d] rounded-2xl w-full max-w-xs p-5 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-bold text-white text-base mb-2">{infoDialog.title}</h4>
            <p className="text-xs text-[#8e9aa8] whitespace-pre-line leading-relaxed mb-4">
              {infoDialog.content}
            </p>
            <button
              onClick={() => setInfoDialog(null)}
              className="w-full py-2.5 bg-[#3897f0] hover:bg-[#2884dc] text-white font-bold rounded-xl text-xs transition-colors"
            >
              موافق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
