// app/components/LoginButton.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const LoginButton = () => {
  return (
    <Button variant="outline" asChild>
      <Link href="/login">
        Login
      </Link>
    </Button>
  );
};

export default LoginButton;