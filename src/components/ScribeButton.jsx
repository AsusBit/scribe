export default function ScribeButton({title, fun, color="green", size="sm"}){
    const sizeClasses = {
        "sm": "w-[8rem]",
        "lg": "w-[16rem]"
    }[size];

    const colorClasses = {
        "green": "bg-scribe-green",
        "brown": "bg-scribe-brown"
    }[color]
    return (
        <button onClick={fun} className={`font-book ${colorClasses} font-bold shadow-[2px_2px_0px_0px_#000] text-scribe-yellow ${sizeClasses} rounded h-[4rem] transition-all duration-50 active:shadow-none active:translate-y-1 active:translate-x-1`}>{title}</button>
    )
}