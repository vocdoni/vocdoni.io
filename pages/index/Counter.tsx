import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Button type="button" variant="outline" size="sm" onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </Button>
  );
}
