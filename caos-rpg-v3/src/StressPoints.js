import React from 'react';

function StressPoints() {
    return (
        <div>
            <h2>Pontos de Estresse</h2>
            <div>
                {[1, 2, 3].map((num) => (
                    <label key={num}>
                        <input type="checkbox" /> {num}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default StressPoints;
