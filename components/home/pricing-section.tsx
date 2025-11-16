export default function PricingSection() {
    return <section>
        <div>
             <div className="py-12 lg:py-20 mx-auto px-4   sm:px-6 lg:px-8 max-w-5xl lg:pt-12">
                <div>
                    <h2>Pricing</h2>
                </div>
                <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
                    {[].map((plan) => (
                        <PricingCard key={plan.id} {...plan}/>
                    ))}
                </div>
        </div>
        </div>
    </section>
}