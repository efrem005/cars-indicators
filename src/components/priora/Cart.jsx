export const Cart = ({Icon, value, keyValue, onClick}) => (
    <div className="p-4 border rounded-lg text-center shadow-md" onClick={onClick}>
        <Icon className="inline-block" size={32}/>
        <h3 className="font-bold mt-1">{value} {keyValue}</h3>
    </div>
)