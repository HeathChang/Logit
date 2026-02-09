"use client";

export const LoginForm = () => {
  return (
    <section className="w-full max-w-sm rounded-2xl border border-border-main bg-bg-card px-6 py-8 shadow-sm">
      <header className="mb-6">
        <h1 className="text-lg font-semibold text-text-main">로그인</h1>
        <p className="mt-1 text-xs text-text-sub">
          Logit 계정으로 로그인하고 오늘의 기록을 시작해 보세요.
        </p>
      </header>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="login-email"
            className="text-xs font-medium text-text-main"
          >
            이메일
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="login-password"
            className="text-xs font-medium text-text-main"
          >
            비밀번호
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log"
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-9 rounded-lg bg-logit-log text-xs font-semibold text-white shadow-sm transition-colors hover:opacity-90"
        >
          로그인
        </button>

        <button
          type="button"
          className="mt-1 h-9 rounded-lg border border-border-main bg-bg-main text-xs font-medium text-text-main transition-colors hover:border-logit-git hover:text-logit-git"
        >
          GitHub로 계속하기
        </button>
      </form>
    </section>
  );
};

