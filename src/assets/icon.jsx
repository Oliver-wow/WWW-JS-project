export default function TrashIcon(props){
    return(
        <svg
            onClick={()=>{props.onClick()}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="TrashIcon"
            >

            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />

            <path d="M6 6l1 14h10l1-14" />

            <path d="M10 10v6" />
            <path d="M14 10v6" />
        </svg>
    )
}