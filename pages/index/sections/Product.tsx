import { Button } from "@/components/ui/button";

export function Product() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Product</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The Vocdoni Platform delivers enterprise-grade voting solutions with unmatched security, scalability, and user
          experience for any size organization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="px-8">
            Try Demo
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            View Features
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• End-to-end encryption</li>
              <li>• Anonymous voting</li>
              <li>• Real-time results</li>
              <li>• Multi-platform access</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Benefits</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Increased participation</li>
              <li>• Cost reduction</li>
              <li>• Complete transparency</li>
              <li>• Instant verification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
