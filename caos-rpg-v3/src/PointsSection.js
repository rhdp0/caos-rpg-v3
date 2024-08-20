import React from 'react';
import './PointsSection.css'; // Importe o CSS

function PointsSection({ rechargePoints }) {
    return (
        <div className="points-section">
            <div className="section">
                <h2>Pontos de Ação</h2>
                <div>
                    <input
                        type="number"
                        defaultValue={4}
                    />
                    <label> / </label>
                    <input
                        type="number"
                        defaultValue={4}
                    />
                </div>
            </div>

            <div className="section">
                <h2>Pontos de Recarga</h2>
                <div>
                    <input
                        type="number"
                        value={rechargePoints}
                        readOnly
                    />
                    <label> / </label>
                    <input
                        type="number"
                        defaultValue={rechargePoints}
                    />
                </div>
            </div>
        </div>
    );
}

export default PointsSection;
