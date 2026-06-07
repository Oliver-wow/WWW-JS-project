export function TrashIcon(props){
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

export function LivesIcon(){
    return(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="healthIcon">
                <path
                    d="M50 88
                    L43 81
                    C18 58 5 45 5 28
                    C5 14 16 5 30 5
                    C39 5 47 10 50 18
                    C53 10 61 5 70 5
                    C84 5 95 14 95 28
                    C95 45 82 58 57 81
                    Z"
                />
            </svg>
    )
}