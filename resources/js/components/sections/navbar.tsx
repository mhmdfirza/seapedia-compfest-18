import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Logo from "@/components/ui/logo";
import NavLink from "@/components/ui/navlink";

export default function Navbar() {
    return (
        <header className="border-b bg-white">
            <Container>
                <div className="flex h-20 items-center justify-between">
                    <Logo />

                    <nav className="flex gap-8">
                        <NavLink href="#">Home</NavLink>
                        <NavLink href="#">Products</NavLink>
                        <NavLink href="#">About</NavLink>
                        <NavLink href="#">Contact</NavLink>
                    </nav>

                    <Button>
                        Login
                    </Button>
                </div>
            </Container>
        </header>
    );
}