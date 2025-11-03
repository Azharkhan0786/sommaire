export default function BgGradient() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10">
            {/* subtle green gradient layer for a mostly-white site */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50 to-emerald-100 opacity-80" />
            {/* soft overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.06),_transparent_30%)]" />
        </div>
    );
}