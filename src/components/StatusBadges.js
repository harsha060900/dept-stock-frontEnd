
function Assigned() {
    return(
        <>
            <span className="text-sm inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-blue-600 text-white rounded">Assigned</span>
        </>
    )
}

function NotAssigned() {
    return(
        <>
            <span className="text-sm inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-500 text-white rounded">Not Assigned</span>
        </>
    )
}

function Condemned() {
    return(
        <>
            <span className="text-sm inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-gray-800 text-white rounded">Condemned</span>
        </>
    )
}

function Missing() {
    return(
        <>
            <span className="text-sm inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-red-600 text-white rounded">Missing</span>
        </>
    )
}

function Spare() {
    return(
        <>
            <span className="text-sm inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-purple-600 text-white rounded">Spare</span>
        </>
    )
}

function Transferred() {
    return(
        <>
            <span className="text-sm inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-yellow-500 text-white rounded">Transferred</span>
        </>
    )
}

export {Assigned, NotAssigned, Condemned, Missing, Spare, Transferred}