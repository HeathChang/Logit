import { LoginForm } from "@/features/login/ui/LoginForm";

const LoginPage = () => {
    return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-bg-main">
            <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 py-10">
                <div className="mb-6 text-center">
                    <h1 className="text-xl font-semibold text-text-main">Logit</h1>
                    <p className="mt-1 text-xs text-text-sub">
                        기록이 쌓이면 성장이 보입니다. 오늘의 로그를 시작해 보세요.ㅈ
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;

