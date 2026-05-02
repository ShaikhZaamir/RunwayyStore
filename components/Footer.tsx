export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-12 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Runwayy</h3>
                        <p className="text-background/80 text-sm">
                            Premium fashion for the modern wardrobe.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-background/80">
                            <li><a href="/shop" className="hover:text-background transition">All Products</a></li>
                            <li><a href="#" className="hover:text-background transition">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-background transition">Sale</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-background/80">
                            <li><a href="#" className="hover:text-background transition">Contact Us</a></li>
                            <li><a href="#" className="hover:text-background transition">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-background transition">Returns</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-background/80">
                            <li><a href="#" className="hover:text-background transition">About Us</a></li>
                            <li><a href="#" className="hover:text-background transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-background transition">Terms of Service</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-background/20 pt-8">
                    <p className="text-center text-background/60 text-sm">
                        © {new Date().getFullYear()} Runwayy Store. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    )
}