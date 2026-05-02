import { Truck, RotateCcw, Shield } from 'lucide-react'

export default function Benefits() {
    return (
        <section className="bg-secondary py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Truck className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Free Shipping</h3>
                        <p className="text-muted-foreground text-sm">On orders over ₹50</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <RotateCcw className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Easy Returns</h3>
                        <p className="text-muted-foreground text-sm">30-day return policy</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Secure Payment</h3>
                        <p className="text-muted-foreground text-sm">100% secure checkout</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Truck className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                        <p className="text-muted-foreground text-sm">Quick delivery across India</p>
                    </div>

                </div>
            </div>
        </section>
    )
}