import React from 'react';
import './AttributeTable.css';

function AttributeTable({ attributes, onAttributeChange }) {
    const handleInputChange = (e, attribute, type) => {
        const value = parseInt(e.target.value, 10);

        if (type === 'base') {
            // Valor mínimo para 'base' é -1 e máximo é 8
            if (value < -1 || value > 8) return;
        } else if (type === 'bonus' || type === 'onus') {
            // Valor mínimo para 'bonus' e 'onus' é 0
            if (value < 0) return;
        }

        const newAttributes = { ...attributes };
        newAttributes[attribute][type] = value;

        // Recalcula o total: base + bonus - onus
        newAttributes[attribute].total =
            newAttributes[attribute].base + newAttributes[attribute].bonus - newAttributes[attribute].onus;

        onAttributeChange(newAttributes);
    };

    return (
        <div className="attribute-table">
            <table>
                <thead>
                    <tr>
                        <th>Atributo</th>
                        <th>Base</th>
                        <th>Bônus</th>
                        <th>Ônus</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(attributes).map((attribute) => (
                        <tr key={attribute}>
                            <td>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</td>
                            <td>
                                <input
                                    type="number"
                                    value={attributes[attribute].base}
                                    onChange={(e) => handleInputChange(e, attribute, 'base')}
                                    className="attribute-input"
                                    min="-1"
                                    max="8"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={attributes[attribute].bonus}
                                    onChange={(e) => handleInputChange(e, attribute, 'bonus')}
                                    className="attribute-input"
                                    min="0"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={attributes[attribute].onus}
                                    onChange={(e) => handleInputChange(e, attribute, 'onus')}
                                    className="attribute-input"
                                    min="0"
                                />
                            </td>
                            <td>{attributes[attribute].total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttributeTable;
