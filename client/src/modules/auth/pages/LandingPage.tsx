import LoginForm from "../components/LoginForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const LandingPage = () => {

    const accounts = [
        "travis@avengers.com",
        "nickfury@avengers.com",
        "captainmarvel@avengers.com",
        "thanos@avengers.com",
        "thor@avengers.com",
        "captainamerica@avengers.com",
    ];

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center  bg-primary-foreground">
            <div className="w-full bg-primary border-b border-yellow-200 px-4 py-2 text-primary-foreground text-sm text-center">
                <strong>Note:</strong> Our server may take a few moments to start if it has been idle.
                Thank you for your patience.
            </div>
            <div className="flex flex-col items-center justify-center flex-1">
                <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl 2xl:text-7xl text-primary">
                    Multiverse Kitchens
                </h1>
                <div className="m-8">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="cursor-pointer text-xl">
                                Login
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Login</SheetTitle>
                                <SheetDescription>Welcome back! Please log in with your email and password to continue.</SheetDescription>
                            </SheetHeader>
                            <LoginForm />
                            <div className="max-w-sm rounded-lg border bg-gray-50 m-2 md:p-4 md:m-4">
                                <h3 className="mb-3 text-lg font-semibold">🧪 Tester Accounts</h3>
                                <ul className="space-y-1 text-sm">
                                    {accounts.map((email) => (
                                        <li key={email}>📧 {email}</li>
                                    ))}
                                </ul>
                                <div className="mt-3 font-semibold">
                                    🔑 Password: <code>123456</code>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
