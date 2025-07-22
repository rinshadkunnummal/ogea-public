import React from 'react'

const StatsCard = ({ title, value }) => {
    return (
        <div className="bg-white text-center rounded-lg shadow-md p-4 lg:p-8">
            <p className="text-4xl font-bold">{value}</p>
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
    )
}

export default StatsCard
