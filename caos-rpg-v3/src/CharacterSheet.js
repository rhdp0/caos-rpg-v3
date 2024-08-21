import React, { useState, useEffect } from 'react';
import AttributeTable from './AttributeTable';
import PointsSection from './PointsSection';
import StressPoints from './StressPoints';
import ProfilePhoto from './ProfilePhoto';
import './CharacterSheet.css';

const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

    const rollXd4 = (x) => {
        let total = 0;
        for (let i = 0; i < x; i++) {
            total += rollDice(4);
        }
        return total;
    };


function CharacterSheet() {
    const [attributes, setAttributes] = useState({
        forca: { base: 0, bonus: 0, onus: 0, total: 0 },
        constituicao: { base: 0, bonus: 0, onus: 0, total: 0 },
        destreza: { base: 0, bonus: 0, onus: 0, total: 0 },
        inteligencia: { base: 0, bonus: 0, onus: 0, total: 0 },
        espirito: { base: 0, bonus: 0, onus: 0, total: 0 },
        carisma: { base: 0, bonus: 0, onus: 0, total: 0 },
    });

    const [level, setLevel] = useState(1); // Nível inicial definido como 1
    const [hpBase, setHpBase] = useState(10); // HP inicial definido como 10
    const [hpAtual, setHpAtual] = useState(10);
    const [rechargePoints, setRechargePoints] = useState(3);
    const [items, setItems] = useState('');
    const [advantages, setAdvantages] = useState('');
    const [disadvantages, setDisadvantages] = useState('');

    useEffect(() => {
        if (level === 1) {
            const calculatedHp = attributes.constituicao.total <= 0 ? 10 : attributes.constituicao.total * 10;
            setHpBase(calculatedHp);
            setHpAtual(calculatedHp);
        }
    }, [level, attributes.constituicao.total]);

    useEffect(() => {
        if (level > 1) {
            const hpIncrement = rollXd4(attributes.constituicao.base);
            setHpBase((prevHpBase) => prevHpBase + hpIncrement);
            setHpAtual((prevHpBase) => prevHpBase + hpIncrement);
        }
    }, [level, attributes.constituicao.base]);



    // Atualiza os pontos de recarga com base no espírito base e no nível
    useEffect(() => {
        let calculatedRechargePoints = 3;

        if (attributes.espirito.base <= 1) {
            calculatedRechargePoints += level - 1; // Adiciona 1 ponto de recarga por nível adicional se Espírito <= 1
        } else if (attributes.espirito.base >= 2) {
            const additionalPoints = Math.floor(attributes.espirito.base / 2) * level;
            calculatedRechargePoints += additionalPoints;
        }

        setRechargePoints(calculatedRechargePoints);
    }, [level, attributes.espirito.base]);


    return (
        <div className="container">
            <div className="character-sheet">
                <h1>CAOS RPG</h1>
                <form>
                    <div className="profile-section">
                        <ProfilePhoto /> {ProfilePhoto}

                        <div className="basic-info">
                            <div className="name-field">
                                <label>Nome:</label>
                                <input type="text" className="name-input" />
                            </div>
                            <div className="level-hp-container">
                                <div className="level-field">
                                    <label>Nível:</label>
                                    <input
                                        type="number"
                                        value={level}
                                        onChange={(e) => setLevel(Number(e.target.value))}
                                        className="small-input"
                                    />
                                </div>
                                <div className="hp-field">
                                    <label>HP:</label>
                                    <div className="hp-inputs">
                                        <input
                                            type="number"
                                            value={hpBase}
                                            readOnly
                                            className="small-input"
                                        />
                                        <span>/</span>
                                        <input
                                            type="number"
                                            value={hpAtual}
                                            onChange={(e) => setHpAtual(Number(e.target.value))}
                                            className="small-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="attribute-and-points-section">
                        <AttributeTable attributes={attributes} onAttributeChange={setAttributes} />
                        <div className="points-stress-container">
                            <PointsSection rechargePoints={rechargePoints} />
                            <StressPoints />
                        </div>
                    </div>

                    <h2>Vantagens e Desvantagens</h2>
                    <div className="advantages-disadvantages">
                        <div>
                            <h3>Vantagens</h3>
                            <textarea
                                className="textarea-container"
                                value={advantages}
                                onChange={(e) => setAdvantages(e.target.value)}
                                placeholder="Descreva suas vantagens aqui..."
                            />
                        </div>

                        <div>
                            <h3>Desvantagens</h3>
                            <textarea
                                className="textarea-container"
                                value={disadvantages}
                                onChange={(e) => setDisadvantages(e.target.value)}
                                placeholder="Descreva suas desvantagens aqui..."
                            />
                        </div>
                    </div>

                    <h2>Itens</h2>
                    <div className="item-section">
                        <textarea
                            className="textarea-container"
                            value={items}
                            onChange={(e) => setItems(e.target.value)}
                            placeholder="Descreva seus itens aqui..."
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CharacterSheet;
