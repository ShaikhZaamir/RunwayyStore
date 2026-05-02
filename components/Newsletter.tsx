export default function Newsletter() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Stay Updated
                </h2>

                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Subscribe to get special offers and be the first to know about new collections
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                    >
                        Subscribe
                    </button>
                </form>

            </div>
        </section>
    )
}